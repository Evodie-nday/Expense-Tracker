const form = document.getElementById("expense-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const list = document.getElementById("expense-list");
const balance = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transanctions"))|| [];

function renderTransactions(){
  list.innerHTML = "";
  let total = 0;

  transactions.forEach((total, index) => {
const li = document.createElement("li");
li.classList.add(total.amount > 0 ? "income" : "expense");
li.innerHTML = `
${t.description} - ${t.amount} on ${t.date}
<div>
  <button class="edit" onclick="editTransactions(${index})">edit</button>
  <button class="delete" onclick="deleteTransaction(${index})">delete</button>
</div>`
;
list.appendChild(li);
total += Number(t.amount);
  });
  balance.textContent = total;
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
form.addEventListener("submit", (e) =>{
e.preventDefault();
transactions.push({
  description: description.value,
  amount: Number(amount.value),
  date: date.value
});
description.value = "";
amount.value= "";
date.value= "";
renderTransactions();
});
function editTransaction(index){
  const t= transactions[index];
  description.value = t.description;
  amount.value = t.amount;
  date.value = t.date;
  transactions.splice(index, 1);
  renserTransactions();
}

function deleteTransaction(index){
  transactions.splice(index, 1);
  renderTransactions();
}
renderTransactions();