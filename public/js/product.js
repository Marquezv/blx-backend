const url = 'https://blx-app.herokuapp.com'
document.addEventListener('DOMContentLoaded', function(){
    const token = sessionStorage.getItem('Authorization')
    const product_id = sessionStorage.getItem('product_id')
    const user_id = sessionStorage.getItem('user_id')

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
                      <button class="btn"> Adicionar ao Carrinho </button>
                    </div>
                </div>
                </div>
                </div>`

          
        banner.innerHTML = text
        divCards.innerHTML = card


    })
    axios.get(`${url}/products/store/${user_id}`)
    .then(response => {
      // const products = response.data
      const carousel = document.getElementById('carousel')
      console.log(response.data[0])
      products.forEach(products => {

        const carouselCard = `
        <div class="carousel-item active" data-bs-interval="3000">
        <div class="col">
            <div class="card">
            <img src="./img/gato.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 >${products.name}</h5>
                <p class="card-text">
                  <p>${products.details}</p>
                  <label>R$ ${products.price}</label>
                </p>
                <div class="card-footer">
                  <button class="btn"> Adicionar ao Carrinho </button>
                </div>
            </div>
            </div>
            </div>
      </div>`

      
      carousel.innerHTML = carouselCard
      })



    })
    
})

// Compradores vendo 

// Dono vendo


