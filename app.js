/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderGrocery } from './render-utils.js';
import { completeGrocery, createGrocery, getGrocerys, deleteAllGrocerys } from './fetch-utils.js';

/* Get DOM Elements */
const addGroceryForm = document.getElementById('add-grocery-form');
const removeButton = document.getElementById('remove-button');
const errorDisplay = document.getElementById('error-display');
const groceryList = document.getElementById('grocery-list');
/* State */
let grocerys = [];
let error = null;

/* Events */
window.addEventListener('load', async () => {
    const response = await getGrocerys();
    grocerys = response.data;
    error = response.error;
    if (error) {
        displayError();
    } else {
        displayGrocerys();
    }
});

addGroceryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addGroceryForm);
    const newGrocery = {
        description: formData.get('description'),
        quantity: formData.get('quantity'),
    };

    const response = await createGrocery(newGrocery);
    error = response.error;
    const grocery = response.data;

    if (error) {
        displayError();
    } else {
        grocerys.push(grocery);

        displayGrocerys();
        addGroceryForm.reset();
    }
});
removeButton.addEventListener('click', async () => {
    const response = await deleteAllGrocerys();
    error = response.error;
    if (error) {
        displayError();
    } else {
        grocerys = [];
        displayGrocerys();
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayGrocerys() {
    groceryList.innerHTML = '';

    for (const grocery of grocerys) {
        const groceryEl = renderGrocery(grocery);
        groceryList.append(groceryEl);

        groceryEl.addEventListener('click', async () => {
            // if (grocery.complete === true) {
            //     return;
            // }

            const response = await completeGrocery(grocery.id, grocery.complete + true);
            error = response.error;
            const updatedGrocery = response.data;

            if (error) {
                displayError();
            } else {
                const index = grocerys.indexOf(grocery);
                grocerys[index] = updatedGrocery;
                displayGrocerys();
            }
        });
    }
}
