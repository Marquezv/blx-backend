//=====================
// [Componente :)]
export const navItens = function(token){
  if(token == null){
    return `<li class="nav-item">
              <a class="nav-link"  href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="register.html">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" active href="login.html">Login</a>
            </li>`
  }
  else {
    return `<li>
              <a class="nav-link" href="index.html">Home</a>
            </li>
            <li>
              <a class="nav-link" href="me.html">Me</a>
            </li>
            <li>
              <a class="nav-link" href="orders.html">Order</a>
            </li>
            <li><button class="btn btn-danger" onclick="clearSession()" >Signout</button>
            </li>`   
  }

}



export const cardProducts = function (product) {
    return `<div class="col">
            <div class="card">
            <img src="./img/gato.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 >${product.name}</h5>
                <p class="card-text">
                  <label>R$ ${product.price}</label>
                </p>
                <div class="card-footer">
                <button class="btn" onclick="viewProduct(${product.id},${product.user_id})" > Veja Mais </button>
                </div>
            </div>
            </div>
            </div>`;
  }
  

export const cardProductsDetails = function (product){
    return  `<div class="col">
            <div class="card">
            <img src="./img/gato.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 >${product.name}</h5>
                <p class="card-text">
                <p>${product.details}</p>
                <label>R$ ${product.price}</label>
                </p>
                <div class="card-footer">
                <button id="btn_addCart" class="btn"> Adicionar ao Carrinho </button>
                </div>
            </div>
            </div>
            </div>`
}

export const tableOrders = function(orders){
      return  `<th scope="row">${orders.id}</th>
              <td>${orders.product.name}</td> 
              <td>${orders.delivery_type}</td>
              <td>${orders.notes}</td>
              <td>${orders.user.name}</td>
              `
}

export const searchOrders = function(){
    return `
              <div class="input-group mb-3">
                      
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Search</span>
                </div>
                <input id="input_search" type="text" class="form-control" aria-describedby="inputGroup-sizing-lg">
              </div>
            </div> `
}

export const order = function(product){
  return `
          ${cardProducts(product)}
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Options</label>
            </div>
            <select class="custom-select" id="inputGroupSelect01">
              <option value="Entrega">Entrega</option>
              <option value="Retirada">Retirada</option>
            </select>
          </div>
          `
}