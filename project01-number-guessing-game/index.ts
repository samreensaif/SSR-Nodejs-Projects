#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

console.log(chalk.greenBright( `\n\t\tNumber Guessing Game`))
console.log(chalk.greenBright( `\t\t--------------------`))

let condition = true;

while ( condition)
    {
const answers = await inquirer.prompt([

    {
        name: "UserGuessNumber",
        type: "number",
        message: "\n Please Guess a Random Number from 1-6: "
    },
]) ;

 const randomNum = Math.floor(Math.random()*6+1);
  
if (answers.UserGuessNumber === randomNum)
{
    console.log (chalk.blueBright( "\n\nCongratulation!!! You guessed perfectly :)"))
}

else if( answers.UserGuessNumber > randomNum)
{ console.log(chalk.redBright( "\n\nYou guessed a bigger number :("))}

else 
{ console.log(chalk.redBright( " \n\nYou  guessed a smaller number :("))}

console.log( `\n\nComputer Random Number is ${randomNum}\n\n`);


   
        let ask = await inquirer.prompt({

            name : "continue",
            type : "list",
            message : " Do You Want To Continue?",
            choices : ["yes","no"]

        })

 ask.continue ==  "yes" ? (condition = true) : (condition = false);

    }

    let rainbowtitle = chalkAnimation.rainbow(`\n\tTHANKS FOR PLAYING NUMBER GUESSING GAME `);

rainbowtitle.start();

rainbowtitle.stop();