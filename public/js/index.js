import { getAllProducts } from './routes.js'

document.addEventListener('DOMContentLoaded', function(){
  const token = sessionStorage.getItem('Authorization')
  const name = sessionStorage.getItem('UserName')
  if(token == null){
    console.log('Deslogado')
    const banner = document.getElementById('banner-text')
    const text = '<h4>Faça o login ou registrese!</h4> <a href="login.html" class="btn btn-lg btn-primary">Login</a> <a href="register.html" class="btn btn-lg btn-primary">Register</a>'
    banner.innerHTML = text
    
  }
  else{
    console.log('Logado')
    const navBarList = document.getElementById('navBarList')
    const navItem = '<li><a class="nav-link" href="index.html">Home</a></li><li><a class="nav-link" href="me.html">Me</a></li><li><a class="nav-link" href="pedidos.html">Order</a></li><li><button class="btn btn-danger" onclick="clearSession()" >Signout</button></li>'
    const text = `<h4>Bem Vindo, ${name} </h4>`
    banner.innerHTML = text
    navBarList.innerHTML = navItem

  }
  
})

const productsList = getAllProducts();
productsList.then(response => {
  const products = response.data;
  const list = document.getElementById("div-list-products");
  products.forEach(products => {
    const card = 
                `<div class="col">
                <div class="card">
                <img src="./img/gato.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 >${products.name}</h5>
                    <p class="card-text">
                      <label>R$ ${products.price}</label>
                    </p>
                    <div class="card-footer">
                    <button class="btn" onclick="viewProduct(${products.id}, ${products.user.id})" > Veja Mais </button>
                    </div>
                </div>
                </div>
                </div>`
      const item = document.createElement('li');
      item.innerHTML = card;
  
      list.appendChild(item);
                
    });

});
// VER PRODUTO E LOJA INDIVIDUAL
function viewProduct(id, user_id){
    sessionStorage.setItem('product_id', id)
    sessionStorage.setItem('user_id', user_id)
    window.location.replace('product.html')

}

