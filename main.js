import pizza from './pizza.mjs';
import combo from './combo.mjs';

// sticky navbar
window.addEventListener('scroll', function () {
  const stickyNav = document.querySelector('.sticky');
  const stickyOffsetTop = stickyNav.offsetTop;

  if (window.pageYOffset > stickyOffsetTop) {
      stickyNav.classList.add('fixed');
  } else {
      stickyNav.classList.remove('fixed');
  }
});

// pizza consturcotr
/* drag and drop */
const dragItems = document.querySelectorAll('.drag-item');
const dropContainer = document.querySelector('.drop-container');

dragItems.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

dropContainer.addEventListener('dragover', dragOver);
dropContainer.addEventListener('dragenter', dragEnter);
dropContainer.addEventListener('dragleave', dragLeave);
dropContainer.addEventListener('drop', drop);

let draggedItem = null;

function dragStart() {
  draggedItem = this;
  setTimeout(() => {
    this.style.opacity = '0.6';
  }, 0);
}

function dragEnd() {
  draggedItem = null;
  this.style.opacity = '1';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('hovered');
}

function dragLeave() {
  this.classList.remove('hovered');
}

function drop() {
  const input = draggedItem.querySelector('input[type="checkbox"]');
  input.checked = true;
  this.classList.remove('hovered');
  updateTotalPrice();
}


// price calculation
const totalPrice = document.querySelector('.total__price');
const sizeControls = document.querySelector('.size-controls');
const inputs = sizeControls.querySelectorAll('input');

/* корж */
inputs.forEach(input => {
  input.addEventListener('change', () => {
    const checkedInput = sizeControls.querySelector('input:checked');

    if (checkedInput) {
      updateTotalPrice();
    }
  });
});

/* ingradients */
const ingredientInputs = document.querySelectorAll('.ingredient-input');

ingredientInputs.forEach(input => {
  input.addEventListener('change', () => {
    updateTotalPrice();
  });
});

function updateTotalPrice() {
  let totalPriceValue = 0;

  /* Calculation of the cost of selected ingredients */
  ingredientInputs.forEach(input => {
    if (input.checked) {
      totalPriceValue += parseFloat(input.value);
    }
  });

  /* Adding the cost of the selected size */
  const checkedInput = sizeControls.querySelector('input:checked');
  if (checkedInput) {
    totalPriceValue += parseFloat(checkedInput.value);
  }

  totalPrice.innerHTML = "До сплати: " + totalPriceValue + "$";
}

// statistics

// отримати елементи DOM для чисел піци та клієнтів
const pizzaCount = document.querySelector('.statistic__pizza');
const clientCount = document.querySelector('.statistic__clients');

// оновлюємо число піци кожні 3 секунди
setInterval(() => {
  pizzaCount.textContent = (parseFloat(pizzaCount.textContent) + 1).toFixed(0);
}, 3000);

// оновлюємо число клієнтів кожні 5 секунд
setInterval(() => {
  clientCount.textContent = (parseFloat(clientCount.textContent) + 1).toFixed(0);
}, 5000);


// cards container
const cardsContainer = document.getElementById("cards-container");

pizza.forEach((card) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  const cardImg = document.createElement("img");
  cardImg.src = card.image;
  const cardName = document.createElement("p");
  cardName.innerText = card.name;
  const cardDescription = document.createElement("p");
  cardDescription.innerText = card.description;
  const cardcost = document.createElement("p");
  cardcost.innerText = "Ціна: " + card.cost + "$";
  const cardButton = document.createElement("button");
  cardButton.innerText = "В кошик";

  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardName);
  cardDiv.appendChild(cardDescription);
  cardDiv.appendChild(cardcost);
  cardDiv.appendChild(cardButton);
  cardsContainer.appendChild(cardDiv);
});

// combo
const comboPizza = document.getElementById("combo-pizza");

combo.forEach((card) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  const cardImg = document.createElement("img");
  cardImg.src = card.image;
  const cardName = document.createElement("p");
  cardName.innerText = card.name;
  const cardTitle = document.createElement("p");
  cardTitle.innerText = "Комбо меню";
  cardTitle.classList.add("combo-title");
  const cardDescription = document.createElement("p");
  cardDescription.innerText = card.description;
  const cardcost = document.createElement("p");
  cardcost.innerText = "Ціна: " + card.cost + "$";
  const cardButton = document.createElement("button");
  cardButton.innerText = "В кошик";

  cardDiv.appendChild(cardTitle);
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardName);
  cardDiv.appendChild(cardDescription);
  cardDiv.appendChild(cardcost);
  cardDiv.appendChild(cardButton);
  comboPizza.appendChild(cardDiv);
});