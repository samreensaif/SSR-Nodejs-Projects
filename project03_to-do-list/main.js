#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//import { todo } from "node:test"
let condition = true;
console.log(chalk.greenBright(`\n\t\t=====SSR-TO-DO LIST=====\n\n`));
let todo_List = ["Solve 100-Days-Coding-Challenge",
    "Watch Ramadan-Coding-Nights",
    "Learn Typescript From Videos ",
    "Practice Different Coding Questions "];
const task = await inquirer.prompt({
    name: "todoList",
    type: "list",
    message: "Do you want to see your Todays Plan Regarding TypeScript Programming\n",
    choices: ["yes", "no"]
});
if (task.todoList == "yes") {
    console.log(chalk.greenBright(`\n\t\t====YOUR DAILY TO_DO LISTS====\n`));
    for (let i of todo_List) {
        console.log(`\t`);
        console.log(chalk.greenBright(`\t\t`, i));
    }
    console.log(`\n`);
    const choose_fm_list = await inquirer.prompt({
        name: "checkedtask",
        type: "checkbox",
        message: "Kindly Check the Task Which You Have Already Done.\n\n",
        choices: ["Solve 100-Days-Coding-Challenge",
            "Watch Ramadan-COding-Nights",
            "Learn Typescript From Videos ",
            "Practice Different Coding Questions "],
    });
    let checkedBox = choose_fm_list.checkedtask.length;
    if (checkedBox > 0 && checkedBox <= 3) {
        console.log(chalk.greenBright(`\n\nYou have completed ${checkedBox} task .\n\nTry to complete the remaining task\n\n`));
        await asktask();
    }
    else if (checkedBox === 4) {
        console.log(chalk.greenBright(`\n\nYou have completed all the ${checkedBox} task :) .\n\nCongratulations!!!\n\n`));
        await asktask();
    }
    else if (checkedBox === 0) {
        console.log(chalk.greenBright(`\n\t\tNot a Single Task You Have Completed :( \n\n\t\tIt's Alarming. You Are Very lazy\n\n`));
        await asktask();
    }
}
else {
    console.log(chalk.greenBright(`\n\t\t=====Thanks for Using SSR-TO-DO LIST=====\n\n`));
}
//function to ask whether want to add or delete any task 
async function asktask() {
    const ask_Task = await inquirer.prompt({
        name: "ask",
        type: "list",
        message: "Do you want to VIEW, ADD, DELETE, EXIT ?",
        choices: ["VIEW", "ADD", "DELETE", "EXIT"]
    });
    if (ask_Task.ask === "ADD") {
        addTask();
    }
    else if (ask_Task.ask === "DELETE") {
        deleteTask();
    }
    else if (ask_Task.ask === "VIEW") {
        for (let i of todo_List) {
            console.log(`\t`);
            console.log(chalk.greenBright(`\t\t`, i));
        }
        await continue_task();
    }
    else {
        console.log(chalk.greenBright(`\n\t\t=====Thanks for Using SSR-TO-DO LIST=====\n\n`));
    }
}
//function for adding the task
async function addTask() {
    let moretask = await inquirer.prompt({
        name: "add_task",
        type: "input",
        message: "\nList the task you want to add: "
    });
    let temp = moretask.add_task;
    todo_List.push(temp);
    console.log(chalk.greenBright(`\n\n\t\tThe task was Successfully Updates!!!
        \n\n\t\t====THE UPDATED TO-DO's LIST====\n`));
    for (let i of todo_List) {
        console.log(`\n`);
        console.log(i);
    }
    let ask = await inquirer.prompt({
        name: "ask",
        type: "list",
        message: "\nDo you want to add more task?",
        choices: ["yes", "no"]
    });
    if (ask.ask === "yes") {
        await addTask();
    }
    else {
        continue_task();
    }
    //  console.log(chalk.greenBright("\n\n\t\t=====THANKS FOR USING THE APP===="))
}
async function deleteTask() {
    let ask_del = await inquirer.prompt({
        name: "askdel",
        type: "list",
        message: "\nDo you really want to delete the task?",
        choices: ["yes", "no"]
    });
    if (ask_del.askdel === "yes") {
        let sel_del_fm_todo = await inquirer.prompt({
            name: "del_list",
            type: "list",
            message: "\nSelect the task from the List which you want to delete",
            choices: todo_List
        });
        let index = todo_List.indexOf(sel_del_fm_todo.del_list);
        if (index != -1) {
            todo_List.splice(index, 1);
            console.log(chalk.greenBright(`\n\n\t\tThe task was Successfully Deleted!!! 
\n\n\t\t====THE UPDATED TO-DO's LIST====\n`));
            for (let i of todo_List) {
                console.log(`\n`);
                console.log(i);
            }
            await continue_task();
        }
    }
}
async function continue_task() {
    //after first transaction of work than it will ask this
    let continue_or_not = await inquirer.prompt([
        {
            name: "continueoption",
            type: "list",
            message: "\nDo You Want To go to main menu?",
            choices: ["yes", "no"],
        },
    ]);
    if (continue_or_not.continueoption === "yes") { //if yes than it will go to bank system again
        asktask();
    }
    else { //if no than program will end 
        console.log(chalk.greenBright(`\n\t\t=====Thanks for Using SSR-TO-DO LIST=====\n\n`));
    }
}
