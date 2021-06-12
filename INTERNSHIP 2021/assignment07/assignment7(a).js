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

let valid = 1;
let form = document.querySelector("#expense-form");
form.addEventListener('submit',(e)=>{
    let expname= document.getElementById('name').value
    if(expname == ''){
        document.getElementById('err').classList.remove('d-none');
         document.getElementById('err').innerText="Enter name";
         valid = 0
     }

     //Use of regEx for fullname validation
     if(!/^[a-zA-Z]+$/.test(expname)) //allowing names from a-z or A-Z or combination for fullname
     {
        document.getElementById('err').classList.remove('d-none');
        document.getElementById('err').innerText="Invalid Name";
        valid = 0
     }

     let expamt= document.getElementById('amount').value
     if(expamt == ''){
        document.getElementById('err').classList.remove('d-none');
         document.getElementById('err').innerText="Enter amount";
         valid = 0
     }
     else{
         if(!/^[0-9]+$/.test(expamt)){
            document.getElementById('err').classList.remove('d-none');
            document.getElementById('err').innerText="Invalid number";
            valid = 0 
         }
     }

     let expdate=document.getElementById('edate').value

     if(valid==1){
         const exp = new Expense(expname,expamt,expdate)
         exp.explist()
     }

     e.preventDefault();

})