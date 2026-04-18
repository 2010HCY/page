const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

const CONFIG = {
    sourceDir: path.join(__dirname, 'source'),
    layoutDir: path.join(__dirname, 'layout'),
    publicDir: path.join(__dirname, 'public'),
    siteUrl: 'https://page.hcyhub.com',
    ignoreWrapFiles: [
        'index.html',
        'iframe示例.html',
        'google62987f52b93002d5.html'
    ]
};

let siteMapPaths = [];

async function build() {
    console.log('开始...');
    await fs.emptyDir(CONFIG.publicDir);

    async function processDirectory(currentDir) {
        const files = await fs.readdir(currentDir);

        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            const relativePath = path.relative(CONFIG.sourceDir, fullPath);
            const relativePathPosix = relativePath.split(path.sep).join('/'); 
            const destPath = path.join(CONFIG.publicDir, relativePath);
            const parsedInfo = path.parse(relativePath);

            const stat = await fs.stat(fullPath);

            if (stat.isDirectory()) {
                await fs.ensureDir(destPath);
                await processDirectory(fullPath);
            } else {
                
                if (parsedInfo.ext === '.html' || parsedInfo.ext === '.htm') {
                    
                    const isIgnored = CONFIG.ignoreWrapFiles.includes(relativePathPosix);
                    
                    if (isIgnored) {
                        await fs.copy(fullPath, destPath);
                        let url = relativePathPosix === 'index.html' ? '' : relativePathPosix;
                        siteMapPaths.push(`${CONFIG.siteUrl}/${url}`);
                        console.log(`复制: ${relativePath}`);
                        continue;
                    }

                    const rawContent = await fs.readFile(fullPath, 'utf8');
                    
                    const titleMatch = rawContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
                    const pageTitle = titleMatch ? titleMatch[1].trim() : parsedInfo.name;

                    const iconMatch = rawContent.match(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]*>/i);
                    const pageIcon = iconMatch ? iconMatch[0] : '<link rel="icon" href="/api/Hlogo徽章.svg" type="image/svg+xml">';

                    const rawFileName = `${parsedInfo.name}-${parsedInfo.name}${parsedInfo.ext}`;
                    const rawDestPath = path.join(path.dirname(destPath), rawFileName);

                    await fs.copy(fullPath, rawDestPath);

                    const iframeHTML = await ejs.renderFile(
                        path.join(CONFIG.layoutDir, 'iframe.ejs'),
                        {
                            title: pageTitle,
                            icon: pageIcon,
                            iframeSrc: rawFileName
                        }
                    );
                    await fs.writeFile(destPath, iframeHTML, 'utf8');

                    siteMapPaths.push(`${CONFIG.siteUrl}/${relativePathPosix}`);
                    
                    console.log(`成功: ${relativePath} -> ${pageTitle}`);
                } else {
                    await fs.copy(fullPath, destPath);
                }
            }
        }
    }

    await processDirectory(CONFIG.sourceDir);

    console.log('生成map.txt...');
    await fs.writeFile(path.join(CONFIG.publicDir, 'map.txt'), siteMapPaths.join('\n'));

    console.log('OKOKOKOKOK');
}

build().catch(console.error);