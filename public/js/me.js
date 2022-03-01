const url = 'http://0.0.0.0:5000/auth/me/products'

function loadMyProducts(){
    const token = sessionStorage.getItem('Authorization')
    axios.defaults.headers.authorization = `Bearer ${token}`;
    const dados = sessionStorage.getItem('Authorization')
    console.log(dados)
    axios.get('http://0.0.0.0:5000/auth/me/products')
    .then(response => {
        const data = response.data
        console.log(data)
    
    })
    .catch(error => console.log(error))
}
loadMyProducts()