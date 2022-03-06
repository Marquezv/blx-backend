const url = "https://blx-app.herokuapp.com"

// ROTAS ESPECIFICAS
export function registerUser(name, telephone, password){
    return axios.post(`${url}/auth/signup`,{
        name: name,
        telephone: telephone,
        password: password
    })
    .then(response => {
        alert(`Parabéns ${name} funcionou tudo certinho!`)
        window.location.replace('login.html')
        }
    )
    .catch(error => {
        alert(error.response.data.detail)
        
    }
    
    )
}

export function loginUser(telephone, password){
    return axios.post(`${url}/auth/token`, {
        telephone: telephone,
        password: password
    })
    .then(response =>{
        alert(`Bem vindo ${response.data.user.name}`)
        sessionStorage.setItem('Authorization',`${response.data.access_token}`)
        sessionStorage.setItem('UserName' , `${response.data.user.name}`)
        window.location.replace('me.html')
    })
    .catch(error => {
        alert(error)
    })
} 

// ROTAS COMPARTILHADAS
export function getAllProducts(){
    return axios.get(`${url}/products`)
}

  
export function createProduct(product_name, product_details, product_price){
    const token = sessionStorage.getItem('Authorization')
    const CreateProduct = {
        name: product_name,
        details: product_details,
        price: product_price,
        available: true
    }
    
    return axios.post(`${url}/products`, CreateProduct, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        
}

export function getMyProducts(){
    const token = sessionStorage.getItem('Authorization')
    return axios.get(`${url}/auth/me/products`, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })
}

export function getProduct(product_id){
    return axios.get(`${url}/products/${product_id}`)
}

export function getProductStore(user_id){
    return axios.get(`${url}/products/store/${user_id}`)
}

export function postOrder(CreateOrder){
    const token = sessionStorage.getItem('Authorization')
    return axios.post(`${url}/orders`, CreateOrder, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    }).then(response => {
        console.log(response)
    }).catch(error => {
        alert(error.response.data.detail)
    })
}

export function getOrder(){
    const token = sessionStorage.getItem('Authorization')
    return axios.get(`${url}/orders`, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
}

export function soldOrder(){
    const token = sessionStorage.getItem('Authorization')
    return axios.get(`${url}/orders/1/sold`, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
}