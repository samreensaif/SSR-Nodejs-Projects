#! /usr/bin/env node


import inquirer from "inquirer";
import chalk from "chalk";
import clear from "clear";


clear();
console.log(chalk.redBright( `\n\n\t\t\t^^^^^^^^^^^^^^^^^^^^^^^`))
console.log(chalk.redBright( `\t\t\tSSR-CLI-COUNTDOWN-TIMER\n\t\t\t^^^^^^^^^^^^^^^^^^^^^^^\n`))


//-------------------------------- Object containing event dates---------------------------------------------

const date: any = {

    Independence_Day: "2024-7-14",
    Bakra_Eid: "2024-5-15",
    New_Year: "2025-0-01",
    Iqbal_Day:"2024-10-9",
    Jinnah_Day:"2024-11-25"

};

//-------------------------------Function to prompt user for event selection-------------------------------

async function calculateTimeRemaining() {

    let ch: any  ={
    
        name: "time",
        type: "list",
        message: `${chalk.yellowBright.bold.italic.underline("\nSelect the Event:")}`,
        choices: ["Independence_Day", "Bakra_Eid", "New_Year","Iqbal_Day","Jinnah_Day","Exit"]
    }
    
        let ask =await inquirer.prompt(ch)
    
        let selected_event = ask.time

        if (ask.time === "Exit")
            
            {
            return false;  // Exit the loop if "Exit" option is selected
            }
    
    // Continue the loop if Event selected

        const dateParts = date[ask.time].split("-");
        calculate(selected_event, parseInt(dateParts[0]), parseInt(dateParts[1]), parseInt(dateParts[2]));
    
        return true; 
    } 
        
//------------------Function to calculate and display time remaining for an event-----------------------------

function calculate(a:string , year: number, month:number, day:number)

{
 
    let targetDate = `${year}-${(month+1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00`;
        
    let targetTime = new Date(targetDate).getTime();
    
    let currTime = new Date().getTime();
        
    const daysRemaining = Math.floor((targetTime - currTime) / (1000 * 60 * 60 * 24));
    
    const hoursRemaining = Math.floor(((targetTime - currTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    const minutesRemaining = Math.floor(((targetTime - currTime) % (1000 * 60 * 60)) / (1000 * 60));
    
    const secondsRemaining = Math.floor(((targetTime - currTime) % (1000 * 60)) / 1000);
    
//------------------------- Display remaining time for the event-----------------------------------------


        console.log(chalk.greenBright.bold(`\nDays Remaining ${chalk.magentaBright.bold.italic.underline(a)} : ${chalk.magentaBright.bold.italic.underline(daysRemaining)} days: ${chalk.magentaBright.bold.italic.underline(hoursRemaining)} hours: ${chalk.magentaBright.bold.italic.underline(minutesRemaining)} minutes: ${chalk.magentaBright.bold.italic.underline(secondsRemaining)} secs `));
}

//-------------------------- Main function to run the program-------------------------------------------


    async function run() 
    
    {
        let continueLoop = true;

        while (continueLoop)
            
            {
            continueLoop = await calculateTimeRemaining();
            }

       
    console.log(chalk.redBright(`\n\t\t^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`))
    console.log(chalk.redBright(`\t\tTHANKS FOR USING SSR-CLI-COUNTDOWN-TIMER`))
    console.log(chalk.redBright(`\t\t^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`))

    }
        
run()
