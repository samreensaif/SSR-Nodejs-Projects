#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import clear from "clear";
// to clear screen
clear();
//--------------------------------------Account Holder Information---------------------------------------------
class CustomerInfo {
    cust_fullName;
    cust_CNIC;
    cust_Age;
    cust_gender;
    acc_number;
    acc_balance;
    constructor(fullname, cnic, age, gender, accountNo, accountBal) {
        this.cust_fullName = fullname;
        this.cust_CNIC = cnic;
        this.cust_Age = age;
        this.cust_gender = gender;
        this.acc_number = accountNo;
        this.acc_balance = accountBal;
    }
    //-------------------------------static async generate account id function--------------------------------
    static accountid() {
        let baseID = "IBAN-00SSR-";
        let number = Math.floor(Math.random() * 100000);
        return (baseID + number);
    }
    //-----------------------------static async continue process function----------------------------------------
    static async continueProcess() {
        let continue_or_not = await inquirer.prompt([
            {
                name: "continueoption",
                type: "list",
                message: "Do You Want To Go To Main Menu?",
                choices: ["Yes", "No"],
            },
        ]);
        if (continue_or_not.continueoption === "Yes") {
            main();
        }
        else {
            await writeWords((chalk.greenBright.italic(`\n\t\t\tThanks For Using SSR-MY-BANK App`)));
            await writeWords((chalk.greenBright(`\n\t\t\t********************************\n`)));
        }
    }
    //-----------------------------static async Create Bank Account ----------------------------------------
    static async createBankAccount() {
        let createAccount = await inquirer.prompt([
            {
                name: "c_fullname",
                type: "input",
                message: "Enter Full Name:"
            },
            {
                name: "c_cnic",
                type: "input",
                message: "Enter 5-digits CNIC# :",
                validate: function (input) {
                    let num = parseInt(input);
                    if (!isNaN(num) && input.length === 5) {
                        return true;
                    }
                    else {
                        return "Please enter a valid 5-digit number.";
                    }
                }
            },
            {
                name: "c_age",
                type: "number",
                message: "Enter Age:"
            },
            {
                name: "c_gender",
                type: "input",
                message: "Enter Gender:",
                validate: function (input) {
                    let gender = input.toLowerCase();
                    if (gender === "female" || gender === "male") {
                        return true;
                    }
                    else {
                        console.log("Enter male/female:");
                    }
                }
            },
            {
                name: "c_InitialBal",
                type: "number",
                message: "Enter Initial Balance:"
            }
        ]);
        // Name should be in Title Case
        let name = createAccount.c_fullname;
        name =
            name.split(" ").map((a) => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(" ");
        //Generate account ID
        let accNum = CustomerInfo.accountid();
        // Create CustomerInfo object
        let customer = new CustomerInfo(name, createAccount.c_cnic, createAccount.c_age, createAccount.c_gender, accNum, createAccount.c_InitialBal);
        //Store customer information
        customers[createAccount.c_cnic.toString()] = customer;
        // Account created successfully message
        await writeWords((chalk.yellowBright.bold(`\n\t\t\tYour account has been Successfully created ${chalk.blueBright.underline(name)}\n\n\t\t\tYour new account number is : ${chalk.blueBright.underline(accNum)}\n\n`)));
        await CustomerInfo.continueProcess();
    }
    //-----------------------------static async account detailes function------------------------------------- 
    static async accountDetails() {
        let askForAcc = await inquirer.prompt({
            name: "askCnic",
            type: "number",
            message: "Enter your CNIC:"
        });
        let cnic = askForAcc.askCnic.toString();
        let customer = customers[cnic];
        if (customer) {
            await writeWords((chalk.magenta.bold.italic(`\n\t\t\tCustomer Information\n\n`)));
            console.log(`\tFull Name: ${chalk.yellowBright(customer.cust_fullName)}\n`);
            console.log(`\tCNIC: ${chalk.yellowBright(customer.cust_CNIC)}\n`);
            console.log(`\tAge: ${chalk.yellowBright(customer.cust_Age)}\n`);
            console.log(`\tGender: ${chalk.yellowBright(customer.cust_gender)}\n`);
            console.log(`\tAccount Number: ${chalk.yellowBright(customer.acc_number)}\n`);
            console.log(`\tAccount Balance: ${chalk.yellowBright(customer.acc_balance)}\n`);
            await CustomerInfo.continueProcess();
        }
        else {
            await writeWords((chalk.red.bold(`\n\t\t\tInvalid CNIC. Customer Not Found.\n\n`)));
            await CustomerInfo.continueProcess();
        }
    }
    //-----------------------------static async credit function----------------------------------------------
    static async credit() {
        let askForcnic = await inquirer.prompt({
            name: "askcnic",
            type: "number",
            message: "Enter your CNIC: "
        });
        let cnicNum = askForcnic.askcnic;
        const customer = customers[cnicNum];
        if (customer) {
            let askAmtCredit = await inquirer.prompt({
                name: "AmountCredit",
                type: "number",
                message: "Enter the amount to credit:"
            });
            let creditAmount = askAmtCredit.AmountCredit;
            customer.acc_balance += creditAmount;
            await writeWords((chalk.magentaBright.bold.italic.underline(`\n\t\t\tAmount Successfully Credited:${creditAmount}\n\n`)));
            await writeWords((chalk.magentaBright.bold.italic.underline(`\n\t\t\tUpdated Balance:${customer.acc_balance}\n\n`)));
            await CustomerInfo.continueProcess();
        }
        else {
            await writeWords((chalk.red.bold(`\n\t\t\tInvalid CNIC.\n\t\t\tAccount Not Found.\n\n`)));
            await CustomerInfo.continueProcess();
        }
    }
    //-----------------------------static async debit function----------------------------------------------
    static async debit() {
        let askForcnic = await inquirer.prompt({
            name: "askcnic",
            type: "number",
            message: "Enter your CNIC: "
        });
        let cnicNum = askForcnic.askcnic;
        const customer = customers[cnicNum];
        if (customer) {
            let askAmtDebit = await inquirer.prompt({
                name: "AmountDebit",
                type: "number",
                message: "How Much Money You Want To Withdraw:"
            });
            let debitAmount = askAmtDebit.AmountDebit;
            if (debitAmount > customer.acc_balance) {
                await writeWords((chalk.red.bold(`\n\t\t\tInsufficient Balance\n\n\t\tCurrent Balance: ${customer.acc_balance}\n\n`)));
            }
            else {
                customer.acc_balance -= debitAmount;
                await writeWords((chalk.magentaBright.bold.italic.underline(`\n\t\t\tAmount Successfully Debited:${debitAmount}\n\n`)));
                await writeWords((chalk.magentaBright.bold.italic.underline(`\n\t\t\tUpdated Balance:${customer.acc_balance}\n\n`)));
            }
            await CustomerInfo.continueProcess();
        }
        else {
            await writeWords((chalk.red.bold(`\n\t\t\tInvalid CNIC.\n\t\t\tAccount Not Found.\n\n`)));
            await CustomerInfo.continueProcess();
        }
    }
}
// show words on screen with the delay of 80ms
async function writeWords(words) {
    for (let char of words) {
        process.stdout.write(char);
        await new Promise((resolve) => {
            setTimeout(resolve, 50);
        });
    }
}
//---------------------------------- Object to store customer information-----------------------------------
let customers = {};
await writeWords((chalk.greenBright.italic(`\n\t\t\tWelcome To SSR-MY-BANK App`)));
await writeWords((chalk.greenBright(`\n\t\t\t**************************\n`)));
await main();
//-----------------------------------------------function main()----------------------------------------------
async function main() {
    let selectOptions = await inquirer.prompt({
        name: "option",
        type: "list",
        message: "Select an Option: ",
        choices: ["Create Account", "Account Detailes", "Credit", "Debit", "Exit"]
    });
    if (selectOptions.option === "Create Account") {
        clear();
        const Animation = chalkAnimation.rainbow(`\n\t\t\tCreate Account\n\t\t\t**************`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        Animation.stop();
        await CustomerInfo.createBankAccount();
    }
    else if (selectOptions.option === "Account Detailes") {
        clear();
        const Animation = chalkAnimation.rainbow(`\n\t\t\tAccount Details\n\t\t\t***************`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        Animation.stop();
        await CustomerInfo.accountDetails();
    }
    else if (selectOptions.option === "Credit") {
        clear();
        const Animation = chalkAnimation.rainbow(`\n\t\t\tCredit\n\t\t\t******`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        Animation.stop();
        await CustomerInfo.credit();
    }
    else if (selectOptions.option === "Debit") {
        clear();
        const Animation = chalkAnimation.rainbow(`\n\t\t\tDebit\n\t\t\t*****`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        Animation.stop();
        await CustomerInfo.debit();
    }
    else {
        const Animation = chalkAnimation.rainbow(`\n\t\t\tThank you for using SSR-MY-BANK App\n`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        Animation.stop();
    }
}
