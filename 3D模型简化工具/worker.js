self.addEventListener('message', function(e) {
    const file = e.data.blob;
    const percentage = e.data.percentage;
    const simplify_name = e.data.simplify_name;

    prepare_and_simplify(file, percentage, simplify_name);
}, false);

var Module = {
    'print': function(text) {
        self.postMessage({"log":text});
    }
};

self.importScripts("a.out.js");

let last_file_name = undefined;

function prepare_and_simplify(file, percentage, simplify_name) {

    var filename = file.name;

    // if simplify on the same file, don't even read the file
    if (filename === last_file_name) {
        console.log("跳过加载和创建数据文件");
        simplify(filename, percentage, simplify_name);
        return;
    } else { // remove last file in memory
        if (last_file_name !== undefined)
            Module.FS_unlink(last_file_name);
    }

    last_file_name = filename;
    var fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr. onloadend = function (e) {
        var data = new Uint8Array(fr.result);
        Module.FS_createDataFile(".", filename, data, true, true);
        simplify(filename, percentage, simplify_name);
    }
}

function simplify(filename, percentage, simplify_name) {
    Module.ccall("simplify", // C函数名
        undefined, // 返回值类型
        ["string", "number", "string"], // 参数类型
        [filename, percentage, simplify_name] // 参数值
    );
    let out_bin = Module.FS_readFile(simplify_name);
    // 二进制STL文件的MIME类型为application/sla
    let file = new Blob([out_bin], {type: 'application/sla'});
    self.postMessage({"blob": file});
}
