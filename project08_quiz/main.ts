#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"



//-----------------------------------------Rules starts here--------------------------------------------------

console.log(chalk.magentaBright.bold.italic(`\n\t\t\t*********************************`));
console.log(chalk.magentaBright.bold.italic(`\t\t\tWELCOME TO SSR-CLI-QUIZ APP`));
console.log(chalk.magentaBright.italic(`\t\t\t*********************************`));
console.log(chalk.yellowBright(`\n\n
${chalk.magenta.bold.italic.underline("GAMEPLAY:")}

* The game typically consists of 5 rounds of multiple choice questions with increasing difficulty. 
* Contestants progress through these rounds by answering questions correctly, with the 
ultimate goal of winning a cash prize of ${chalk.magenta.bold.italic.underline("$1000")}  (approximately . two hundred fifty thousand rupees).
* Each question hay Four Options.

${chalk.magenta.bold.italic.underline("RULES:")}

* You have given 5 questions.
* Each question carries 200 marks
* Contestant has only one lifeline they can use throughout the game to help them answer questions.
* ${chalk.magenta.bold.italic.underline("50-50 Life-Line:")} Removes two incorrect answer choices, leaving the contestant with a 50% chance of picking the right answer.
* Once used, a lifeline cannot be used again.
* Your prize will be ${chalk.magenta.bold.italic.underline("Reduced By $200")} for each wrong answer.`) )

//---------------------------------------Rules end here--------------------------------------------------------

let score : number = 0;
let decScore:number = 1000          // get score 10 after each correct answer
let totalQuestions : number = 0; // number of questions whose answers are correct
let isfifty50Used:boolean = false;   // fifty-fifty life-line equals 0 means not used yet
let pname: any;


const question : any = {

    question1:"Canberra", 
    question2:"William Shakespeare",
    question3:"Mars",
    question4:"Au",
    question5:"1789"
        
};

function increaseScore()
    {              //increase number function
    score += 200;
    totalQuestions +=1
    }


//----------------------------------------//fifty fifty function starts here---------------------------------
    function fifty50Option()
    
    {         
        
    
    let correctAns :string = question.question1
    
     prompt1.choices.filter((choice:string)=>choice === correctAns )

     let index = prompt1.choices.indexOf(question.question1); //it gives the index of correct answer
               
     let newarray:string[];
        
        if (index === prompt1.choices.length - 1) 
            {

            newarray = prompt1.choices.slice(index - 1, index + 1);
            return newarray;
            
            } 

        else if (index < prompt1.choices.length - 1) 
            {

            newarray = prompt1.choices.slice(index, index + 2);
            return newarray

            }
        
   }                                    
//---------------------------------fifty fifty ends here------------------------------------------------


//-------------------------------sure() function starts here------------------------------------------------
async function sure()

{                                                  
    let ask1 = await inquirer.prompt({
    name:"sure",
    type:"list",
    message:`${chalk.magentaBright.bold.italic.underline("\nAre you confident of the reply?")}  `,
    choices:["yes","no"]})

if((ask1.sure==="yes" || ask1.sure==="Yes") && (userinput.q === question.question1))
        {
            console.log(chalk.green.bold(`\nCorrect!!\n`))

            increaseScore();

        }

else if((ask1.sure==="yes" || ask1.sure==="Yes") && (userinput.q !== question.question1))

        {
            console.log(chalk.red.bold(`\nWrong!!\n`))
            console.log(`\nCorrect Answer: ${chalk.magenta.underline(question.question1)}\n`);
            
            decScore -= 200
        }

else 
        {
            if(!isfifty50Used)
                
                {
                    

                    let ask2 = await inquirer.prompt({
                    name:"sure",
                    type:"list",
                    message:`${chalk.cyanBright.bold.italic.underline("\nWould you like to reach for your 50/50 lifeline? ")}  `,
                    choices:["yes","no"]
                    }) 

                    if(ask2.sure==="yes" || ask2.sure==="Yes")
                    {
                        isfifty50Used = true;
                            console.log(chalk.redBright.bold.italic(`\n\tYou have just used the one and only lifeline you have\n\n`));

                            let newOption = fifty50Option() 
                                
                            let ask: any = 
                            {
                                name: "q",
                                type: "list",
                                message: `${chalk.yellowBright.bold.italic.underline("\nYour 50-50 Options Are: ")}`,
                                choices: newOption
                            };

                            let userinput1 = await inquirer.prompt(ask);


                            if(userinput1.q===question.question1)
                                {
                                    console.log(chalk.green.bold(`\nCorrect!!\n`))
                                    increaseScore();
                                }

                            else 
                                {
                                    console.log(chalk.red.bold(`\nWrong!!\n`))
                                    console.log(`\nCorrect Answer: ${chalk.magenta.underline(question.question1)}\n`);
                                    decScore -= 200
                                }

                    }
                    
                    else 
                    {
                        console.log(chalk.green.bold.underline(`\nAlready Selected: ${userinput.q}\n`));

                        if (userinput.q===question.question1)
                            { 
                                console.log(chalk.green.bold(`\nCorrect!!\n`))
                        
                                increaseScore();
                            }
                        else
                            {
                                console.log(chalk.red.bold(`\nWrong!!\n`))
                                console.log(`\nCorrect Answer: ${chalk.magenta.underline(question.question1)}\n`);
                                decScore -= 200
                            }
                    }

                    
                }
            else 

                {
                    
                    console.log(chalk.green.bold.underline(`\nAlready Selected: ${userinput.q}\n`));


                    if (userinput.q===question.question1)
                        { 
                            console.log(chalk.green.bold(`\nCorrect!!\n`))

                            increaseScore();
                        }
                    else
                        {
                            console.log(chalk.red.bold(`\nWrong!!\n`))
                            console.log(`\nCorrect Answer: ${chalk.magenta.underline(question.question1)}\n`);
                            decScore -= 200
                        }
                }
        }
}                                      
//-------------------------------sure() function ends here------------------------------------------------


