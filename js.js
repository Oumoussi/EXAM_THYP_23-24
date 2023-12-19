// Fonction pour récupérer les données de l'API
function getData(apiKey) {
    const apiUrl = 'http://localhost/omeka-s/api/items?pretty_print=1'; 
    fetch(apiUrl, {
      headers: {
        'Authorization': apiKey,
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => showItems(data))
    .catch(error => console.error('Erreur :', error));
  }
  
  // Fonction pour afficher la liste des items
  /*function showItems(itemsData) {
    const itemsList = document.getElementById('itemsList');
  
    itemsData.forEach(item => {
      const itemId = item['o:id'];
      const title = item['o:title'];
      const media = item['o:media'];
      //const media = item['o:media'][0]['o:original_url'];
  
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
        <p>Identifiant: ${itemId}</p>
        <p>Titre: ${title}</p>
        <p>Media: ${media}</p>
        <hr>
      `;
      itemsList.appendChild(itemDiv);
    });
  }*/

  // Fonction pour afficher la liste des items
function showItems(itemsData) {
    const itemsList = document.getElementById('itemsList');
  
    // Clear the list before adding new items
    itemsList.innerHTML = '';
  
    itemsData.forEach(item => {
      const itemId = item['o:id'];
      const title = item['o:title']; // Correct key for the title
      const mediaUrl = item.thumbnail_display_urls ? item.thumbnail_display_urls.medium : ''; // Correct path for media URL
      const description = item['dcterms:description'] && item['dcterms:description'].length > 0 ? item['dcterms:description'][0]['@value'] : ''; // Correct path for description
  
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item'; // Add a class for styling
      itemDiv.innerHTML = `
        <p>Identifiant: ${itemId}</p>
        <h2>${title}</h2>
        ${mediaUrl ? `<img src="${mediaUrl}" alt="${title}">` : ''}
        <p>${description}</p>
        <hr>
      `;
      itemsList.appendChild(itemDiv);
    });
  }
  
  
  const votreCleAPI = 'WV0I3V4nNLKrmfZi1b77INV6ZhR642HP';
  getData(votreCleAPI);