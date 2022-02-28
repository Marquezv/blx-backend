function variaveis(){
    const form_register = document.getElementById('form-register'),
        input_telephone = document.getElementById('telephone'),
        input_password = document.getElementById('password')
    return [form_register, input_telephone, input_password]
}
const [form_register, input_telephone, input_password] = variaveis()
console.log(form_register, input_telephone, input_password)

function sendToBack(){
    form_register.onsubmit = async(event) =>{
        event.preventDefault()

        const telephone = input_telephone.value
        const password = input_password.value

        const response = await axios.post('https://blx-app.herokuapp.com/auth/token', {
            telephone: telephone,
            password: password
        })
        console.log(response.data)
        
        alert(`Parabéns ${response.data.user.name} funcionou tudo certinho!`)
        const resposta = await axios.get('https://blx-app.herokuapp.com/products/me', {
            headers: {'Authorization': `Bearer ${response.data.access_token}`}})
        
        console.log(resposta)
    }
}




function app(){
    sendToBack()
}
app()