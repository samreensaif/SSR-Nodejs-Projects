#! /usr/bin/env node

import inquirer from "inquirer";

console.log("\n\t\t\tWELCOME TO SIMPLE CALCULATOR");
console.log(`\t\t\t****************************\n`);

async function continueProcess()

{
        
    let continue_or_not = await inquirer.prompt
    ([
        {
        name: "continueoption",
        type: "list",
        message: "\nDo You Want To Go To Main Menu?",
        choices: ["Yes", "No"],
        },
    ]);

    if (continue_or_not.continueoption === "Yes") 
        
    {
        main();
    } 
    
    else 
    
    { 
        console.log(`\n\t\t\tThanks For Using SSR-MY-CALCULATOR`);
        console.log(`\t\t\t**********************************\n`);
    
    }

}

async function main()

{

const result = await inquirer.prompt([
    { msg: "Enter your first number:", type: "number", name: "firstnumber" },

    { msg: "ENter your second number:", type: "number", name: "secondnumber" },

    {
        msg: "Select Operators",
        type: "list",
        name: "operators",
        choices: [
            "Addition",
            "Subtraction",
            "Multiplication",
            "Division",
            "Modulus",
            "Percentage"
           
        ],
    },
]);
if (result.operators === "Addition")
    {
    
        console.log("\nAddition Result is:", result.firstnumber + result.secondnumber);
        await continueProcess();
    
    }
else if (result.operators === "Subtraction") 
    {
        console.log("\nSubtraction Result is:", result.firstnumber - result.secondnumber);
        await continueProcess();
    }

else if (result.operators === "Multiplication") 
    {
        console.log("\nMultiplication Result is:", result.firstnumber * result.secondnumber);
        await continueProcess();
    }

else if (result.operators === "Division") 
    {
    
        console.log("\nDivision Result is:", result.firstnumber / result.secondnumber);
        await continueProcess();
    }

else if (result.operators === "Modulus") 
    {
        console.log("\nModulus Result is:", result.firstnumber % result.secondnumber);
        await continueProcess();
    }

else if (result.operators === "Percentage") 
    {
        console.log(`\nPercentage Result is: ${(result.firstnumber / result.secondnumber)*100}%`);
        await continueProcess();
    }


}
        await main();

        