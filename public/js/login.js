import { loginUser } from './routes.js'
import { validate_input } from './tools.js'
import { navItens } from './components.js'


document.addEventListener('DOMContentLoaded', function(){
    const token = sessionStorage.getItem('Authorization')
    const navBar = document.getElementById('navBarList')  
    navBar.innerHTML = navItens(token);
})

function variaveis(){
    const form_login = document.getElementById('form-login'),
        input_telephone = document.getElementById('telephone'),
        input_password = document.getElementById('password')
    return [form_login, input_telephone, input_password]
}
const [form_login, input_telephone, input_password] = variaveis()
console.log(form_login, input_telephone, input_password)

function sendToBack(){
    form_login.onsubmit = (event) =>{
        event.preventDefault()

        const input_group = form_login.getElementsByTagName('input')
        if(validate_input(input_group)){
            const telephone = input_telephone.value
            const password = input_password.value
            console.log(validate_input(input_group))
            loginUser(telephone, password)
            
        }

    }
}

sendToBack()
