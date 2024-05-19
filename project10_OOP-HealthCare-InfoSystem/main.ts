#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import clear from "clear";

clear()

await writeWords( (chalk.greenBright.italic(`\n\t\t\tWelcome To SSR-HealtCare-InfoSystem`))); 
await writeWords( (chalk.greenBright(`\n\t\t\t************************************\n`))); 

//--------------------------------Panel of Doctors Available-------------------------------------------------
let consultants : any= {

    General_Physician: "Dr.Nimra Imtiaz - FCPS(Medicine)",
    Paediatrcian: "Dr.Jalal Akbar - DCH,MCPS,FCPS",
    Orthopaedic: "Dr.Mehmood Askari - FCPS(Ortho),MCPS ",
    Neurologist:"Dr.Aftab Ahmed - FCPS(Neorology)" ,
    Cardiologist:"Dr.Shamim Siddiqui - FCPS(Medicine), FCPS(Cardiology)"
}


//--------------------------------class of patients info-----------------------------------------------------

class PatientsInfo {

    pName: string;
    pGender: string;
    pAge: number;
    pContactNo: number;
    pMrNo: string;
    

    constructor(name:string,gender:string,age:number, contactNo: number, mrNo:string)
    
    {

    this.pName = name;
    this.pGender = gender;
    this.pAge = age;
    this.pContactNo = contactNo;
    this.pMrNo = mrNo;
    

    }

//-------------------------------  generate Patient MR no. function--------------------------------

 static mrNo():string 

{
    let baseID ="SSR-"

    let number = Math.floor(Math.random()*1000)

    return (baseID + number);

}
}

// show words on screen with the delay of 50ms

async function writeWords (words:string) 

{
    
    for(let char of words)
        
        {
        
        process.stdout.write(char);
        
        await new Promise((resolve) => 
            
            {
                setTimeout(resolve,50) 
            }
        )
        }
  }

  // show words on screen with the delay of 20ms

  async function writeWordsfast (words:string) 

  {
      
      for(let char of words)
          
          {
          
          process.stdout.write(char);
          
          await new Promise((resolve) => 
              
              {
                  setTimeout(resolve,20) 
              }
          )
          }
    }
// function for appoinment date

function setAppointmentDate() {
    
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);

    let nameOfDays: string[]=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    // Check if the appointment date falls on a Sunday (0 represents Sunday in getDay())

    if (currentDate.getDay() === 0) 
        
        {
        // Move the date to Monday
        currentDate.setDate(currentDate.getDate() + 1);
        }

    let dayNo: number = currentDate.getDay()

    // return an object
    return {
            dayname: nameOfDays[dayNo], 
            date: currentDate
            }
}

let appointmentDate = setAppointmentDate();

// function to format time from 24 hr to 12 hr clock, add AM/PM, instead of number print month name, set date as ordinal number,

function newDate(dateTime: Date, dayname: string)

{


let monthName:string[]=["January","February","March","April","May","June","July","August","September","October","November","December"]

let yr = dateTime.getFullYear();

let month = monthName[dateTime.getMonth()+1]

let day = dayname;

let date = dateTime.getDate()

let hr = dateTime.getHours()

let min = dateTime.getMinutes()

//-------------------------set date as ordinal number---------------------------------------------------------

let datestring = date.toString()
let ordinalnumber :string ;
if( datestring === "1" || datestring === "31")
    {
        ordinalnumber = "st"
    }

else if (datestring=== "2" || datestring === "22")
    {
        ordinalnumber ="nd"
    }
else if (datestring === "3" || datestring === "23")
    {
        ordinalnumber ="rd"
    }
else{
    ordinalnumber = "th"
}

datestring =  date+ordinalnumber

//----------------set 24hr clock into 12 hr clock--------------------------------------------------

let clock:string="";
//let twelveHrClock:number = hr;

if ((hr >=0 && hr <=11) && (min >=0 && min <=59 ))
    {
        clock = "AM"
    }
else if((hr >=12 && hr <=24)&& (min >=0 && min <=59))
    {
        clock = "PM"
        hr = hr-12
    }

 let nHour = hr.toString().padStart(2,"0")
 let nMin = min.toString().padStart(2,"0")+clock
 

return { year: yr,
         month: month, 
         day: day,
         date : datestring, 
         hour: nHour, 
         minutes:nMin}

}

