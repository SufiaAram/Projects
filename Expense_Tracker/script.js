
/* -------------------------------------------------- Selecting elements and storing in variables ---------------------------------- */
const addItemEl = document.querySelector(".add-item");
const clearAll = document.querySelector(".clear-all");

const itemAmountInput = document.querySelector("#item-amount");
const itemNameInput = document.querySelector("#item-name");
const ul = document.querySelector(".expense-list");

const totalEl = document.querySelector(".total");


/* ----------------- Loading the list and total when the page loads -------------------- */
window.onload = function() {
  loadList();
  loadTotal();
};

itemNameInput.focus();
let total = 0.00;


/* -------------------------------- Function to add a new item to the list ----------------------- */
function addItem() {
  if(itemAmountInput.value.length > 0 && itemNameInput.value.length > 0){
    const li = document.createElement('li');
    li.textContent = `${itemNameInput.value}: ₹${itemAmountInput.value}`;
    ul.append(li);
    total += Number(itemAmountInput.value);
    totalEl.textContent = total  + '.00';
    itemAmountInput.value = "";
    itemNameInput.value = "";
    saveList();
    saveTotal();
  } else {
    alert('Please fill the inputs');
  }
}


/* ---------------------------- Function to save the list items to localStorage -------------------------- */
function saveList() {
  const items = [];

  for(let i=0; i< ul.children.length; i++){
    items.push(ul.children[i].textContent);
  }

  localStorage.setItem('itemlist', JSON.stringify(items))
}


/* --------------------------------- Function to save the total amount to localStorage -------------------------- */
function saveTotal() {
  localStorage.setItem('total', total);
}


/* -------------------------------- Function to load the list items from localStorage -------------------------- */
function loadList() {
 const items = JSON.parse(localStorage.getItem('itemlist'));
 ul.innerText = '';

 if (items) {
  items.forEach(itemText => {
      const li = document.createElement('li');
      li.textContent = itemText;
      ul.appendChild(li);
  });
}
};


/* --------------------------------------------- Function to load the total amount from localStorage --------------------------- */
function loadTotal() {
  const storedTotal = localStorage.getItem("total");
  if (storedTotal) {
      total = Number(storedTotal);
      totalEl.textContent = total.toFixed(2);
  }
}


/* -------------------------------- Function to clear the list and total amount from localStorage and UI -------------------------- */
function clearList() {
  localStorage.clear();
  ul.innerHTML = "";
  total = 0;
  totalEl.textContent = total + '.00';
}

/* ----------------------------------------- Event listeners for buttons and Inputs------------------------------------------------------ */
addItemEl.addEventListener("click", () => {
    addItem();
});

clearAll.addEventListener('click', () => {
  clearList();
  itemNameInput.focus();
});

itemAmountInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    addItem();
  }
});