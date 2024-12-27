// Replace with your Google Apps Script Web App URL
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwZONsS-gi00BV7xRCVgVnuJSlqAL8uwOzDEKcmNRE37QkQ3UZGED0PvfApCFWvbSCkug/exec';

let products = []; // Initialize an empty array to store product data

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('saveButton').addEventListener('click', updateQuantity);
    loadProducts(); // Fetch products data from Google Sheets when the page loads
});

async function updateQuantity() {
    const name = document.getElementById('productName').value.trim().toUpperCase();
    const location = document.getElementById('location').value;
    const quantity = parseFloat(document.getElementById('quantity').value);

    if (!name || isNaN(quantity)) {
        alert('Please enter valid product details.');
        return;
    }

    const productIndex = products.findIndex(p => p.name === name);
    if (productIndex > -1) {
        // Update existing product quantity
        products[productIndex][location] += quantity;
    } else {
        // Add new product
        const newProduct = { name, home: 0, warehouse: 0 };
        newProduct[location] = quantity;
        products.push(newProduct);
    }

    // Save data to Google Sheets via the Web App
    saveData();
    displayProducts();
    clearForm();
}

function loadProducts() {
    // Fetch product data from Google Sheets via the Web App (GET request)
    fetch(WEB_APP_URL + '?action=load')
        .then(response => response.json())
        .then(data => {
            products = data; // Assign fetched data to the products array
            displayProducts(); // Display the fetched data
        })
        .catch(error => {
            console.error('Error loading data:', error);
            alert('Error loading data');
        });
}

function saveData() {
    // Send the product data to Google Sheets via the Web App (POST request)
    fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(products)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data saved successfully', data);
        alert('Data saved successfully!');
    })
    .catch(error => {
        console.error('Error saving data:', error);
        alert('Error saving data');
    });
}

function displayProducts() {
    const productTable = document.getElementById('productTable');
    productTable.innerHTML = ''; // Clear existing rows

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.home}</td>
            <td>${product.warehouse}</td>
            <td>${product.home + product.warehouse}</td>
        `;
        productTable.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('quantity').value = '';
}
