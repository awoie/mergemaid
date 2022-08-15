#!/usr/bin/env node
const fs = require('fs')
const nReadlines = require('n-readlines');

const args = process.argv;
console.log({ args: args });

// params
const mainMmdFile =  args[2];
const targetFile = args[3];

main();

function mergeMaid(mmdFile) {
    const mainLines = new nReadlines(mmdFile);

    let line;
    let lineNumber = 1;
    let mmd = '';
    while (line = mainLines.next()) {        
        mmdLine = line.toString('utf-8') + '\n';
        mmd += mmdLine
        if (mmdLine.trim().startsWith('%% import')) {
           const mmdModule = mmdLine.trim().substring('%% import'.length + 1);
           console.log('importing module: ' + mmdModule);
           mmd += mergeMaid(mmdModule).replace('sequenceDiagram', '');
        }
    }
    return mmd;
}

function main() {
    // merge files
    const mergedContents = mergeMaid(mainMmdFile);

    // write merged output
    fs.writeFile(targetFile, mergedContents, (err) => {
          
        // In case of a error throw err.
        if (err) throw err;
    })

    // summary
    console.log(mergedContents);
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}