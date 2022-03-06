import { getOrder, soldOrder,  } from "./routes.js"
import { tableOrders, searchOrders, navItens } from "./components.js"


document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('Authorization')
    const navBar = document.getElementById('navBarList')  
    navBar.innerHTML = navItens(token);

    const searchArea = document.getElementById('searchOrders')
    searchArea.innerHTML = searchOrders()

    getOrder()
    .then(response => {
            
        createOrder(response)
    })

    soldOrder()
    .then(response => {
        viewSold(response)
    })
    input_search();
 });


function createOrder(response){
   
    const orders = response.data
    
        orders.forEach(orders => {
            const table = document.getElementById("table-body-view-orders")
            const row = document.createElement('tr')
            row.innerHTML = tableOrders(orders);
            table.appendChild(row)
        
        })
}

function viewSold(response){
   
    const solds = response.data
    
        solds.forEach(solds => {
            
            const table = document.getElementById("table-body-view-solds")
            const row = document.createElement('tr')
            row.innerHTML = tableOrders(solds);
            table.appendChild(row)
        })
}

function input_search(){
    const input = document.getElementById('input_search');
    input.addEventListener('keyup', pesquisaTabela())
}

function pesquisaTabela() {
  var filter, table, tr, td, i;
  table = document.getElementById("data_order");
  return function() {
    tr = table.querySelectorAll("tbody tr");
    filter = this.value.toUpperCase();
    for (i = 0; i < tr.length; i++) {
      var match = tr[i].innerHTML.toUpperCase().indexOf(filter) > -1;
      tr[i].style.display = match ? "block" : "none";
    }
  }
}

