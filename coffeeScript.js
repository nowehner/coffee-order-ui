function addCondiment(condiment) {
  selectedCondiments.push(condiment);
  updateMyOrder();
}

function updateMyOrder() {
  const myOrderDiv = document.getElementById("my-order");
  const selectedBeverage = document.getElementById("selected-beverage");
  myOrderDiv.innerHTML = "";
  myOrderDiv.appendChild(selectedBeverage);

  selectedCondiments.forEach((condiment) => {
    const condimentDiv = document.createElement("div");
    condimentDiv.textContent = condiment;
    condimentDiv.className = "my-order-button";
    condimentDiv.onclick = function () {
      addCondiment(condiment);
    };
    myOrderDiv.appendChild(condimentDiv);
  });

  const confirmOrderButton = document.createElement("div");
  confirmOrderButton.textContent = "Confirm Order";
  confirmOrderButton.className = "confirm-order my-order-button";
  confirmOrderButton.onclick = confirmOrder;
  myOrderDiv.appendChild(confirmOrderButton);
}

function confirmOrder() {
  const condimentsArray = Array.from(selectedCondiments);
  const condimentsString = condimentsArray.join(", ");
  sessionStorage.setItem("selectedCondiments", condimentsString);
  window.location.href = "confirm.html";
}

function setSelectedBeverage() {
  const beverage = sessionStorage.getItem("selectedBeverage");
  const condiments = sessionStorage.getItem("selectedCondiments");
  const selectedBeverageDiv = document.getElementById("selected-beverage");

  if (beverage) {
    selectedBeverageDiv.textContent = beverage;
  } else {
    selectedBeverageDiv.textContent = "No Beverage Selected";
  }

  if (condiments) {
    condiments.split(", ").forEach((condiment) => {
      if (!selectedCondiments.includes(condiment)) {
        selectedCondiments.push(condiment);
      }
    });
    updateMyOrder();
  }
}

function selectBeverage(beverageName) {
  sessionStorage.setItem("selectedBeverage", beverageName);
  window.location.href = "condiments.html";
}

function getOrderDetails() {
  const beverage = sessionStorage.getItem("selectedBeverage") || "No Beverage Selected";
  let condiments = sessionStorage.getItem("selectedCondiments") || "";
  return `${beverage} with: ${condiments}`;
}

function setConfirmationDetails(orderData) {
  document.getElementById("order-id").textContent = orderData.id;
  document.getElementById("order-details").textContent = orderData.description;
  document.getElementById("order-total").textContent = "$" + orderData.cost.toFixed(2);
}

function fetchOrderDetails() {
  const beverage = sessionStorage.getItem("selectedBeverage");
  const condimentsString = sessionStorage.getItem("selectedCondiments");
  const condiments = condimentsString ? condimentsString.split(',') : [];

  const orderData = {
    beverage: beverage,
    condiments: condiments
  };

  fetch('https://coffee-order-latest-bb01.onrender.com/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify(orderData)
  })
  .then(response => response.json())
  .then(data => {
    setConfirmationDetails(data);
  })
  .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', (event) => {
  if (window.location.href.includes("confirm.html")) {
    fetchOrderDetails();
  } else {
    setSelectedBeverage();
  }
});