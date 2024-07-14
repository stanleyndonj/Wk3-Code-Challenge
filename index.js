// script.js
document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const shoppingList = document.getElementById('shoppingList');
    const clearListButton = document.getElementById('clearListButton');

    let items = JSON.parse(localStorage.getItem('shoppingListItems')) || [];

    const renderList = () => {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name;
            listItem.classList.toggle('purchased', item.purchased);
            listItem.addEventListener('click', () => {
                items[index].purchased = !items[index].purchased;
                saveAndRender();
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const newName = prompt('Edit item:', item.name);
                if (newName) {
                    items[index].name = newName;
                    saveAndRender();
                }
            });

            listItem.appendChild(editButton);
            shoppingList.appendChild(listItem);
        });
    };

    const saveAndRender = () => {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
        renderList();
    };

    addItemButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveAndRender();
        }
    });

    clearListButton.addEventListener('click', () => {
        items = [];
        saveAndRender();
    });

    renderList();
});
