export function validate_input(input_group){
    for(let i=0; i<input_group.length; ++i){
        if(input_group[i].value == ""){
            alert('Algum campo deve estar em branco!')
            return false       
        }
   
    }
    return true

}

export function filterFloat(value) {
    if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
      .test(value))
      return Number.parseFloat(value);
  return NaN;
}

export function mountProduct(products_name, products_details, products_price, list){
    const card = 
    `<div class="col">
    <div class="card">
    <img src="./img/gato.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-header">${products_name}</h5>
        <p class="card-text">
        <label>R$ ${products_price}</label>
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
}