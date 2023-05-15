import pizza from './pizza.mjs';
import combo from './combo.mjs';
import drinks from './drinks.mjs';

// определение переменных-------------------

// change language
const languageSwitcher = document.querySelector('form');
// changing data according to dropdown value
const dropdown = document.querySelector("#drop");
const phoneElement = document.querySelector("#phone");
const address1 = document.querySelector("#street1");
const address2 = document.querySelector("#street2");
/* drag and drop, pizza constructor */
const dragItems = document.querySelectorAll('.drag-item');
const dropContainer = document.querySelector('.drop-container');
let draggedItem = null;
// price calculation
const totalPrice = document.querySelector('.total__price');
const sizeControls = document.querySelector('.size-controls');
const inputs = sizeControls.querySelectorAll('input');
/* ingradients */
const ingredientInputs = document.querySelectorAll('.ingredient-input');
// statistics
const pizzaCount = document.querySelector('.statistic__pizza');
const clientCount = document.querySelector('.statistic__clients');
// modal window
const showModal = document.querySelector('.payment-icon');
const closeModal = document.querySelector('.modal-close');
const submit = document.querySelector('#submit');
// check name
const nameInput = document.getElementById("name");
// check email
const emailInput = document.querySelector('#email');
// check phone
const phoneInput = document.querySelector('#phone');
// check address
const addressInput = document.querySelector('#address');


// назначение обработчиков событий-------------------

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

// переключение языка
languageSwitcher.addEventListener('change', event => {
  if (event.target.name === 'language') {
    localStorage.setItem('language', event.target.value);
    updateTranslation();
  }
});
// changing data according to dropdown value
dropdown.addEventListener("change", function () {
  const selectedValue = dropdown.value;

  if (selectedValue === "Kyiv") {
    phoneElement.textContent = "050 777 66 77";
    address1.setAttribute("data-i18n", "Kyiv-address1");
    address2.setAttribute("data-i18n", "Kyiv-address2");

  } else if (selectedValue === "Odesa") {
    phoneElement.textContent = "063 333 67 98";
    address1.setAttribute("data-i18n", "Odesa-address1");
    address2.setAttribute("data-i18n", "Odesa-address2");

  } else if (selectedValue === "Lviv") {
    phoneElement.textContent = "066 433 55 65";
    address1.setAttribute("data-i18n", "Lviv-address1");
    address2.setAttribute("data-i18n", "Lviv-address2");
  } else if (selectedValue === "Kharkiv") {
    phoneElement.textContent = "099 466 71 50";
    address1.setAttribute("data-i18n", "Kharkiv-address1");
    address2.setAttribute("data-i18n", "Kharkiv-address2");
  } else if (selectedValue === "Yalta") {
    phoneElement.textContent = "050 111 32 11";
    address1.setAttribute("data-i18n", "Yalta-address1");
    address2.setAttribute("data-i18n", "Yalta-address2");
  }
  // updateTranslation();
});
/* drag and drop */
dragItems.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});
dropContainer.addEventListener('dragover', dragOver);
dropContainer.addEventListener('dragenter', dragEnter);
dropContainer.addEventListener('dragleave', dragLeave);
dropContainer.addEventListener('drop', drop);
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
ingredientInputs.forEach(input => {
  input.addEventListener('change', () => {
    updateTotalPrice();
  });
});
// refreshes the number of pizzas every 2 seconds
setInterval(() => {
  pizzaCount.textContent = (parseFloat(pizzaCount.textContent) + 1).toFixed(0);
}, 2000);

// refreshes the number of clients every 3 seconds
setInterval(() => {
  clientCount.textContent = (parseFloat(clientCount.textContent) + 1).toFixed(0);
}, 3000);
// scrolling to menu-items
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
// show modal window
showModal.addEventListener('click', function () {
  document.querySelector('.modal').style.display = "block";
  document.body.style.overflow = 'hidden';
});
// close modal window
closeModal.addEventListener('click', function () {
  document.querySelector('.modal').style.display = "none";
  document.body.style.overflow = 'auto';
});
// submit order
submit.addEventListener('click', function () {
  document.querySelector('.modal').style.display = "none";
  document.body.style.overflow = 'auto';
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500
  })
});
// check name
nameInput.addEventListener("change", function () {
  const nameInputCheck = document.querySelector('.name-validity-informer');
  if (nameInput.value === "" || !isValidName(nameInput.value)) {
    nameInputCheck.classList.add("visible");
  } else {
    nameInputCheck.classList.remove("visible");
  }
  function isValidName(name) {
    return /^[a-zA-Zа-яА-ЯіІїЇєЄ]+$/.test(name);
  }
});

