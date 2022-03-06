import { cardProducts, cardProductsDetails, navItens, order } from './components.js'
import { getProduct, getProductStore, postOrder } from './routes.js'

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
        
        createOrder(product_id)
    })
    
    
})


function createOrder(product_id){
  const btn_accept = document.getElementById('btn_accept')
  btn_accept.onclick = (event) =>{
      const selectOption = document.getElementById('inputGroupSelect')
      const option = selectOption.options[selectOption.selectedIndex].value;
      const notes = document.getElementById('notes').value
      event.preventDefault()
      getProduct(product_id)
      .then(response => {
        const order = response.data
        const CreateOrder = {
            amount: 1,
            delivery_place: 'Av. Jorge João Saad, 900 - Vila Inah, São Paulo - SP, 05618-001',
            delivery_type: option,
            notes: notes,
            product_id: product_id,
          }
          
        postOrder(CreateOrder)
        
      })    
  }
  
}

// Compradores vendo 

// Dono vendo


