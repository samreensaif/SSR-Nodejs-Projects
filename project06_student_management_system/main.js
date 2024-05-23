#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    student;
    std_ID;
    courses_enroll;
    isfeespaid;
    constructor(student, std_Id, courses_enroll, isfeespaid) {
        this.student = student;
        this.std_ID = std_Id;
        this.courses_enroll = courses_enroll;
        this.isfeespaid = isfeespaid;
    }
}
// *********************an array to save the records of individual object of class Student******************
let students = [];
let base_id = 100;
console.log(chalk.greenBright('\n\n\t\tWELCOME TO SSR-STUDENT-INFORMATION-SYSTEM'));
console.log(chalk.greenBright('\t\t<><><><><><><><><><><><><><><><><><><><><>'));
// ************************************show the option after 2 seconds***************************************
setTimeout(() => { main(); }, 2000);
//**********************main function which gives 3 Options: Enroll,Status,Exit******************************
async function main() {
    const userAsk = await inquirer.prompt({
        name: "u_Ask",
        type: "list",
        message: "\nSelect From Given Option:",
        choices: ["Enroll", "Std_Status", "Exit"]
    });
    if (userAsk.u_Ask === "Enroll") {
        await enrollStudent();
    }
    else if (userAsk.u_Ask === "Exit") {
        const want_to_cont = await inquirer.prompt({
            name: "exit",
            type: "list",
            message: "\nDo you want to exit:",
            choices: ["Yes", "No"]
        });
        if (want_to_cont.exit === "Yes") {
            console.log(chalk.greenBright(`\n\t\tTHANKS FOR VISITING SSR-STUDENT-INFORMATION-SYSTEM`));
        }
        else {
            await main();
        }
    }
    else {
        await show_status();
    }
}
//enroll function which ask for student name, trim the name and check whether user enter name or leave empty
async function enrollStudent() {
    let ask_new_student = await inquirer.prompt({
        name: "newStd",
        type: "input",
        message: "\nEnter Your name: "
    });
    let std_name_T = ask_new_student.newStd.trim(); //trim the student name
    std_name_T = std_name_T.toUpperCase(); //change to uppercase
    if (std_name_T.length > 0) // checks the name length
     {
        console.log(chalk.greenBright(`\n\n\t\tWELCOME, ${std_name_T} TO SSR-ENROLMENT FORM`));
        console.log(`\n\nYour account has been created ${std_name_T}\n `);
        await payFees(std_name_T);
    }
    else {
        console.log(`\nEnter a valid name`);
        await enrollStudent();
    }
}
//****************************function to genetrate 6-digits unique studentID**********************************
function uniqueID() {
    base_id++;
    let stu_id = 'SSR-' + base_id;
    return stu_id;
}
//*************************************function of asking tuition fees*****************************************
async function payFees(studentname) {
    let ask_new_course = await inquirer.prompt({
        name: "newCourse",
        type: "list",
        message: "Select the Discipline in which you want to enroll:",
        choices: ["Computer Science", "Mechanical", "Electrical", "Bio-Medical", "Civil"]
    });
    let askfees = await inquirer.prompt({
        name: "fpaid",
        type: "list",
        message: chalk.redBright(`\n\nFees to be paid: Rs.50,000.\n\nDid you pay the fees?`),
        choices: ["Yes", "No"]
    });
    //**************************** if dues cleared then push the record in the array*******************************
    if (askfees.fpaid === "Yes") {
        let newstd_ID = uniqueID();
        const newStudent = new Student(studentname, newstd_ID, ask_new_course.newCourse, true);
        students.push(newStudent);
        console.log(chalk.greenBright(`\n\n\tCONGRATULATIONS: YOU GET ENROLLED IN SSR-STUDENT-INFORMATION-SYSTEM `));
        await main();
    }
    else {
        console.log(chalk.greenBright(`\n\tYou Have to pay tuitions fees for further processing.`));
        let interested = await inquirer.prompt({
            name: "inter_yes",
            type: "confirm",
            message: chalk.redBright(`\nAre you interested to pay the fees?`)
        });
        if (interested.inter_yes) {
            await payFees(studentname);
        }
        else {
            console.log(chalk.greenBright(`\n\n\t\tLog-In again after paying fees.
                \n\n\tTHANKS FOR VISITING SSR-STUDENT-INFORMATION-SYSTEM`));
        }
    }
}
// ********************************show the Status of the listed students*********************************
async function show_status() {
    students.forEach(element => {
        console.log(`\nStudent Name: ${element.student},\nStudent ID: ${element.std_ID},\nCourses Enrolled: ${element.courses_enroll},\nFees Paid: ${element.isfeespaid ? "Yes" : "No"}`);
    });
    await main();
}
