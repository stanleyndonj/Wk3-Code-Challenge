// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const shoppingList = document.getElementById('shoppingList');
    const clearListButton = document.getElementById('clearListButton');

    // Load items from local storage or initialize an empty array
    let items = JSON.parse(localStorage.getItem('shoppingListItems')) || [];

    // Function to render the shopping list
    const renderList = () => {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            // Create a new list item element
            const listItem = document.createElement('li');
            listItem.textContent = item.name;
            listItem.classList.toggle('purchased', item.purchased);

            // Add event listener to mark item as purchased
            listItem.addEventListener('click', () => {
                items[index].purchased = !items[index].purchased;
                saveAndRender();
            });

            // Create an edit button for the item
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

            // Append the edit button to the list item
            listItem.appendChild(editButton);
            shoppingList.appendChild(listItem);
        });
    };

    // Function to save items to local storage and render the list
    const saveAndRender = () => {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
        renderList();
    };

    // Add event listener to the "Add" button
    addItemButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveAndRender();
        }
    });

    // Add event listener to the "Clear List" button
    clearListButton.addEventListener('click', () => {
        items = [];
        saveAndRender();
    });

    // Initial render of the shopping list
    renderList();
});
