document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    fetch('http://192.168.49.2:30001/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchItems(); 
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function fetchItems() {
    fetch('http://192.168.49.2:30001/items')
    .then(response => response.json())
    .then(data => {
        const itemsList = document.getElementById('itemsList');
        itemsList.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name}: ${item.description}`;
            itemsList.appendChild(li);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

fetchItems();
