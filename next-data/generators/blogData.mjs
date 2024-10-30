import { createReadStream } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import readline from 'node:readline';

import graymatter from 'gray-matter';

import { getMarkdownFiles } from '../../next.heplers.mjs';

// 获取当前blog路径
const blogPath = join(process.cwd(), 'pages/blog');

//存储所有的blog category
const blogCategories = new Set(['all']);

/**
 * 用于获取文件的元数据，包括title，date，category，slug
 * @param { string } filename 
 * @param { string } source 
 */
const getFrontMatter = (filename, source) => {
    const {
        title = 'Untitiled',
        username,
        date = new Date(),
        category = 'uncategorized'
    } = graymatter(source).data;

const categories = [category, 'all'];

blogCategories.add(category);


const slug = `blog/${category}/${basename(filename, extname(filename))}`;
console.log('slug', slug);
return { title, username, date: new Date(date), categories, slug };
} 

/**
 * 生成博客数据
 * @return {Promise<import('../../types').BlogData>}
 */
const generateBlogData = async () => {
    // 获取除index.md以外的所有文件
    const filenames = await getMarkdownFiles(process.cwd(), 'pages/blog', [ '**/index.md' ]);
    console.log('filenames', filenames);
    return new Promise(resolve => {
        const posts = [];
        const rawFrontmatter = [];

        filenames.forEach(filename => {
            const _stream = createReadStream(join(blogPath, filename));

            const _readLine = readline.createInterface({ input: _stream });

            // 生成一个元组，0 统计 --- 出现次数， 1 存储每一行元数据
            rawFrontmatter[filename] = [0, ''];

            _readLine.on('line', line => {
                rawFrontmatter[filename][1] += `${line}\n`;

                if (line === '---') {
                    rawFrontmatter[filename][0] += 1;
                }

                // 读到 2 时表示元数据读取完了，关闭流
                if (rawFrontmatter[filename][0] === 2) {
                    _readLine.close();
                    _stream.close();
                }
            })

            _readLine.on('close', () => {
                posts.push(getFrontMatter(filename, rawFrontmatter[filename][1]));

                if (posts.length === filenames.length) {
                    resolve({ categories: [...blogCategories], posts })
                }
            })
        })
    })
}

export default generateBlogData;