const fs = require('fs');
const PromptSync = require('prompt-sync');
const prompt = PromptSync();

const employeesBuffer = fs.readFileSync('./employees.json');
const employeeData = JSON.parse(employeesBuffer);
const deptBuffer = fs.readFileSync('./department.json');
const deptData = JSON.parse(deptBuffer);


const nEmp = prompt('How many employee details you want to add: ');
for(let i=0;i<nEmp;i++){
    const eId = prompt('Enter Employee iD:');
    const eName = prompt('Enter Employee name:')
    const ePhone = prompt('Enter Employee phone number:');
    const edept = prompt('Enter your department(finance/sales,system):')

    const employee = {
        empName:eName,
        empID:eId,
        empPhone:ePhone
    }

    const department= {
        empID:eId,
        empDept:edept
    }

   employeeData.push(employee)
   deptData.push(department)

    
    
}

fs.writeFileSync('./employees.json',JSON.stringify(employeeData))
fs.writeFileSync('./department.json',JSON.stringify(deptData))

const groupingBuffer = fs.readFileSync('./department.json')
const grpData = JSON.parse(groupingBuffer)

//For sales.json file
const salesarr=[]

for(let i=0;i<grpData.length;i++){
    if(grpData[i].empDept =='sales'){
        const sales ={
            empID:grpData[i].empID,
            empDept:"sales"
        }
        salesarr.push(sales)
}
}
fs.writeFileSync('./sales.json',JSON.stringify(salesarr))  

//For FInance department
const financearr=[]

for(let i=0;i<grpData.length;i++){
    if(grpData[i].empDept =='finance'){
        const finance ={
            empID:grpData[i].empID,
            empDept:"finance"
        }
        financearr.push(finance)
}
}
fs.writeFileSync('./finance.json',JSON.stringify(financearr))

// For Systems Department
const systemsarr=[]
console.log(grpData.length)
for(let i=0;i<grpData.length;i++){
    if(grpData[i].empDept =='system'){
        const systems ={
            empID:grpData[i].empID,
            empDept:"system"
        }
        systemsarr.push(systems)
}
}
fs.writeFileSync('./systems.json',JSON.stringify(systemsarr))

//To fetch a data from the json file against an input name
const n = prompt('Enter the name of the Employee whose details you want to know : ');
const fetchBuffer = fs.readFileSync('./employees.json');
const fetchData = JSON.parse(fetchBuffer)
const fetchdeptBuffer = fs.readFileSync('./department.json');
const fetchdeptData = JSON.parse(fetchdeptBuffer)
for(let i=0;i<fetchData.length;i++){
    if(fetchData[i].empName==n){
        console.log(`EMPID:${fetchData[i].empID}\nDEPT:${fetchdeptData[i].empDept}`)
    }
}