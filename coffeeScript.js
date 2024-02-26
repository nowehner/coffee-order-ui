function updateOrder(condiment) {
    var tableBody = document.getElementById('orderTableBody');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    

    var isInOrder = Array.from(tableBody.children).some(row => row.textContent.trim() === condiment);
  
    if (!isInOrder) {
      var newRow = tableBody.insertRow();
      var cell = newRow.insertCell(0);
      cell.textContent = condiment;
    } else {
      Array.from(tableBody.children).forEach(row => {
        if (row.textContent.trim() === condiment) {
          tableBody.removeChild(row);
        }
      });
  
      checkboxes.forEach(checkbox => {
        if (checkbox.id.toLowerCase() === condiment.toLowerCase()) {
          checkbox.disabled = false;
        }
      });
    }
  }
  