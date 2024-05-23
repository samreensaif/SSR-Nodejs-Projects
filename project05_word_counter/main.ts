#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.greenBright(`\n\t\tWelcome To SSR-WORD-COUNTER\n`));



let condition = true;

while (condition)
    
{

const ask = await inquirer.prompt({

    name: "sentence",
    type: "input",
    message: "Enter the sentence you want to count: "
})

let wordCount = ask.sentence.trim().split(" ")  // trim cut the spaces and split 


console.log(chalk.blueBright(`\n\tTotal Number Of Words: ${wordCount.length} \n`))

let letterCount = ask.sentence.replace(/\s+/g, '')

console.log(chalk.blueBright(`\n\tTotal Number of Letters: ${letterCount.length} \n `))


let cont = await inquirer.prompt({

    name : "continue",
    type : "list",
    message : "Do You Want To Continue?",
    choices : ["yes","no"]

})

cont.continue ==  "yes" ? (condition = true) : (condition = false);


}
console.log(chalk.greenBright(`\n\t\tThanks For Using SSR-WORD-COUNTER`));
