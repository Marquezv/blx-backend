const url = "https://blx-app.herokuapp.com"



function loadProducts(){
    axios.get(`${url}/products`)
    .then(response => {

        const list = document.getElementById("div-list-products")
        const products = response.data
        console.log(products.id)
       
        list.innerHTML = '';

            products.forEach(products => {
                const card = 
                `<div class="col">
                <div class="card">
                <img src="./img/gato.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 >${products.name}</h5>
                    <p class="card-text">
                    <ul>
                        <li>${products.details}</li>
                        <li>R$ ${products.price}</li>
                    </ul>
                    </p>
                    <div class="card-footer">
                    <a href="#myModal" role="button" class="btn btn-lg btn-primary" data-bs-toggle="modal">Veja Mais</a>
                    </div>
                </div>
                </div>
                </div>`
                
                const ModalModel = `            
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Seu Novo Produto</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="input-group mb-2">
                                <img src="./img/gato.jpg" class="card-img-top" alt="...">
                            </div>
                            <div class="input-group mb-2">
                                <h3>${products.name}</h3>
                            </div>
                
                            <div class="input-group mb-2">
                                <ul>
                                    <li>${products.details}</li>
                                    <li>R$ ${products.price}</li>
                                </ul>
                            </div>
                            <div class="input-group mb-2">
                                <h5>${products.user.name}</h5>
                                <ul>
                                    <li>${products.user.telephone}</li>
                                    
                                </ul>
                            </div>
                            
                            <div class="modal-footer">
                            <button id="btn_back" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button id="btn_saved" type="button" class="btn btn-primary" onclick="saveOrder(${products.id})">Criar Pedido</button>
                            </div>
                        </div>
                        
                    </div>
                    </div>`

            
                const item = document.createElement('li')
                item.innerHTML = card;
            
                list.appendChild(item)

                const modal = document.getElementById("myModal")
                const item_modal = document.createElement('div')
                item_modal.innerHTML = ModalModel;
                modal.appendChild(item_modal)
                console.log(products)
            });
        
    })
   
    
}
loadProducts()

function saveOrder(id){
    const token = sessionStorage.getItem('Authorization')
    const CreateOrder  = {
        amout: 1,
        delivery_place:" null",
        delivery_type: "Casa",
        notes: "Sem Observações",
        product_id: 34
    }
    
    if(sessionStorage.getItem('Authorization')){
        axios.post(`${url}/orders`, CreateOrder, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        }).then(response => {
            sessionStorage.setItem('product_id', id)
            console.log(response)
            window.location.replace('http://127.0.0.1:5501/public/pedidos.html')
        })
    }
    else{
        window.location.replace('http://127.0.0.1:5501/public/login.html')
    }

    

   



}