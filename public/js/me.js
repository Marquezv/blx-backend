const token = sessionStorage.getItem('Authorization')
const url = 'https://blx-app.herokuapp.com'
var filterFloat = function (value) {
    if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
      .test(value))
      return Number.parseFloat(value);
  return NaN;
}

function createProducts(products_name, products_details, products_price, list){       
        const card = 
        `<div class="col">
        <div class="card">
        <img src="./img/gato.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-header">${products_name}</h5>
            <p class="card-text">
            <ul>
                <li>${products_details}</li>
                <li>R$ ${products_price}</li>
            </ul>
            </p>
            <div class="card-footer">
            <button class="btn btn-success">Veja Mais</button>
            </div>
        </div>
        </div>
        </div>`


        const item = document.createElement('li')
        item.innerHTML = card;
    
        list.appendChild(item)

}

function variaveis() {
    const form_product = document.getElementById('form-product'),
        input_name = document.getElementById('name'),
        input_details = document.getElementById('details'),
        input_price = document.getElementById('price'),
        checkbox = document.getElementById('avaliable')

        modal = document.getElementById('myModal')
        btn_back = document.getElementById('btn_back')
    return [form_product, input_name, input_details, input_price, checkbox, modal]
}


function loadMyProducts(){
    
   
    axios.get(`${url}/auth/me/products`, { headers: { Authorization: `Bearer ${token}` }})
    
    .then(response => {
        const list = document.getElementById("div-list-products")
        list.innerHTML = '';
        const data = response.data
        console.log(data)
        data.forEach(data => {
            createProducts(data.name, data.details, data.price, list)
        })
    })
    .catch(error => console.log(error))
}
loadMyProducts()


function saveProduct(){
    const [form_product, input_name, input_details, input_price, checkbox, modal] = variaveis()
   
    const products_name = input_name.value
    const  products_details = input_details.value
    const products_price = input_price.value
    const products_price_float = filterFloat(products_price)

    const CreateProduct = {
            name: products_name,
            details: products_details,
            price: products_price_float,
            available: checkbox.checked
        }

    axios.post(`${url}/products`, CreateProduct, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }).then(response => {

        btn_back.click();
        document.location.reload(true);
        
    })

    

}

