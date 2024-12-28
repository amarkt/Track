const SHEET_API = "https://script.google.com/macros/s/AKfycbz9jXiLh0nFGAJyjsS8WD1NpPa47drriTD-qqitS4NVZo2Pwc0eRs4SMW4FleraeUcVGw/exec";

async function fetchInventory() {
  const response = await fetch(SHEET_API);
  const data = await response.json();
  renderInventory(data);
}

function renderInventory(data) {
  const tbody = document.getElementById("inventoryBody");
  tbody.innerHTML = "";
  data.slice(1).forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

document.getElementById("addProductForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const productName = document.getElementById("productName").value.toUpperCase();
  const location = document.getElementById("location").value;
  const quantity = parseFloat(document.getElementById("quantity").value);
  
  await fetch(`${SHEET_API}?product=${productName}&location=${location}&quantity=${quantity}`, {
    method: "POST",
  });
  
  fetchInventory();
});

fetchInventory();
