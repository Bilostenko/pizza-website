import pizza from './pizza.mjs';
import combo from './combo.mjs';
import drinks from './drinks.mjs';

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

// change language-------------------
const languageSwitcher = document.querySelector('form');
const languageRadios = languageSwitcher.querySelectorAll('input[type="radio"]');
const translatableElements = document.querySelectorAll('[data-i18n]');

// update translations
function updateTranslation(language) {
  fetch(`locales/${language}.json`)
    .then(response => response.json())
    .then(data => {
      translatableElements.forEach(element => {
        const translationKey = element.dataset.i18n;
        if (data.hasOwnProperty(translationKey)) {
          element.textContent = data[translationKey];
        }
      });
    });

}
updateTranslation(languageRadios[0].value);

languageSwitcher.addEventListener('change', event => {
  if (event.target.name === 'language') {
    updateTranslation(event.target.value);
  }
});

// changing data according to dropdown value
const dropdown = document.querySelector("#drop");
const phoneElement = document.querySelector("#phone");
const address1 = document.querySelector("#street1");
const address2 = document.querySelector("#street2");

dropdown.addEventListener("change", function () {
  const selectedValue = dropdown.value;

  if (selectedValue === "Kyiv") {
    phoneElement.textContent = "050 777 66 77";
    address1.textContent = "вул. Джуніорська, 1";
    address2.textContent = "вул. Мідловська, 11";
    address1.setAttribute("data-i18n", "Kyiv-address1");
    address2.setAttribute("data-i18n", "Kyiv-address2");

  } else if (selectedValue === "Odesa") {
    phoneElement.textContent = "063 333 67 98";
    address1.textContent = "вул. Січових Рубістів, 2"
    address1.setAttribute("data-i18n", "Odesa-address1");
    address2.textContent = "вул. Жабаскрипт, 12";
    address2.setAttribute("data-i18n", "Odesa-address2");

  } else if (selectedValue === "Lviv") {
    phoneElement.textContent = "066 433 55 65";
    address1.textContent = "вул. Пам'яті Інтернів, 34";
    address1.setAttribute("data-i18n", "Lviv-address1");
    address2.textContent = "вул. Мітингова, 55";
    address2.setAttribute("data-i18n", "Lviv-address2");
  } else if (selectedValue === "Kharkiv") {
    phoneElement.textContent = "099 466 71 50";
    address1.textContent = "вул. Михайла Великосельського, 12";
    address1.setAttribute("data-i18n", "Kharkiv-address1");
    address2.textContent = "вул. Просвятителів, 23";
    address2.setAttribute("data-i18n", "Kharkiv-address2");
  } else if (selectedValue === "Yalta") {
    phoneElement.textContent = "050 111 32 11";
    address1.textContent = "вул. Вкатунів, 5А";
    address1.setAttribute("data-i18n", "Yalta-address1");
    address2.textContent = "вул. Вигорання, 6";
    address2.setAttribute("data-i18n", "Yalta-address2");
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

const pizzaCount = document.querySelector('.statistic__pizza');
const clientCount = document.querySelector('.statistic__clients');

// refreshes the number of pizzas every 2 seconds
setInterval(() => {
  pizzaCount.textContent = (parseFloat(pizzaCount.textContent) + 1).toFixed(0);
}, 2000);

// refreshes the number of clients every 3 seconds
setInterval(() => {
  clientCount.textContent = (parseFloat(clientCount.textContent) + 1).toFixed(0);
}, 3000);


// // cards container
// const cardsContainer = document.getElementById("cards-container");

// pizza.forEach((card) => {
//   const cardDiv = document.createElement("div");
//   cardDiv.classList.add("card");
//   const cardImg = document.createElement("img");
//   cardImg.src = card.image;
//   const cardName = document.createElement("p");
//   cardName.innerText = card.name;
//   const cardDescription = document.createElement("p");
//   cardDescription.innerText = card.description;
//   const cardcost = document.createElement("p");
//   cardcost.innerText = "Ціна: " + card.cost + "$";
//   const cardButton = document.createElement("button");
//   cardButton.innerText = "В кошик";

//   cardDiv.appendChild(cardImg);
//   cardDiv.appendChild(cardName);
//   cardDiv.appendChild(cardDescription);
//   cardDiv.appendChild(cardcost);
//   cardDiv.appendChild(cardButton);
//   cardsContainer.appendChild(cardDiv);
// });

// // combo
// const comboPizza = document.getElementById("combo-pizza");

// combo.forEach((card) => {
//   const cardDiv = document.createElement("div");
//   cardDiv.classList.add("card");
//   const cardImg = document.createElement("img");
//   cardImg.src = card.image;
//   const cardName = document.createElement("p");
//   cardName.innerText = card.name;
//   const cardTitle = document.createElement("p");
//   cardTitle.innerText = "Комбо меню";
//   cardTitle.classList.add("combo-title");
//   const cardDescription = document.createElement("p");
//   cardDescription.innerText = card.description;
//   const cardcost = document.createElement("p");
//   cardcost.innerText = "Ціна: " + card.cost + "$";
//   const cardButton = document.createElement("button");
//   cardButton.innerText = "В кошик";

//   cardDiv.appendChild(cardTitle);
//   cardDiv.appendChild(cardImg);
//   cardDiv.appendChild(cardName);
//   cardDiv.appendChild(cardDescription);
//   cardDiv.appendChild(cardcost);
//   cardDiv.appendChild(cardButton);
//   comboPizza.appendChild(cardDiv);
// });

// // drinks
// const drinksContainer = document.getElementById("drinks-container");

// drinks.forEach((card) => {
//   const cardDiv = document.createElement("div");
//   cardDiv.classList.add("card");
//   const cardImg = document.createElement("img");
//   cardImg.src = card.image;
//   const cardName = document.createElement("p");
//   cardName.innerText = card.name;
//   const cardTitle = document.createElement("p");
//   cardTitle.innerText = "Напої";
//   cardTitle.classList.add("combo-title");
//   const cardcost = document.createElement("p");
//   cardcost.innerText = "Ціна: " + card.cost + "$";
//   const cardButton = document.createElement("button");
//   cardButton.innerText = "В кошик";

//   cardDiv.appendChild(cardTitle);
//   cardDiv.appendChild(cardImg);
//   cardDiv.appendChild(cardName);
//   cardDiv.appendChild(cardcost);
//   cardDiv.appendChild(cardButton);
//   drinksContainer.appendChild(cardDiv);
// });

// create card function
function createCard(card, isCombo = false, isDrink = false) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const cardTitle = document.createElement("p");
  cardTitle.innerText = isCombo ? "Комбо меню" : isDrink ? "Напої" : "";
  cardTitle.setAttribute("data-i18n", cardTitle.textContent === "Комбо меню" ? "combo" : "drinks-lng");
  cardTitle.classList.add("combo-title");
  cardDiv.appendChild(cardTitle);

  const cardImg = document.createElement("img");
  cardImg.src = card.image;
  cardDiv.appendChild(cardImg);

  const cardName = document.createElement("p");
  cardName.innerText = card.name;
  cardDiv.appendChild(cardName);

  const cardDescription = document.createElement("p");
  cardDescription.innerText = isDrink ? "" : card.description;
  cardDiv.appendChild(cardDescription);

  const cardcost = document.createElement("p");
  cardcost.innerText = "Ціна: " + card.cost + "$";
  cardDiv.appendChild(cardcost);

  const cardButton = document.createElement("button");
  cardButton.innerText = "В кошик";
  cardDiv.appendChild(cardButton);

  return cardDiv;
}

// cards container
const cardsContainer = document.getElementById("cards-container");
pizza.forEach((card) => {
  const cardDiv = createCard(card);
  cardsContainer.appendChild(cardDiv);
});

// combo
const comboPizza = document.getElementById("combo-pizza");
combo.forEach((card) => {
  const cardDiv = createCard(card, true);
  comboPizza.appendChild(cardDiv);
});

// drinks
const drinksContainer = document.getElementById("drinks-container");
drinks.forEach((card) => {
  const cardDiv = createCard(card, false, true);
  drinksContainer.appendChild(cardDiv);
});

// scrolling to menu-items
// Due to the fact that some elements are dynamically generated through JavaScript, the navigation was also made through JavaScript.
document.querySelector('a[href="#pizza-construct-nav"]').addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('#pizza-construct-nav').scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('a[href="#cards-container-nav"]').addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('#cards-container-nav').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('a[href="#kombo-menu-nav"]').addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('#combo-pizza').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('a[href="#drinks-nav"]').addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('#drinks-container').scrollIntoView({ behavior: 'smooth' });
});
