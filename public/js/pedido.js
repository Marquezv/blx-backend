import { cardProducts, cardProductsDetails, navItens, order } from "./components.js"
import { getProduct, getProductStore, postOrder } from "./routes.js"

const product_id = sessionStorage.getItem('product_id')
const user_id = sessionStorage.getItem('user_id')
const token = sessionStorage.getItem('Authorization')

/////////////////////////////////
document.addEventListener('DOMContentLoaded', function(){
   
    const navBar = document.getElementById('navBarList')  
    navBar.innerHTML = navItens(token);

    getProduct(product_id)
    .then(response => {
        function variaveis(){
          const btn_accept = document.getElementById('btn_accept'),
                btn_cancel = document.getElementById('btn_cancel')
          return [btn_accept, btn_cancel]
        }
        const [btn_accept, btn_cancel] = variaveis()
        
        const product = response.data
        const banner = document.getElementById('banner-text')
        const divCards = document.getElementById('div-product')
        
        const text = `<h4>Seu Pedido: </h4>`
        divCards.innerHTML = order(product)
        
        banner.innerHTML = text
        
        
        order(product_id)
        
        const selectOption = document.getElementById('inputGroupSelect')
        let option = '';
        selectOption.onchange = function(){
          option = this.value;
          
          return option
        }
        
        console.log(notes)
        createOrder(product_id, option)
    })
    
    
})


function createOrder(product_id, option){
  const btn_accept = document.getElementById('btn_accept')
  btn_accept.onclick = (event) =>{
      const notes = document.getElementById('notes').value
      event.preventDefault()
      getProduct(product_id)
      .then(response => {
        const order = response.data
        const CreateOrder = {
            amount: 1,
            delivery_place: 'Sera adicionado o endere',
            delivery_type: option.value,
            notes: notes,
            product_id: product_id,
          }
          
        postOrder(CreateOrder)
      })    
  }
  
}

// Compradores vendo 

// Dono vendo


