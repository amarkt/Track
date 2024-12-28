const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzXR_ffqTwJ-njqMVaiKhgjGJN3lxyN2eP8Dxwn3KDP_7Dp-fMQRYbeVMOGeo7YHz-MoQ/exec'; 
let products = []; 

async function fetchData() {
  try {
    const response = await fetch(SCRIPT_URL);
    const data = await response.json();
    products = data.slice(1).map(row => ({ 
      name: row[0],
      home: parseFloat(row[1]) || 0,
      warehouse: parseFloat(row[2]) || 0,
      total: parseFloat(row[3]) || 0
    }));
    displayProducts();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayProducts() {
  const productTable = document.getElementById('productTableBody');
  productTable.innerHTML = ''; 
  products.forEach(product => {
    const row = `
      <tr>
        <td><span class="math-inline">\{product\.name\}</td\>
<td\></span>{product.home.toFixed(2)}</td>
        <td><span class="math-inline">\{product\.warehouse\.toFixed\(2\)\}</td\>
<td\></span>{product.total.toFixed(2)}</td>
      </tr>
    `;
    productTable.insertAdjacentHTML('beforeend', row);
  });
}

const updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const productName = document.getElementById('productName').value.trim();
  const location = document.getElementById('location').value;
  const quantity = parseFloat(document.getElementById('quantity').value);

  if (!productName || isNaN(quantity)) {
    alert('Invalid input!');
    return;
  }

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        function: 'updateProduct',
        arguments: [productName, location, quantity] 
      })
    });

    if (response.ok) {
      fetchData();
