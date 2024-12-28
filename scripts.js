const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; 

function fetchData() {
  fetch(scriptUrl)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('productTableBody');
      tableBody.innerHTML = ''; 

      data.forEach(product => {
        const row = document.createElement('tr');
        const productNameCell = document.createElement('td');
        const homeQtyCell = document.createElement('td');
        const warehouseQtyCell = document.createElement('td');
        const totalQtyCell = document.createElement('td');

        productNameCell.textContent = product[0];
        homeQtyCell.textContent = product[1];
        warehouseQtyCell.textContent = product[2];
        totalQtyCell.textContent = product[3];

        row.appendChild(productNameCell);
        row.appendChild(homeQtyCell);
        row.appendChild(warehouseQtyCell);
        row.appendChild(totalQtyCell);

        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

const addProductForm = document.getElementById('addProductForm');
addProductForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const productName = document.getElementById('productName').value;
  const homeQuantity = parseInt(document.getElementById('homeQuantity').value);
  const warehouseQuantity = parseInt(document.getElementById('warehouseQuantity').value);

  fetch(scriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      function: 'addProduct',
      arguments: [productName, homeQuantity, warehouseQuantity]
    })
  })
  .then(response => {
    if (response.ok) {
      fetchData();
      document.getElementById('productName').value = '';
      document.getElementById('homeQuantity').value = '';
      document.getElementById('warehouseQuantity').value = '';
    } else {
      console.error('Error adding product.');
    }
  })
  .catch(error => console.error('Error adding product:', error));
});

fetchData();
