let form = document.querySelector('#emp-form')

form.addEventListener('submit',(e)=>{
    var fullname = document.getElementById('empName').value;
    if(fullname == ''){
        document.getElementById('err').classList.remove('d-none');
         document.getElementById('err').innerText="Please enter your name";
     }

    let employeeId = document.getElementById('empId').value;

    let department = document.getElementById('dept').value;

    let designation = document.getElementById('desn').value;

    let basicsalary =Number(document.getElementById('bSal').value);

    let birthyear = document.getElementById('bYear').value;

    let joinyear = document.getElementById('jYear').value;
  
    console.log(`Employee Name:${fullname}\n ID:${employeeId}\nDepartment:${department}\nDesignation:${designation}\nBasic Salary:${basicsalary}\nYOB:${birthyear}\nJoined:${joinyear}`);
    
    class Employee {
        empName=fullname;
        empId=employeeId;
        empDept=department;
        empDesn=designation;
        empBasicSal=basicsalary;
        empBirthYear=birthyear;
        empJoinYear=joinyear;

        totalSal(){
            var sum=0;
            let tds=0;
            let bonus = (this.empBasicSal)*0.1
            let rent = this.empBasicSal*0.15
            let service = 2021-this.empJoinYear

            if(this.empBasicSal<=750000){
                tds = this.empBasicSal*0.05;
            }
            else if(this.empBasicSal<=1000000){
                tds = this.empBasicSal*0.075;
            }
            else if(this.empBasicSal<=1500000){
                tds = this.empBasicSal*0.15;
            }
            else if(this.empBasicSal<=1000000){
                tds = this.empBasicSal*0.075;
            }
            else if(this.empBasicSal<=1500000){
                tds = this.empBasicSal*0.15;
            }
            else{
                tds = this.empBasicSal*0.20;
            }

            if(service>10){
                sum = this.empBasicSal - tds + 60000 + bonus
            }
            else{
                sum = this.empBasicSal - tds +bonus
            }

            return sum;
        }

        currage(){
            let age = 2021-this.empBirthYear;
            return age;
        }
    }
    const emp = new Employee(fullname);
    console.log(` Total salary=${emp.totalSal()}\n Age=${emp.currage()}`);


    e.preventDefault();
})
