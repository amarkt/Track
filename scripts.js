const scriptUrl = 'https://script.google.com/macros/s/AKfycbxTWbaxjFZcHwUNksxboVnMQcCrrRBFvGjcXmnZKPetushVYRA5px6gGPkiNeMjeKlY8w/exec';  // Replace with your Web App URL

// Fetch data from Google Apps Script (GET request)
function fetchData() {
  fetch(`${scriptUrl}?action=load`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log('Data fetched successfully:', data);
    // Use the data (e.g., display in your app)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

// Save data to Google Apps Script (POST request)
function saveData(data) {
  fetch(scriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Data saved successfully:', data);
  })
  .catch(error => {
    console.error('Error saving data:', error);
  });
}
