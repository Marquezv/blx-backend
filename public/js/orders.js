    // {
    //     "amount": 1,
    //     "delivery_place": null,
    //     "delivery_type": "Casa",
    //     "notes": "Sem Observações",
    //     "product_id": 4
    // }


const product_id = sessionStorage.getItem('product_id')
const token = sessionStorage.getItem('Authorization')
console.log(product_id)
const url = 'https://blx-app.herokuapp.com'

/////////////
document.addEventListener('DOMContentLoaded', function() {
    axios.get(`${url}/orders`, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }).then(response => {
            
        createOrder(response)
    })

    axios.get(`${url}/orders/1/sold`, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }).then(response => {
        viewSold(response)
    })
 });



function createOrder(response){
   
    const orders = response.data
    
        orders.forEach(orders => {
            const OrderOnTable =  `
            <th scope="row">${orders.id}</th>
            <td>${orders.product.name}</td>
            <td>${orders.delivery_type}</td>
            <td>${orders.notes}</td>
            <td>${orders.user.name}</td>
        `
            const table = document.getElementById("table-body")
            const row = document.createElement('tr')
            row.innerHTML = OrderOnTable;
            table.appendChild(row)
        
        })
}


function viewSold(response){
   
    const orders = response.data
    
        orders.forEach(orders => {
            const OrderOnTable =  `
            <th scope="row">${orders.id}</th>
            <td>${orders.product.name}</td>
            <td>${orders.delivery_type}</td>
            <td>${orders.notes}</td>
            <td>${orders.user.name}</td>
        `
            const table = document.getElementById("table-body-view-solds")
            const row = document.createElement('tr')
            row.innerHTML = OrderOnTable;
            table.appendChild(row)
        })
}