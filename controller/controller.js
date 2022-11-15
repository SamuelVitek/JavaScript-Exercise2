//Getting all necessary elements as constants
const overlay = document.getElementsByClassName('modal-backdrop');
const addBtn = document.getElementById('add');
const close = document.getElementsByClassName('close-popup');
const submit = document.getElementById('submit');
const question = document.getElementById('question');
const category = document.getElementById('category');
const form = document.getElementById('form');
const modal = document.getElementById('staticBackdrop');
const row = document.getElementById('main-row');
const filter = document.getElementById('filter');
let cardTitles;

let lastCol;
let id = 1;

//Event listeners to handle button actions attached to the modal window
Array.from(close).forEach(btn => {
    btn.addEventListener('click', hideModal)
});
form.addEventListener('submit', handleForm);
addBtn.addEventListener('click', openModal);
submit.addEventListener('click', saveRow);
filter.addEventListener('change', () => {
    filterQuestions();
});

//Function to save a row to the local storage
function saveRow() {
    if (question.value !== '') {
        localStorage.setItem(id.toString(),
            JSON.stringify({ category: category.value, question: question.value})
        );
        updateUI();
        hideModal();
        id++;
    } else {
        alert('You did not ask the question!');
    }
}

/**
 * Function to reload the UI and draw everything (not filtered) from the local storage
 * Done by creating set of elements used in Bootstrap cards
 * Filling the content in the cards by the data saved in local storage
 */
function updateUI() {
    const col = document.createElement('div');
    col.classList.add('col-sm-3');
    col.classList.add('column');
    col.id = 'col-' + id;

    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('mb-4');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const h5 = document.createElement('h5');
    h5.classList.add('card-title');

    const p = document.createElement('p');
    p.classList.add('card-text');

    if (id === 1) {
        row.appendChild(col);
    } else {
        row.insertBefore(col, lastCol);
    }

    col.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(h5);
    cardBody.appendChild(p);

    h5.innerHTML = JSON.parse(localStorage.getItem(id.toString())).category;
    p.innerHTML = JSON.parse(localStorage.getItem(id.toString())).question;

    lastCol = document.getElementById('col-' + id);
    cardTitles = document.getElementsByClassName('card-title');

    filterQuestions();
}

//Stops the Bootstraps modal window from its default actions
function handleForm(event) { 
    event.preventDefault(); 
}

//Hides modal window
function hideModal() {
    question.value = '';
    category.value = 'HTML';
    modal.style.display = 'none';
    Array.from(overlay).forEach(box => {
        box.style.display = 'none';
    });
}

//Opens modal window
function openModal() {
    addBtn.removeAttribute('data-bs-toggle');
    modal.style.display = 'block';
    Array.from(overlay).forEach(box => {
        box.style.display = 'block';
    });
}

//Filtering questions using the option element
function filterQuestions() {
    if (cardTitles !== undefined) {
        Array.from(cardTitles).forEach(card => {
            let wholeCards = card.parentElement.parentElement.parentElement.style;
            if (filter.value !== 'NONE' && card.innerHTML !== filter.value) {
                wholeCards.display = 'none';
            } else if ((card.innerHTML === filter.value || filter.value === 'NONE') && wholeCards.display === 'none') {
                wholeCards.display = 'block';
            }
        });
    }
}

//On refresh, cleans the local storage
window.onload = localStorage.clear();