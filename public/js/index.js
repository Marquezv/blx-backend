import { getAllProducts } from './routes.js'
import { cardProducts } from './components.js'

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
  
});


function render(){
  const tela = document.getElementById("div-list-products");
  const productsList = getAllProducts();
  productsList.then(response => {
    const products = response.data
    tela.innerHTML = products.map((product) => {
      return cardProducts(product)
    }).join('');
    
      
  });
    
};

render();

// // VER PRODUTO E LOJA INDIVIDUAL
// function viewProduct(id, user_id){
//     sessionStorage.setItem('product_id', id)
//     sessionStorage.setItem('user_id', user_id)
//     window.location.replace('product.html')

// }

