$(document).ready(function() {
  fetchProductData();

  $('#updateForm').submit(function(event) {
    event.preventDefault();
    updateProduct();
  });
});

function fetchProductData() {
  $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbxn42jDBqs92Bt8v3pSxhUnhxKDwcFNCRiKjzZyFEalHIn16UAeZjKq73-kzEopjraEeQ/exec',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      updateProductTable(data);
    },
    error: function(error) {
      console.error('Error fetching product data:', error);
    }
  });
}

function updateProduct() {
  var productName = $('#productName').val();
  var location = $('#location').val();
  var quantity = parseFloat($('#quantity').val());

  $.ajax({
    url: 'https://script.google.com/macros/s/YOUR-SCRIPT-ID/exec',
    type: 'POST',
    data: {
      action: 'updateProduct',
      name: productName,
      location: location,
      quantity: quantity
    },
    success: function() {
      fetchProductData();
      $('#updateForm')[0].reset();
    },
    error: function(error) {
      console.error('Error updating product:', error);
    }
  });
}

function updateProductTable(data) {
  $('#productTableBody').empty();

  data.forEach(function(product) {
    var row = $('<tr>');
    row.append($('<td>').text(product.name));
    row.append($('<td>').text(product.homeQuantity));
    row.append($('<td>').text(product.warehouseQuantity));
    row.append($('<td>').text(product.totalQuantity));
    $('#productTableBody').append(row);
  });
}
