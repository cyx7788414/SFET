// import { readdirSync } from 'fs';
// import { resolve } from 'path';
import fs from 'fs';
import path from 'path';
import execa from 'execa';
// import execa from 'execa';
import os from 'os';

const basename = path.resolve('');
const libDir = path.resolve(basename, 'lib');
const distDir = path.resolve(basename, 'dist/lib');

main().catch(error => {
    console.log(error);
    process.exit(1);
});

interface Task {
    target: string;
    dist: string;
    name: string;
}

async function main() {
    let tasks: Task[] = [];
    const level1 = fs.readdirSync(libDir);
    if (level1.includes('index.ts')) {
        tasks.push({
            target: libDir,
            dist: path.resolve(distDir, '_index'),
            name: 'sfet-lib-web'
        });
    }
    level1.filter(v => !v.includes('.')).forEach(folder => {
        const l2path = path.resolve(libDir, folder);
        const level2 = fs.readdirSync(l2path);
        const l2dist = path.resolve(distDir, folder);
        if (level2.includes('index.ts')) {
            tasks.push({
                target: l2path,
                dist: path.resolve(l2dist, '_index'),
                name: 'sfet-' + folder
            });
        }
        level2.filter(v => !v.includes('.')).forEach(f => {
            const l3path = path.resolve(l2path, f);
            const level3 = fs.readdirSync(l3path);
            if (level3.includes('index.ts')) {
                tasks.push({
                    target: path.resolve(l2path, f),
                    dist: path.resolve(l2dist, f),
                    name: f
                });
            }
        });
    });
    buildAll(tasks);
}

async function buildAll(tasks: Task[]) {
    await runParallel(os.cpus().length, tasks, build)
}

export async function runParallel<T>(maxConcurrency: number, source: T[], iteratorFn: (item: T, source: T[]) => Promise<any>) {
    const ret: Array<Promise<any>> = []
    const executing: Array<Promise<any>> = []

    for (const item of source) {
        const p = Promise.resolve().then(() => iteratorFn(item, source))

        ret.push(p)

        if (maxConcurrency <= source.length) {
            const e: Promise<any> = p.then(() => executing.splice(executing.indexOf(e), 1))

            executing.push(e)

            if (executing.length >= maxConcurrency) {
                await Promise.race(executing)
            }
        }
    }

    return Promise.all(ret);
}

async function build(task: Task) {
    // const execa = (await import('execa')).execa;
    // console.log(execa)
    await execa('vite', ['build'], {
        stdio: 'inherit',
        env: {
            TARGET: task.target,
            DIST: task.dist,
            NAME: task.name
        }
    });


    console.log('build ' + task.target);
}