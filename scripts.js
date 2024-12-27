document.addEventListener('DOMContentLoaded', function () {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzWuaXaegOtMmHE-dnA0666CULd-i2LbDC766e2KfRc82SVZ-7L4p0VzlEq_jKqfVHIww/exec'; // Replace with your Web App URL

    // Function to load data from Google Apps Script (GET request)
    function loadProducts() {
        fetch(scriptUrl + '?action=load')  // Ensure your URL includes the proper query parameters
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    displayProducts(data.data); // Function to display the data in your UI
                } else {
                    console.error('Error loading data:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Function to save data to Google Apps Script (POST request)
    function saveData(data) {
        fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send the data as JSON
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('Data saved successfully:', data);
                loadProducts(); // Reload the products after saving new data
            } else {
                console.error('Error saving data:', data.message);
            }
        })
        .catch(error => {
            console.error('Error saving data:', error);
        });
    }

    // Function to display the products in the frontend (you can customize this)
    function displayProducts(products) {
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Clear the existing list
        products.forEach(product => {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `<td>${product[0]}</td><td>${product[1]}</td><td>${product[2]}</td>`;
            productList.appendChild(productRow);
        });
    }

    // Ensure the form's submit button is functioning
    const submitForm = document.getElementById('submitForm');
    if (submitForm) {
        submitForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const product = document.getElementById('product').value;
            const quantity = document.getElementById('quantity').value;

            if (product && quantity) {
                const data = { product: product, quantity: quantity };
                saveData(data);
            } else {
                console.log('Please fill in both fields.');
            }
        });
    } else {
        console.error('Form with ID submitForm not found!');
    }

    // Initial load of products when the page is loaded
    loadProducts(); // Fetch products when the page loads
});
