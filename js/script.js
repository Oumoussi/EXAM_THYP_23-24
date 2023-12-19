function getData(apiKey) {
    const apiUrl = 'http://localhost/omeka_s/api/items?pretty_print=1'; 
    fetch(apiUrl, {
      headers: {
        'Authorization': "KG474vk1XHJUy8cuAFpwVflg2wTQsoK9",
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => showItems(data))
    .catch(error => console.error('Erreur :', error));
  }
  

function showItems(itemsData) {
    const itemsList = document.getElementById('items');
  
    itemsList.innerHTML = '';
  
    itemsData.forEach(item => {
      const itemId = item['o:id'];
      const title = item['o:title']; // Correct key for the title
      const mediaUrl = item.thumbnail_display_urls ? item.thumbnail_display_urls.medium : ''; // Correct path for media URL
      const description = item['dcterms:description'] && item['dcterms:description'].length > 0 ? item['dcterms:description'][0]['@value'] : ''; // Correct path for description
  
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';
      itemDiv.innerHTML = `
        <p>Identifiant: ${itemId}</p>
        <h2>${title}</h2>
        <div class="image-container" >
        ${mediaUrl ? `<img src="${mediaUrl}"  alt="${title}">` : ''}
        </div>
        
        <p>${description}</p>
        <hr>
      `;
      itemsList.appendChild(itemDiv);
    });
  }
  
getData();

function filterItems() {
    const filterInput = document.getElementById('filterInput');
    const filterValue = filterInput.value.toUpperCase();
    const items = document.getElementById('items').getElementsByTagName('div');
  
    for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('p')[1];
        if (title) {
            const txtValue = title.textContent || title.innerText;
            if (txtValue.toUpperCase().indexOf(filterValue) > -1) {
            items[i].style.display = '';
            } else {
            items[i].style.display = 'none';
            }
        }
    }
}