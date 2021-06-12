class Expense{
    expName
    expAmount
    expDate

    constructor(ename,eamt,edate){
        this.expName=ename
        this.expAmount=eamt
        this.expDate=edate
    }

    explist(){
        const div = document.createElement('div')
        div.id = "expense_"+Math.floor(Math.random()*1000)
        div.class = "card"
        div.innerHTML = `<div class="card-header">
                            <h3>${this.expName}</h3>
                         </div>
                         <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <strong>Amount:</strong>${this.expAmount} | <strong>Date:</strong>${this.expDate}
                                </div>
                            </div>
                         </div>
        `;
        document.querySelector('.expenselist').appendChild(div);
    }
}


let form = document.querySelector("#expense-form");
form.addEventListener('submit',(e)=>{
    let error = ''
    let valid = 1;

    let expname= document.getElementById('name').value
    if(expname == ''){
        document.getElementById('err').classList.remove('d-none');
        // document.getElementById('err').innerText="Enter name";
        error += "Enter name\n"
         valid = 0
     }

     //Use of regEx for fullname validation
     else{
            if(!/^[a-zA-Z]+$/.test(expname)) //allowing names from a-z or A-Z or combination for fullname
            //if(!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$/.test(expname)) 
            {
                document.getElementById('err').classList.remove('d-none');
                //document.getElementById('err').innerText="Invalid Name";
                error += "Invalid name\n"
                valid = 0
            }
    }

     let expamt= document.getElementById('amount').value
     if(expamt == ''){
        document.getElementById('err').classList.remove('d-none');
         //document.getElementById('err').innerText="Enter amount";
         error += "Enter amount\n"
         valid = 0
     }
     else{
         if(!/^[0-9]+$/.test(expamt)){
            document.getElementById('err').classList.remove('d-none');
            //document.getElementById('err').innerText="Invalid amount";
            error += "Invalid amount\n"
            valid = 0 
         }
     }

     let expdate=document.getElementById('edate').value
     if(expdate == ''){
        document.getElementById('err').classList.remove('d-none');
         //document.getElementById('err').innerText="Enter date";
         error += "Enter date\n"
         valid = 0
     }

     if(valid==1){
         const exp = new Expense(expname,expamt,expdate)
         exp.explist()
     }
     else{
         document.getElementById('err').innerText=`${error}`
     }

     e.preventDefault();

})