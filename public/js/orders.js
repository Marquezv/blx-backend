import { getOrder, soldOrder } from "./routes.js"
import { tableOrders } from "./components.js"

const product_id = sessionStorage.getItem('product_id')
const token = sessionStorage.getItem('Authorization')
console.log(product_id)
const url = 'https://blx-app.herokuapp.com'

/////////////
document.addEventListener('DOMContentLoaded', function() {
    getOrder()
    .then(response => {
            
        createOrder(response)
    })

    soldOrder()
    .then(response => {
        viewSold(response)
    })
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