//--------------------------------------player name----------------------------------------------------------

console.log(`\n\n`);

async function playerName()

{
    let isValidName = false;
  
    while (!isValidName) {
      let player = await inquirer.prompt({
        name: "pname",
        type: "input",
        message: `${chalk.cyanBright.bold.italic.underline("Enter Player's Name: ")}`,
      });
  
      if (player.pname.trim() === "") {
        console.log(chalk.redBright.bold("\nPlease enter a valid name.\n"));
      } else {
        isValidName = true;
        let nameTC = player.pname.split(" ").map((a:string) => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(" ");
        return nameTC;
      }
    }
  }
  
  
//------------------------------------main game starts here-----------------------------------------------

pname = await playerName();

console.log(chalk.greenBright.bold(`\n\n\t\tLets start the game ${chalk.underline(pname)}\n\n`));

//--------------------------------------question1----------------------------------------------------------


let prompt1 : any= 

{
name: "q",
type: "list",
message: `${chalk.blueBright.bold.italic("Question 1: What is the capital city of Australia? ")}`,
choices: ["Sydney", "Melbourne", "Canberra", "Perth"]
};


    let userinput = await inquirer.prompt(prompt1);

    console.log("\n");

        if(userinput.q === question.question1) 
            {
                   await sure()
            }

        else
            {
                await sure();
            }
//--------------------------------------question2----------------------------------------------------------
 
prompt1 =
    
{
    name: "q",
    type: "list",
    message:`${chalk.blueBright.bold.italic("Question 2: Who wrote the famous Play OTHELLO? ")}`,
    choices:["Emily Dickinson", "Mark Twain","Virginia Woolf", "William Shakespeare" ]

};
    userinput = await inquirer.prompt(prompt1);
    
    console.log("\n");
    
    question.question1=question.question2
        
        if (userinput.q === question.question1)
            {
                await sure()
            }
        
        else
            {
                await sure();
            }

//------------------------------------question3----------------------------------------------------------

prompt1 =

{
    name: "q",
    type: "list",
    message:`${chalk.blueBright.bold.italic("Question 3: Which planet is known as the RED PLANET? ")}`,
    choices:["Jupiter", "Saturn", "Neptune", "Mars"]


};
     userinput = await inquirer.prompt(prompt1);
    
    
    
    console.log("\n");
    
    question.question1=question.question3
    
        if (userinput.q === question.question1)
            {
                await sure()
            }
        
        else
            {
                await sure();
            }

//--------------------------------------question4----------------------------------------------------------

prompt1 = 

{ 
name: "q",
type: "list",
message:`${chalk.blueBright.bold.italic("Question 4: What is the chemical symbol for the element GOLD? ")}`,
choices:["Ag", "Au", "Sn", "Al"]

};
    userinput = await inquirer.prompt(prompt1);
    
    console.log("\n");
    
    question.question1=question.question4
        
        if (userinput.q === question.question1)
            {
                await sure()
            }
        
        else
            {
                await sure();
            }

//--------------------------------------question5----------------------------------------------------------


prompt1 = 

{

name: "q",
type: "list",
message:`${chalk.blueBright.bold.italic.underline("Question 2: In which year did the FRENCH REVOLUTION begins? ")}`,
choices:["1789", "1879", "1770", "1890"]

};
    userinput = await inquirer.prompt(prompt1);
    
    console.log("\n");
    
    question.question1=question.question5
    
        if (userinput.q === question.question1)
            {
                await sure()
            }
        
        else
            {
                await sure();
            }
        console.log(chalk.magenta.bold.italic(`Total number of correct answers: ${chalk.magentaBright.underline(totalQuestions)}`))
        
        console.log(chalk.greenBright.bold.italic(`\nCongratulations!!!! ${pname},\n\nYou Won $${chalk.magentaBright.underline(score)}`));

        console.log(chalk.redBright.bold.italic(`\n\t\t\t***********************************`));
        console.log(chalk.redBright.bold.italic(`\t\t\tTHANKS FOR PLAYING SSR-CLI-QUIZ APP`));
        console.log(chalk.redBright.italic(`\t\t\t***********************************`));        
        

