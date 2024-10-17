"use strict";

import { fileURLToPath } from "url";

import { glob } from "glob";

/**
 * 缓存文件系统的golb查询
 * 构建过程中查询一次并保存结果，减少开销
 * @type {Map<string, Promise<string>>}
 */
const globCacheByPath = new Map();

/**
 * 读取某个目录下所有子目录
 * @param {string} root 根目录
 * @param {string} cwd 当前目录
 * @returns {Promise<Array<string>>} 返回包含目录数组的promise
 */
export const getDirectories = async (root, cwd) => {
  return glob("*", { root, cwd, withFileTypes: true })
  .then(d => d.filter(e => e.isDirectory()))
  .then(d => d.map(e => e.name));
};

/**
 * 获取所有文件的glob
 * 
 * @param {string} root 搜索的根目录
 * @param {string} cwd 搜索当前目录
 * @param {Array(string)} ignore 需要ignore的数组
 * @returns {Promise<Array<string>>} 包含path数组的Promise
 */
export const getMarkdownFiles = async (root, cwd, ignore = []) => {
    const cacheKey = `${root}${ignore.join('')}`;

    if (!globCacheByPath.has(cacheKey)) {
        globCacheByPath.set(cacheKey, glob('**/*.{md, mdx}', { root, cwd, ignore }));
    }

    return globCacheByPath.get(cacheKey);
}