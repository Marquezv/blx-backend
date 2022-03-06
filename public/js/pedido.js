import { cardProducts, cardProductsDetails, navItens, order } from "./components.js"
import { getProduct, getProductStore, postOrder } from "./routes.js"

const product_id = sessionStorage.getItem('product_id')
const user_id = sessionStorage.getItem('user_id')
const token = sessionStorage.getItem('Authorization')

document.addEventListener('DOMContentLoaded', function(){
   
    const navBar = document.getElementById('navBarList')  
    navBar.innerHTML = navItens(token);

    getProduct(product_id)
    .then(response => {
        const product = response.data
        const banner = document.getElementById('banner-text')
        const divCards = document.getElementById('div-product')
        
        const text = `<h4>Nome da Loja: ${product.user.name}</h4>`
        divCards.innerHTML = order(product)
        
        banner.innerHTML = text

        const btn_addCart = document.getElementById('btn_addCart')
        order(product_id)
    })
    
    
})



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

// Compradores vendo 

// Dono vendo


