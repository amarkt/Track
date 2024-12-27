document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('saveButton').addEventListener('click', updateQuantity);
    loadProducts();
});

async function updateQuantity() {
    const name = document.getElementById('productName').value.trim().toUpperCase();
    const location = document.getElementById('location').value;
    const quantity = parseFloat(document.getElementById('quantity').value);

    if (!name || isNaN(quantity)) {
        alert('Please enter valid product details.');
        return;
    }

    // Send data to Google Apps Script for processing
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxONxZ1mcXtwFRFuFDn0gQKng_EFeA1-N1RC-EhTZbe2-Bas1Ab9fOtAMentjcTnlye-g/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, [location]: quantity }) 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.result === 'success') {
            loadProducts(); // Refresh product list after successful update
            clearForm();
        } else {
            alert('Error updating product: ' + data.message);
        }
    } catch (error) {
        alert('Error updating product: ' + error.message);
    }
}

async function loadProducts() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxONxZ1mcXtwFRFuFDn0gQKng_EFeA1-N1RC-EhTZbe2-Bas1Ab9fOtAMentjcTnlye-g/exec/getData'); // Assuming you have a separate function in your Apps Script to retrieve data
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productsData = await response.json(); 
        displayProducts(productsData); 
    } catch (error) {
        alert('Error loading products: ' + error.message);
    }
}

function displayProducts(productsData) {
    const productTable = document.getElementById('productTable');
    productTable.innerHTML = ''; 

    productsData.forEach(product => {
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
