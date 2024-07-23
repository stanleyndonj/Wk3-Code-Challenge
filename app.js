document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("itemInput");
    const addItemButton = document.getElementById("addItemButton");
    const shoppingList = document.getElementById("shoppingList");
    const clearListButton = document.getElementById("clearListButton");

    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    // Function to render the shopping list
    function renderList() {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement("li");
            const itemText = document.createElement("span");
            itemText.textContent = item.name;
            if (item.purchased) {
                itemText.classList.add("purchased");
            }
            itemText.addEventListener("click", () => togglePurchased(index));
            li.appendChild(itemText);

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => editItem(index));
            li.appendChild(editButton);

            shoppingList.appendChild(li);
        });
    }

    // Function to add an item to the list
    function addItem() {
        const itemName = itemInput.value.trim();
        if (itemName !== '') {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            updateLocalStorage();
            renderList();
        }
    }

    // Function to toggle purchased status
    function togglePurchased(index) {
        items[index].purchased = !items[index].purchased;
        updateLocalStorage();
        renderList();
    }

    // Function to clear the list
    function clearList() {
        items = [];
        updateLocalStorage();
        renderList();
    }

    // Function to update local storage
    function updateLocalStorage() {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    // Function to edit an item
    function editItem(index) {
        const newItemName = prompt("Edit item:", items[index].name);
        if (newItemName !== null) {
            items[index].name = newItemName.trim();
            updateLocalStorage();
            renderList();
        }
    }

    addItemButton.addEventListener("click", addItem);
    clearListButton.addEventListener("click", clearList);

    renderList();
});
