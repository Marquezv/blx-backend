import { getAllProducts } from './routes.js'
import { cardProducts, navItens } from './components.js'

document.addEventListener('DOMContentLoaded', function(){
  const token = sessionStorage.getItem('Authorization')
  const navBar = document.getElementById('navBarList')
  const banner = document.getElementById('banner-text')

  if(token == null){
    console.log('Deslogado')
    const text = '<h4>Faça o login ou registrese!</h4> <a href="login.html" class="btn btn-lg btn-primary">Login</a> <a href="register.html" class="btn btn-lg btn-primary">Register</a>'
    banner.innerHTML = text
    navBar.innerHTML = navItens(token);
  }
  else{
    console.log('Logado')
    const name = sessionStorage.getItem('UserName')
    const text = `<h2>Bem vindo, ${name}!</h2>`
    banner.innerHTML = text

    navBar.innerHTML = navItens(token);
    // navBarList.innerHTML = navItem

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


