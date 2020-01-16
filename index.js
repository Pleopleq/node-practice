#!/usr/bin/env node

//init dependencies for File Search and chalk
const fs = require('fs');
const chalk = require('chalk');
const {lstat} = fs.promises;
//reading directory files
fs.readdir(process.cwd(), async (err, filenames) =>{
    if (err){
        console.log(err);
    }

    const statPromises = filenames.map(filename => {
        return lstat (filename);
    })

const allStats = await Promise.all(statPromises);

for(let stats of allStats){
    const index = allStats.indexOf(stats);
    if (stats.isFile()){
        console.log(chalk.greenBright(filenames[index]))
    } else {
        console.log(chalk.blueBright(chalk.bold(filenames[index])))
    }
}
})
