const SHEET_API = "https://script.google.com/macros/s/AKfycbzzGeuPrZX-RkMvF2eQAci98HA6QKp2iAFN1vi8NA772wL2Fn09UQb2yOe9Yvd0rEUhVw/exec"; // Replace with your Apps Script deployment URL

async function fetchInventory() {
  try {
    const response = await fetch(SHEET_API);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    renderInventory(data);
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
  }
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
  const productName = document.getElementById("productName").value.trim().toUpperCase();
  const location = document.getElementById("location").value;
  const quantity = parseFloat(document.getElementById("quantity").value);

  try {
    const response = await fetch(`${SHEET_API}?product=${productName}&location=${location}&quantity=${quantity}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    fetchInventory();
  } catch (error) {
    console.error("Failed to update inventory:", error);
  }
});

fetchInventory();
