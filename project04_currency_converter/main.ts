#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.greenBright( `\n\n\t\t\t^^^^^^^^^^^^^^^^^^^^^^`))
console.log(chalk.greenBright( `\t\t\tSSR-CURRENCY-CONVERTER\n\t\t\t^^^^^^^^^^^^^^^^^^^^^^\n`))

const currency : any = {

    USD: 1, // Base Currency
    EUR: 0.91,
    GBP:0.76,
    INR: 74.57,
    PKR: 280,
    SR: 3.75,
    OD: 0.38,
    MYR: 4.74,
    CY: 7.23

};

// condition for continue the code 
let condition = true;

while (condition){

let user_answer = await inquirer.prompt(
    
    [{
    name: "from",
    message:(chalk.yellowBright("\n\tWhich Currency You Have: ")),
    type: "list",
    choices: ["USD","EUR","GBP","INR","PKR","SR","OD","MYR","CY"]

},{
    name: "to",
    message:(chalk.yellowBright("\n\tWhich Currency You Want To Buy: ")),
    type: "list",
    choices: ["USD","EUR","GBP","INR","PKR","SR","OD","MYR","CY"]
},
{
    name: "amount",
    message:(chalk.yellowBright("\n\tHow Much Currency You Have:")),
    type: "number"
}
])


let fmCurrency = currency[user_answer.from]   //

let toCurrency = currency[user_answer.to]

let amount = user_answer.amount;

let baseAmount = (amount/fmCurrency)

let convertedAmount = Math.ceil(baseAmount * toCurrency);

console.log(chalk.greenBright(`\n\tYou Got ${convertedAmount} ${user_answer.to} from ${amount} ${user_answer.from}\n\n\t`) )

let want_continue = await inquirer.prompt([
    {
      name:'continue',
      type:'list',
      message:chalk.bold.blue(`Do want to continue:`),
      choices:['Yes','No']
    }
  ])
  want_continue.continue == 'Yes' ? (condition = true) : (condition = false)
}



console.log(chalk.greenBright(`\n\t\t^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`))
console.log(chalk.greenBright(`\n\t\tTHANKS FOR USING SSR-CURRENCY-CONVERTER`))
console.log(chalk.greenBright(`\n\t\t^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`))