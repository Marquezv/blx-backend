import { cardProducts, cardProductsDetails, navItens } from "./components.js"
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
        const ower = sessionStorage.setItem('ower', `${product.user.name}`)
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
        sessionStorage.setItem('product_id', order.id)
        sessionStorage.setItem('user_id', order.user.id)
        console.log(order)
        window.location.replace('pedido.html')
        
      })    
  }
  
}
function addToCart(id, user_id){
  
}
// Compradores vendo 

// Dono vendo


