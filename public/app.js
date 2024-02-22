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

            const dateObj = new Date(item.created);
            const formattedDate = dateObj.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short'
            });

            const li = document.createElement('li');
            const text = document.createTextNode(`${item.name}: ${item.description}`);
            const date = document.createTextNode(`Date Posted: ${formattedDate}`);
            const linebreak = document.createElement('br');
            const br = document.createElement('br');
            

            li.appendChild(text);
            li.appendChild(linebreak);
            li.appendChild(date);

            itemsList.appendChild(li);
            itemsList.appendChild(br);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

fetchItems();
