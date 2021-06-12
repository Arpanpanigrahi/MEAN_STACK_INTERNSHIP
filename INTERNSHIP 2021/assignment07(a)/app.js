const form = document.querySelector("#expense-form");
const expenseList = document.querySelector(".listItems");
const clearBtn = document.querySelector(".clear-expenses");
const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const dateInput = document.querySelector("#date");

loadEventListeners();

function loadEventListeners() {
  form.addEventListener("submit", addExpense);
  expenseList.addEventListener("click", removeExpense);
  clearBtn.addEventListener("click", clearExpenses);
}

function addExpense(e) {
  let valid = 1;
  let error = "";
  if (nameInput.value === "") {
    error += "Add Expense Name!!<br>";
    valid = 0;
  }
  if (amountInput.value === "") {
    valid = 0;
    error += "Add Expense Amount!!<br>";
  }
  if (dateInput.value === "") {
    valid = 0;
    error += "Add The Date Of Expense!!<br>";
  }
  if (valid === 0) {
    document.getElementById("err").classList.remove("d-none");
    document.getElementById("err").innerHTML = error;
    e.preventDefault();
  } else {
    error='';
    document.getElementById("err").classList.add("d-none");
    const div = document.createElement("div");
    const li = document.createElement("li");

    div.innerHTML = `<div class="row">
                    <div class="col s12">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <span class="card-title">Name: ${nameInput.value}</span>
                          <a href="#" class="delete-item secondary-content"><i class="fa fa-remove"></i></a>
                          <p>Amount: ${amountInput.value}</p>
                          <p>Date: ${dateInput.value}</p>
                        </div>
                      </div>
                    </div>
                  </div>`;
    expenseList.appendChild(div);

    nameInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
  }
}

function removeExpense(e) {
  e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
}

function clearExpenses() {
  expenseList.innerHTML = "";
}
