function variaveis(){
    const form_register = document.getElementById('form-register'),
        input_name = document.getElementById('name'),
        input_telephone = document.getElementById('telephone'),
        input_password = document.getElementById('password')
    return [form_register, input_name, input_telephone, input_password]
}
const [form_register, input_name, input_telephone, input_password] = variaveis()
console.log(form_register, input_name, input_telephone, input_password)

function sendToBack(){
    form_register.onsubmit = async(event) =>{
        event.preventDefault()
        const name = input_name.value
        const telephone = input_telephone.value
        const password = input_password.value

        await axios.post('https://blx-app.herokuapp.com/auth/signup', {
            name: name,
            telephone: telephone,
            password: password
        })

        alert(`Parabéns ${name} funcionou tudo certinho!`)
        //TROCAR
        window.location.replace('login.html')

    }
}

function app(){
    sendToBack()
}
app()