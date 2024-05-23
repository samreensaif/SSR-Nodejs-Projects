#! /usr/bin/env node

import inquirer from "inquirer";

import chalk from "chalk";



console.log(chalk.blueBright.bold(`\n\t\tWELCOME TO MY FIRST ATM \n\n`));

let myBalance = 500000; //Dollars


    const userName = await inquirer.prompt
    ([
        
        {
      
          name: "username",
          type: "string",
          message: `
          Login With Registered ID:`
        },
        { 
          name: "pinNumber",
          type: "password",
          message: `
          Enter your 4-digit pin number(digits only):`,
          mask: "*",
          validate:function (input){

            if( /^\d{4}$/.test(input)) 
              {
                
                return true;
              }
              else
              {
                return "Enter only 4-digits pin number"                                 
              }
          }}

    ]);

    banksystem();
    async function continue_transaction() {
      //after first transaction of work than it will ask this
      let continue_or_not = await inquirer.prompt([
        {
          name: "continueoption",
          type: "list",
          message: "Do You Want To Go To Main Menu?",
          choices: ["Yes", "No"],
        },
      ]);
      if (continue_or_not.continueoption === "Yes") {//if yes than it will go to bank system again
        banksystem();
      } else {//if no than program will end 
        console.log(chalk.blueBright(`\n\n\t\tTHANKS FOR USING MY FIRST ATM`));
      }
    }

  
      
    // make the function for the whole atm options
    
    async function banksystem() {
      console.log (chalk.cyanBright(`\n\n\t\t Current Balance: $${myBalance}\n\n`))
   
      const option = await inquirer.prompt([
        {
          name: "choose",
          type: "list",
          message: `Select Option\n`,
          choices:
           [ 
            `Deposit Cash`,
            `Fast Cash`,
            `Withdraw Cash`,
            `Balance`, 
            `Transfer`,
            `PayBills`,
            `Exit`
          ],
        },
      ]);

         
        if (option.choose === "Deposit Cash") 
        {
            const depoCash = await inquirer.prompt
            ({
                name: "deposit",
                type: "number",
                message: `
                Enter the amount you want to Deposit $`,
            });
            console.log(chalk.blueBright(
              `\t\tDeposit Successfully.\n\n\t\tDeposited Amount: $${depoCash.deposit}.\n\n\t\tCurrent Balance: $${myBalance += depoCash.deposit}`)
             
            );
                console.log(`\n`)
            return continue_transaction();
        } 
      
        else if (option.choose === "Fast Cash") 
        {
           const fastCash = await inquirer.prompt
            ({
                name: "fcash",
                type: "list",
                message: `
                Select from the given option:`,
                choices: [
                  "1000",
                  "2000",
                  "5000",
                  "10000",
                  "25000",
                ]
            })
            console.log(chalk.blueBright(
              `\n\n\t\tWithdraw Amount: $${fastCash.fcash}.\n\n\t\tCurrent Balance: $${myBalance -= fastCash.fcash}`));
            console.log(`\n`)
            return continue_transaction(); 
        } 
        
        else if (option.choose === "Withdraw Cash") 
              
        {
              const withDrawCash = await inquirer.prompt
               ({
                 
                  name: "withdraw",
                  type: "number",
                  message: `
                   Enter the amount you want to Withdraw`,

                });
              
                if (withDrawCash.withdraw > myBalance) 

                {
                
                  console.log(chalk.blueBright(`\n\n\t\tInsufficiant Balance\n`));
                  return continue_transaction();
                } 
                
                else 

                {
                
                  console.log(chalk.blueBright(`\n\n\t\t Withdraw Successfully.\n\n\t\tCurrent Balance: $${myBalance -= withDrawCash.withdraw}`));
                }
                console.log(`\n`)
                return continue_transaction();
        }
  
        else if (option.choose === "Balance")
                  
        {
        
              console.log(chalk.blueBright(`\n\n\t\tCurrent Balance : $${myBalance}`));
              console.log(`\n`)
              return continue_transaction();
        } 
               
        

        else if (option.choose === "Transfer")
                  
        {
              const cashtransfer = await inquirer.prompt             
                  
              ([
              {
                    
                    name: "transfer",
                    type: "number",
                    message: `
                    Enter the 10-digit account number`,
                    
              },

              {
                    name: "totaltransfer",
                    type: "number",
                    message:
                    `Enter the amount you want to transfer:`,
              },
              ]);

              console.log(chalk.blueBright(`\n\n\t\tYou have successfully transfered $${cashtransfer.totaltransfer}
              to account # ${cashtransfer.  transfer} 
              \n\n\t\tCurrent Balance: $${myBalance -= cashtransfer.totaltransfer}`));

              console.log(`\n`)
                    return continue_transaction();
                   
              }

        else if (option.choose === "PayBills")
        
        {

            const addBills = await inquirer.prompt
            ([

              { name: "bills",
                type: "list",
                message:`
                Select Option`,
                choices: ["KE", "SUI-Gas", "PTCL", "KWSB"],
              }

            ]);

                if( addBills.bills ==="KE")

                {

                    const kelec = await inquirer.prompt
                    ([

                      { name: "kenum",
                        type: "number",
                        message: "Enter 8-digits account number:"
                }
                    ]);

                console.log(chalk.blueBright(`\n\n\t\tK-Electric \n\n\t\t Account #: ${kelec.kenum} \n\n\t\t Due Amount: $200`))
                console.log(`\n`)
                          const yn = await inquirer.prompt
                          ( 
    
                            { name : "yesno",
                              type :"list",
                              message: "\n\n\t\tWould you like to pay the K Electric bill.(y/n) ",
                              choices: ["yes","no"]
                            }
                          )

                            if(yn.yesno === "yes")
                              {
                                console.log(chalk.blueBright(`\n\n\t\tElectricity Bill Paid Successfully.
                                \n\n\t\tCurrent balance: ${myBalance-200}` ))
                                console.log(`\n`)
                                return continue_transaction();
                              }
                            else 
                            {
                              console.log(`\n`)
                              return continue_transaction();
                            }
                }
                
                else if( addBills.bills ==="SUI-Gas")

                {     
    
                    const sui = await inquirer.prompt
                    ([
    
                        { 
                          name: "sgas",
                          types: "number",
                          message: "Enter 8-digits account number:"
                        }
                      ]);
    
              console.log( chalk.blueBright(`\n\n\t\tSUI SOTHERN GAS COMPANY \n\n\t\t Account #: ${sui.sgas} \n\n\t\t Due Amount: $100` ))
              console.log(`\n`)
                          
                     const yn = await inquirer.prompt
                    ( 
        
                      {
                        name : "yesno",
                        type :"list",
                        message: "Would you like to pay the SUI Gas bill.(y/n) ",
                        choices: [ "yes","no"]
                      }
                    )
    
                        if(yn.yesno === "yes")
                        {
           
                         console.log(chalk.blueBright(`\n\n\t\tSUI GAS Bill Paid Successfully.
                         \n\n\t\tCurrent balance: ${myBalance-100}` ))
                         console.log(`\n`)
                         return continue_transaction();
                        }
                      
                        else 
                        { 
                          console.log(`\n`)
                          return continue_transaction();
                        
                        }
                  }
                            else if( addBills.bills ==="KWSB")

              {
    
              const water = await inquirer.prompt
              (
              { 
                      name: "kwsbill",
                      type: "number",
                      message: "Enter 8-digits account number:",
              },
              );
          
      console.log(chalk.blueBright(`\n\n\t\tKarachi Water Board \n\n\t\t Account #: ${water.kwsbill}\n\n\t\t Due Amount: $75`) )
      console.log(`\n`)
              const yn = await inquirer.prompt( 
                
                { name : "yesno",
                  type :"list",
                  message: " Would you like to pay the KWSB bill.(y/n) ",
                  choices: [ "yes","no"]
                })
            
                if(yn.yesno === "yes")
                {
                  console.log(chalk.blueBright(`\n\n\t\tKWSB Bill Paid Successfully.
                  \n\n\t\tCurrent balance: ${myBalance-75}`) )
                  console.log(`\n`)
                   return continue_transaction();
                }
            
                else { 
                  console.log(`\n`)
                  return continue_transaction();
                  }

              }
        else if( addBills.bills ==="PTCL")

        {
        
                  const phone = await inquirer.prompt([
                
                    { name: "phonebill",
                      type: "number",
                      message: "Enter phone# with area code:"
                    }]);
                
                  console.log(chalk.blueBright(`\n\n\t\tPakistan Telecommunication Limited \n\n\t\tAccount #: ${phone.phonebill} \n\t\t Due Amount: $250`) )
                  console.log(`\n`)
          const yn = await inquirer.prompt( 
            
            { 
              
              name: "yesno",
              type :"list",
              message: " Would you like to pay the PTCL bill.(y/n) ",
              choices: [ "yes","no"]
              
            })
        
            if(yn.yesno === "yes")
            
            {
               
              console.log(chalk.blueBright(`\n\n\t\tPTCL Bill Paid Successfully.
              \n\n\t\t Your balance: ${myBalance-250}` ))

              console.log(`\n`)
                continue_transaction();
            }
        
         else 
        {
          console.log(`\n`)
          return continue_transaction();
        }
      }
    }
    else
    {
      console.log(chalk.blueBright(`\n\n\t\tTHANKS FOR USING MY FIRST ATM`));
  
    }
}
    