//-------------------------------object of patients dictionery-----------------------------------------------


let createPatientData = await inquirer.prompt([
       
    {
         name: "p_fullname",
         type:"input",
         message:"Enter Full Name:"
       
    },
    {
        name: "p_gender",
        type:"input",
        message:"Enter gender:"
      
    },
    {
        name: "p_age",
        type:"number",
        message:"Enter Age:"
    },
    {
        name: "p_contactNumber",
        type:"input",
        message:"Enter 5-digits Phone# :",
        validate: function (input)
        {
             let num = parseInt(input)

             if(!isNaN(num) && input.length===5)
                 {
                     return true;

                 }
             else
                 {
                     return "Please enter a valid 5-digit Contact number.";
                     
                 }    
        }
        
    }

])


let name = createPatientData.p_fullname;
   
   name =
   name.split(" ").map((a:string)=>a.charAt(0).toUpperCase()+ a.slice(1).toLowerCase()).join(" ");
 
// Generate MR number for the patient

let pmrNo = PatientsInfo.mrNo();   

// Create PatientInfo object

let patient: any = new PatientsInfo(name, createPatientData.p_gender,createPatientData.p_age, createPatientData.p_contactNumber, pmrNo, );


// Store patient information in patients dictionary

let patients: { [pMrNo: string]: PatientsInfo } = {};

patients[pmrNo] = patient; // Store patient information using the generated MR number as the key

clear()

await writeWords( (chalk.red.bold(`\n\t\t\tDear Mr./Mrs./Ms ${name}, your file has been created.\n\n\t\t\t\t MR Number is ${pmrNo}\n\n`))); 

// print consultants list:

await writeWords( (chalk.magenta.bold.underline (`\n\t\t\t\tCONSULTANTS LIST\n`))); 

await writeWordsfast( (chalk.yellow.bold.underline (`\n\t\t\tGeneral_Physician: Dr.Nimra Imtiaz - FCPS(Medicine)\n`)));

await writeWordsfast( (chalk.yellow.bold.underline (`\n\t\t\tPaediatrcian: Dr.Jalal Akbar - DCH,MCPS,FCPS\n`)));

await writeWordsfast( (chalk.yellow.bold.underline (`\n\t\t\tOrthopaedic: Dr.Mehmood Askari - FCPS(Ortho),MCPS \n`)));

await writeWordsfast( (chalk.yellow.bold.underline (`\n\t\t\tNeurologist:Dr.Aftab Ahmed - FCPS(Neorology)\n`)));

await writeWordsfast( (chalk.yellow.bold.underline (`\n\t\t\tCardiologist:"Dr.Shamim Siddiqui - FCPS(Medicine), FCPS(Cardiology)\n\n`)));

// ask for particular consultant

let ask = await inquirer.prompt({

    name: "askForDoc",
    type:"list",
    message:"Select Doctor For Appointment:",
    choices:  Object.keys(consultants).map((key) => ({ name: key, value: key }))
})

let docKey = ask.askForDoc
let docName: string =consultants[docKey]

let setnewappointment =newDate(appointmentDate.date,appointmentDate.dayname)

// print Appointment detailes

await writeWordsfast( (chalk.magenta.bold.italic.underline(`\n\t\t\tAppointment Detailes:\n\n`))); 

console.log(`\tFull Name: ${chalk.yellowBright(patient.pName)}\n`);
console.log(`\tAge: ${chalk.yellowBright(patient.pAge)}\n`);
console.log(`\tGender: ${chalk.yellowBright(patient.pGender)}\n`);
console.log(`\tMR#: ${chalk.yellowBright(patient.pMrNo)}\n`);

console.log(`\tDoctor:${chalk.yellowBright(docName)}`);

console.log(chalk.redBright.underline(`\n\t${setnewappointment.day}, ${setnewappointment.date} ${setnewappointment.month}, ${setnewappointment.year} ${setnewappointment.hour}:${setnewappointment.minutes}`));


await writeWords( (chalk.greenBright.italic(`\n\t\t\tThanks For Using SSR-HealtCare-InfoSystem`))); 
await writeWords( (chalk.greenBright(`\n\t\t\t****************************************\n`))); 
