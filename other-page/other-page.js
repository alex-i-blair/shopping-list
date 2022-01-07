import { checkAuth, logout, getList, buyItem, createItem, deleteList } from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';
checkAuth();

const logoutButton = document.getElementById('logout');

const addItemForm = document.getElementById('list-add-form');
const displayListEl = document.getElementById('list-display'); 
const deleteButton = document.querySelector('.delete-button');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    await displayList();

});

async function displayList() {
    const shoppingList = await getList();
    displayListEl.textContent = '';
    for (let item of shoppingList) {
        const itemEl = await renderItem(item);
        // console.log(item, typeof item);
        itemEl.addEventListener('click', async() => {
            await buyItem(item.id);
            await displayList();
        });
        displayListEl.append(itemEl);
    }
}

addItemForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(addItemForm);
    const item = data.get('item');
    const quantity = data.get('quantity');
    await createItem(item, quantity);
    addItemForm.reset();
    await displayList();
});

deleteButton.addEventListener('click', async() => {
    await deleteList();
    await displayList();
});