// check email
emailInput.addEventListener("change", function () {
  const emailInputCheck = document.querySelector('.email-validity-informer');
  if (emailInput.value === "" || !isValidName(emailInput.value)) {
    emailInputCheck.classList.add("visible");
  } else {
    emailInputCheck.classList.remove("visible");
  }
  function isValidName(name) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(name);
  }
});
// check phone
phoneInput.addEventListener("change", function () {
  const phoneInputCheck = document.querySelector('.phone-validity-informer');
  if (phoneInput.value === "" || !isValidName(phoneInput.value)) {
    phoneInputCheck.classList.add("visible");
  } else {
    phoneInputCheck.classList.remove("visible");
  }
  function isValidName(name) {
    return /^((\+38|38)?)0[1-9]\d{8}$/.test(name);
  }
});

// check address
addressInput.addEventListener("blur", function () {
  const addressInputCheck = document.querySelector('.address-validity-informer');
  if (addressInput.value === '') {
    addressInputCheck.classList.add("visible");
  } else {
    addressInputCheck.classList.remove("visible");
  }
});
// вызовы-------------------
updateTranslation(); // обновление перевода

// функции-------------------
function updateTranslation() {
  const language = localStorage.getItem('language') || 'en';
  fetch(`locales/${language}.json`)
    .then(response => response.json())
    .then(data => {
      const translatableElements = document.querySelectorAll('[data-i18n]');
      const translatableElements2 = document.querySelectorAll('[data-i18n2]');
      translatableElements.forEach(element => {
        const translationKey = element.dataset.i18n;
        if (data.hasOwnProperty(translationKey)) {
          element.innerHTML = data[translationKey];
        }
      });

      translatableElements2.forEach(element => {
        const translationKey = element.dataset.i18n2;
        if (data.hasOwnProperty(translationKey)) {
          element.placeholder = data[translationKey];
        }
      });
    });

}
// updateTranslation();

/* drag and drop */
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
// update price

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

  totalPriceValue = Math.round(totalPriceValue * 100) / 100;
  totalPrice.innerHTML = "До сплати: " + totalPriceValue + "&#x20B4;";

  /* Getting the price from the product card and updating the total price */

  // const addButtons = document.querySelectorAll('.add-to-cart-button');
  // addButtons.forEach(button => {
  //   button.addEventListener('click', function (event) {
  //     console.log(event.target);
  //     const productCard = event.target.closest('.card');
  //     const price = productCard.dataset.price;
  //     totalPriceValue += parseFloat(price);
  //     totalPriceValue = Math.round(totalPriceValue * 100) / 100;
  //     totalPrice.innerHTML = "До сплати: " + totalPriceValue + "&#x20B4";
  //   });
  // });
}

document.addEventListener('DOMContentLoaded', function () {
  const addButtons = document.querySelectorAll('.add-to-cart-button');
  let totalPriceValue = 0;

  addButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      const productCard = event.target.closest('.card');
      const price = productCard.dataset.price;
      totalPriceValue += parseFloat(price);
      totalPrice.innerHTML = `До сплати: ${totalPriceValue} &#x20B4`;
      updateTotalPrice(); // Раскомментируйте эту строку
    });
  });
});



// updateTotalPrice();

// create card function
function createCard(card, isCombo = false, isDrink = false) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.setAttribute("data-price", card["data-price"]);

  const cardTitle = document.createElement("p");
  cardTitle.setAttribute("data-i18n", isCombo ? "combo" : isDrink ? "drinks-lng" : "pizza");
  cardTitle.classList.add("combo-title");
  cardDiv.appendChild(cardTitle);

  const cardImg = document.createElement("img");
  cardImg.src = card.image;
  cardDiv.appendChild(cardImg);

  const cardName = document.createElement("h2");
  cardName.dataset.i18n = card["pizza-name"];
  cardDiv.appendChild(cardName);

  const cardDescription = document.createElement("p");
  cardDescription.innerText = isDrink ? "" : card.description;
  cardDescription.dataset.i18n = card["data-i18n"];
  cardDiv.appendChild(cardDescription);

  const cardcost = document.createElement("h3");

  cardcost.dataset.i18n = card["cost"];
  cardcost.innerText = card.cost;
  cardDiv.appendChild(cardcost);

  const cardButton = document.createElement("button");
  cardButton.innerText = "В кошик";
  cardButton.dataset.i18n = "add-to-cart";
  cardButton.classList.add("add-to-cart-button");
  cardDiv.appendChild(cardButton);
  updateTranslation();
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