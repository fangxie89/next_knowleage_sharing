import path, { normalize, sep, join } from "path"
import { getMarkdownFiles } from "@/next.heplers.mjs";
import { IS_DEVELOPMENT } from "@/next.constats.mjs";
import { readFile } from "node:fs/promises";
import { cache } from 'react';
import { compileMDX } from './next.mdx.compiler.mjs';
import { VFile } from "vfile";

// 开发模式下，返回一个stub对象，阻止缓存起作用， 否则生成一个Map缓存
const createCachedMarkdownCache = () => {
    if (IS_DEVELOPMENT) {
        return {
            has: () => false,
            set: () => {},
            get: () => null
        }
    }

    return new Map();
}

const getPathname = (path = []) => path.join('/');

const getDynamicRouter = async () => {
    const cacheMarkdownFiles = createCachedMarkdownCache();

    const pathnameToFilename = new Map();

    // 获取page目录中所有的md文件
    const websitePages = await getMarkdownFiles(process.cwd(), 'pages');

    // 将文件路径和文件名以Map的形式保存在pathnameToFilename中
    websitePages.forEach(filename => {
        let pathname = filename.replace(/((\/)?(index))?\.mdx?$/i, '');
        
        if(pathname.length > 1 && pathname.endsWith(sep)) {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        
        pathname = normalize(pathname).replace('.', '');

        pathnameToFilename.set(pathname, filename);
    })

const _getMarkdownFile = async (pathname = '') => {
    const normalizedPathName = normalize(pathname).replace('.','');
    console.log('pathname', pathname);
    console.log('pathnameToFilename', pathnameToFilename);
    // 查找pathnameToFilename中是否存在给定路径名
    if (pathnameToFilename.has(normalizedPathName)) {
        const filename = pathnameToFilename.get(normalizedPathName);

        let filePath = join(process.cwd(), 'pages');

        //查找对应路径名文件是否已经存在于cache当中
        if (cacheMarkdownFiles.has(normalizedPathName)) {
            const fileContent = cacheMarkdownFiles.get(normalizedPathName);

            return { source: fileContent, filename };
        }

        //读取文件并存储在cacheMarkdownFiles中
        filePath = join(filePath, filename);
        const fileContent = await readFile(filePath, 'utf8');

        cacheMarkdownFiles.set(normalizedPathName, fileContent);

        return { source: fileContent, filename }
    }

    return { filename: '', source: '' }
}

// 缓存_getMarkdownFile结果
const getMarkdownFile = cache(async (pathname) => {
    return await _getMarkdownFile(pathname);
})

//直接套用了node.org的getMDXContent方法，待研究
const _getMDXContent = async (source = '', filename = '') => {
    const sourceAsVirtualFile = new VFile(source);

    const fileExtension = filename.endsWith('.mdx')? 'mdx' : 'md';

    return compileMDX(sourceAsVirtualFile, fileExtension);
};

const getMDXContent = cache(async (source, filename) => {
    return await _getMDXContent(source, filename);
})

return {
    getMarkdownFile,
    getPathname,
    getMDXContent
}
}

export const dynamicRouter = await getDynamicRouter();