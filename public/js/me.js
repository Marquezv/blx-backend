async function loadProducts(){
    const response = await axios.get("https://blx-app.herokuapp.com/products/me", {
        headers: {'Authorization': `Bearer ${response.data.access_token}`}}
        )

    
    console.log(response.data)

    const products = response.data

    const list = document.getElementById("div-list-products")
    list.innerHTML = '';

    products.forEach(products => {
        const card = `<div class="col">
                        <div class="card">
                        <img src="./img/gato.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-header">${products.name}</h5>
                            <p class="card-text">
                            <ul>
                                <li>${products.details}</li>
                                <li>R$ ${products.price}</li>
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
    });

   
}
function app(){
    console.log('APP INICIADA')
    loadProducts()
}
app()