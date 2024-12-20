#include "Simplify.h"
#include <stdio.h>
#include <time.h>  // clock_t, clock, CLOCKS_PER_SEC

void showHelp(const char * argv[]) {
    const char *cstr = (argv[0]);
    printf("Usage: %s <input> <output> <ratio> <agressiveness)\n", cstr);
    printf(" Input: name of existing OBJ format mesh\n");
    printf(" Output: name for decimated OBJ format mesh\n");
    printf(" Ratio: (default = 0.5) for example 0.2 will decimate 80%% of triangles\n");
    printf(" Agressiveness: (default = 7.0) faster or better decimation\n");
    printf("Examples :\n");
#if defined(_WIN64) || defined(_WIN32)
    printf("  %s c:\\dir\\in.obj c:\\dir\\out.obj 0.2\n", cstr);
#else
    printf("  %s ~/dir/in.obj ~/dir/out.obj 0.2\n", cstr);
#endif
} //showHelp()

bool is_extension(const char* file_path, const char* extension) {
    char file_extension[3];

    file_extension[0] = file_path[strlen(file_path)-3];
    file_extension[1] = file_path[strlen(file_path)-2];
    file_extension[2] = file_path[strlen(file_path)-1];

    return (file_extension[0] == extension[0]
            and file_extension[1] == extension[1]
            and file_extension[2] == extension[2]);
}

bool is_obj(const char* file_path) {
    return is_extension(file_path, "obj");
}

bool is_stl(const char* file_path) {
    return is_extension(file_path, "stl");
}

int simplify(const char* file_path, const char* export_path, float reduceFraction, float agressiveness) {

    if (is_obj(file_path)) {
        Simplify::load_obj(file_path);
        printf("正在加载 obj\n");
    }
    else if (is_stl(file_path)) {
        printf("正在加载 stl\n");
        Simplify::load_stl(file_path);
    } else {
        printf("文件不是obj 或 stl %s\n", file_path);
        return EXIT_FAILURE;
    }

    if ((Simplify::triangles.size() < 3) || (Simplify::vertices.size() < 3)) {
        printf("三角形大小或顶点数小于3\n");
        return EXIT_FAILURE;
    }

    int target_count =  Simplify::triangles.size() >> 1;

    if (reduceFraction > 1.0) reduceFraction = 1.0; //lossless only
    if (reduceFraction <= 0.0) {
        printf("比例必须在零和一之间。\n");
        return EXIT_FAILURE;
    }
target_count = round((float)Simplify::triangles.size() * reduceFraction);

if (target_count < 4) {
    printf("该文件无法承受如此极端的简化，做个人吧！\n");
    return EXIT_FAILURE;
}

clock_t start = clock();
printf("输入：%zu 顶点, %zu 三角形 (目标 %d)\n", Simplify::vertices.size(), Simplify::triangles.size(), target_count);
int startSize = Simplify::triangles.size();
Simplify::simplify_mesh(target_count, agressiveness, true);
//Simplify::simplify_mesh_lossless(false);
if (Simplify::triangles.size() >= startSize) {
    printf("无法简化网格。\n");
    return EXIT_FAILURE;
}

if (is_obj(export_path)) {
    printf("正在导出 obj\n");
    Simplify::write_obj(export_path);
} else if (is_stl(export_path)) {
    printf("正在导出 stl\n");
    Simplify::write_stl(export_path);
} else {
    printf("导出文件既不是 obj 也不是 stl: %s\n", export_path);
    return EXIT_FAILURE;
}

printf("输出：%zu 顶点, %zu 三角形 (减少了 %f; 耗时 %.4f 秒)\n",
    Simplify::vertices.size(), Simplify::triangles.size(),
    (float)Simplify::triangles.size() / (float)startSize,
    ((float)(clock() - start)) / CLOCKS_PER_SEC);

return EXIT_SUCCESS;


#ifdef __EMSCRIPTEN__

extern "C" {
int simplify(const char* file_path, float reduceFraction, const char* export_path) {
    printf("开始简化 %s\n", file_path);
    return simplify(file_path, export_path, reduceFraction, 7.0);// aggressive
}
}

#else

int main(int argc, const char * argv[]) {
    if (argc < 3) {
        showHelp(argv);
        return EXIT_SUCCESS;
    }

    const char* file_path = argv[1];
    const char* export_path = argv[2];
    float reduceFraction = 0.5;
    if (argc > 3) {
        reduceFraction = atof(argv[3]);
    }

    float agressiveness = 7.0;
    if (argc > 4) {
        agressiveness = atof(argv[4]);
    }
    return simplify(file_path, export_path, reduceFraction, agressiveness);
}

#endif
