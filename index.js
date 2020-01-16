#!/usr/bin/env node

//init dependencies for File System and chalk
const fs = require('fs');
const chalk = require('chalk');
const {lstat} = fs.promises;
//reading directory files
fs.readdir(process.cwd(), async (err, filenames) =>{
    if (err){
        console.log(err);
    }
    //filling the lstat object with the filenames of the directory
    const statPromises = filenames.map(filename => {
        return lstat (filename);
    })
//resolving all the promises with promise.all
const allStats = await Promise.all(statPromises);

//printing the filenames inside of allStats and putting green color to
//files and blue to directories
for(let stats of allStats){
    const index = allStats.indexOf(stats);
    if (stats.isFile()){
        console.log(chalk.greenBright(filenames[index]))
    } else {
        console.log(chalk.blueBright(chalk.bold(filenames[index])))
    }
}
})
