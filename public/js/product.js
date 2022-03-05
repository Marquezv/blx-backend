const url = 'https://blx-app.herokuapp.com'
document.addEventListener('DOMContentLoaded', function(){
   
    const product_id = sessionStorage.getItem('product_id')
    const user_id = sessionStorage.getItem('user_id')
    const token = sessionStorage.getItem('Authorization')
    const name = sessionStorage.getItem('UserName')
    const banner = document.getElementById('banner-text')
    const navBarList = document.getElementById('navBarList')

    console.log(token)
    if(token == null){
      console.log('Deslogado')
      
      const text = '<h4>Faça o login ou registrese!</h4> <a href="login.html" class="btn btn-lg btn-primary">Login</a> <a href="register.html" class="btn btn-lg btn-primary">Register</a>'
      banner.innerHTML = text
      
    }
    else{
      console.log('Logado')
      
      const navItem = '<li><a class="nav-link" href="index.html">Home</a></li><li><a class="nav-link" href="me.html">Me</a></li><li><a class="nav-link" href="pedidos.html">Order</a></li><li><button class="btn btn-danger" onclick="clearSession()" >Signout</button></li>'
      text = `<h4>Bem Vindo, ${name}</h4>`
      banner.innerHTML = text
      navBarList.innerHTML = navItem
  
    }
      
    axios.get(`${url}/products/${product_id}`)
    .then(response => {
        const product = response.data

        const banner = document.getElementById('banner-text')
        const divCards = document.getElementById('div-product')

        const text = `<h4>Nome da Loja: ${product.user.name}</h4>`
        const card = 
                `<div class="col">
                <div class="card">
                <img src="./img/gato.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 >${product.name}</h5>
                    <p class="card-text">
                      <p>${product.details}</p>
                      <label>R$ ${product.price}</label>
                    </p>
                    <div class="card-footer">
                      <button class="btn" onclick="createOrder(${product.id})"> Adicionar ao Carrinho </button>
                    </div>
                </div>
                </div>
                </div>`

                
        banner.innerHTML = text
        divCards.innerHTML = card


    })
    loadListProducts(user_id)
    
})

function loadListProducts(user_id){

  axios.get(`${url}/products/store/${user_id}`)
  .then(response => {
    const list = document.getElementById("list-products")
    const products = response.data
   
    list.innerHTML = '';

        products.forEach(products => {
            const productsList = 
            `<div class="col">
            <div class="card">
            <img src="./img/gato.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 >${products.name}</h5>
                <p class="card-text">
                  <label>R$ ${products.price}</label>
                </p>
                <div class="card-footer">
                <button class="btn" > Veja Mais </button>
                </div>
            </div>
            </div>
            </div>`
            
            
        
            const item = document.createElement('li')
            item.innerHTML = productsList;
        
            list.appendChild(item)

        });
  })

}


function createOrder(product_id){
  const token = sessionStorage.getItem('Authorization')
  axios.get(`${url}/products/${product_id}`)
  .then(response => {
    const pedido = response.data
   

    const CreateOrder = {
      amount: 1,
      delivery_place: pedido.product.delivery_place,
      delivery_type: pedido.product.delivery_type,
      notes: pedido.product.notes,
      product_id: product_id
    }
      axios.post(`${url}/orders`, CreateOrder, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
      }).then(res => {
        window.location.replace('pedidos.html')
        
      })

    

  })
  

}

// Compradores vendo 

// Dono vendo


