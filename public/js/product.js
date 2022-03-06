import { cardProducts, cardProductsDetails } from "./components.js"
import { getProduct, getProductStore, postOrder } from "./routes.js"

const product_id = sessionStorage.getItem('product_id')
const user_id = sessionStorage.getItem('user_id')
const token = sessionStorage.getItem('Authorization')

document.addEventListener('DOMContentLoaded', function(){
   
    console.log(token)

    getProduct(product_id)
    .then(response => {
        const product = response.data
        const banner = document.getElementById('banner-text')
        const divCards = document.getElementById('div-product')
        
        const text = `<h4>Nome da Loja: ${product.user.name}</h4>`
        divCards.innerHTML = cardProductsDetails(product)
        
        banner.innerHTML = text

        const btn_addCart = document.getElementById('btn_addCart')
        createOrder(product_id)
    })
    
    loadListProducts(user_id)
})

function loadListProducts(user_id){
  getProductStore(user_id)
  .then(response => {
    const list = document.getElementById("list-products")
    const products = response.data
   
        list.innerHTML = products.map(products => {
          return  cardProducts(products)
        }).join('');
  })

}

function createOrder(product_id){
  btn_addCart.onclick = (event) =>{
      event.preventDefault()
      getProduct(product_id)
      .then(response => {
        const order = response.data

        const CreateOrder = {
            amount: 1,
            delivery_place: 'pedido.product.delivery_place',
            delivery_type: 'pedido.product.delivery_type',
            notes: 'pedido.product.notes',
            product_id: product_id,
          }
          console.log(product_id)
        postOrder(CreateOrder)
      })    
  }
  
}

// function createOrder(product_id){
//   const token = sessionStorage.getItem('Authorization')
//   axios.get(`${url}/products/${product_id}`)
//   .then(response => {
//     const pedido = response.data
   

//     const CreateOrder = {
//       amount: 1,
//       delivery_place: pedido.product.delivery_place,
//       delivery_type: pedido.product.delivery_type,
//       notes: pedido.product.notes,
//       product_id: product_id
//     }
//       axios.post(`${url}/orders`, CreateOrder, {
//         headers: {
//             'Authorization' : `Bearer ${token}`
//         }
//       }).then(res => {
//         window.location.replace('pedidos.html')
        
//       })

    

//   })
  

// }

// Compradores vendo 

// Dono vendo


