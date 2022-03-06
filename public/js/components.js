//=====================
// [Componente :)]
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
