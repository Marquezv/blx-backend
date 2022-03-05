const url = "https://blx-app.herokuapp.com"

export function getAllProducts(){
    return axios.get(`${url}/products`)
}
    
export function registerUser(name, telephone, password){
    return axios.post(`${url}/auth/signup`,{
        name: name,
        telephone: telephone,
        password: password
    })
    .catch(error => console.log(error)
    
    )
}

