import { validate_input, filterFloat } from './tools.js'
import { createProduct } from './routes.js'
import { getMyProducts } from './routes.js'

const token = sessionStorage.getItem('Authorization')
const url = 'https://blx-app.herokuapp.com'

function variaveis() {
    const form_product = document.getElementById('form-product'),
        input_name = document.getElementById('name'),
        input_details = document.getElementById('details'),
        input_price = document.getElementById('price'),
        modal = document.getElementById('myModal'),
        btn_back = document.getElementById('btn_back'),
        btn_saved = document.getElementById('btn_saved')
    return [form_product, input_name, input_details, input_price, modal, btn_saved, btn_back]
}
const [form_product, input_name, input_details, input_price, modal, btn_saved, btn_back] = variaveis()

function saveProduct(){
    console.log('Aqui')
    btn_saved.onclick = (event) =>{
        event.preventDefault()
        const input_group = modal.getElementsByTagName('input')
        
        if(validate_input(input_group)){
            const product_name = input_name.value
            const  product_details = input_details.value
            const product_price = filterFloat(input_price.value)
            createProduct(product_name, product_details, product_price)
            .then(response => {
                btn_back.click()
                document.location.reload(true)
            })
           
        }
         
    }
    
}
saveProduct()

function loadMyProducts(){
    getMyProducts()
    .then(response => {
        const products = response.data
        const listCards = document.getElementById('div-list-products')

        products.forEach(product => {
            const card = 
                `<div class="col">
                <div class="card">
                <img src="./img/gato.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-header">${product.name}</h5>
                    <p class="card-text">
                    <label>R$ ${product.price}</label>
                    </p>
                    <div class="card-footer">
                    <button class="btn btn-success">Veja Mais</button>
                    </div>
                </div>
                </div>
                </div>`
            const item = document.createElement('li')
            item.innerHTML = card;
    
            listCards.appendChild(item)
            
        });
    })
}
loadMyProducts()
