const { json } = require("express");

const miFormulario = document.querySelector('form');
const data = miFormulario.elements.ciudad.value;
const url = 'http://localhost:8080/api/';


miFormulario.addEventListener('submit', ev => {
    const formData = new FormData(miFormulario);
    fetch(url + 'buscar', {
        method: 'POST',
        body: JSON.stringify(formData)
    })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => {
            console.log(err)
            cause: 'se rompio'
        });
});