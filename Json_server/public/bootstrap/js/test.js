const $inputForm = document.getElementById('form-container') //popup
const $inputName = document.getElementById('name') //input
const $inputCity = document.getElementById('city') //input
const $inputColor = document.getElementById('color') //input
const $inputAnswers = document.getElementById('answers') //input
const $btnSubmitUpdate = document.getElementById('submit-update') //the button on the popup to confirm editing 
let names //variable to store array data
let idEdit
let indexToEdit

// Variable for  the button in the table
const detEditLink = (id) =>
    `<a class="edit-btn" id="${id}" href="#form-container">Edit</a>`

//Close popup
const closeForm = () => {
    $inputForm.classList.remove('is-visible') //close popup
}
document.getElementById('formClose').addEventListener("click", closeForm) //to close on click the button "X"
document.getElementById('form-back').addEventListener("click", closeForm) //close on click outside
window.addEventListener('keydown', (k) => { //close clicking the esc keyboard button
    if (k.keyCode === 27) closeForm()
})

//Update data
//open a popup and show the data for editing
const openEditForm = (e) => {
        idEdit = e.target.getAttribute('id') //get id 
        $inputForm.classList.add('is-visible') //open popup
        indexToEdit = names.findIndex(obj => obj.id === idEdit) //show the data inside the inputs for editing
        $inputName.value = names[indexToEdit].name
        $inputCity.value = names[indexToEdit].city
        $inputColor.value = names[indexToEdit].color
        $inputAnswers.value = names[indexToEdit].answers
    }
    //use fetch API to send the data to the server
const restEditCall = (id, name, city, color, answers) => {
    return fetch(
            'http://localhost:3000/names', {
                method: 'PUT',
                body: JSON.stringify({
                    'id': id,
                    'name': name,
                    'city': city,
                    'color': color,
                    'answers': answers
                }),
                headers: { 'content-type': 'application/json' }
            })
        .then(response => response.json())
}

const editHandler = () => {
        const $name = $inputName.value //to store data after editing
        const $city = $inputCity.value
        const $color = $inputColor.value
        const $answers = $inputAnswers.value
        restEditCall(idEdit, $name, $city, $color, $answers) //send the data to the server
            .then(({ name, city, color, answers }) => {
                names[indexToEdit].name = name
                names[indexToEdit].city = city
                names[indexToEdit].color = color
                names[indexToEdit].answers = answers
                drawTable() //update table after editing
            })
        closeForm() //close popup
    }
    //the button on the popup to confirm editing  
$btnSubmitUpdate.addEventListener("click", editHandler)

// Update table according to data
const drawTable = () => {
    const $dataTable = document.getElementById('table-players'),
        $tableHead = document.getElementById('table-head'),
        $tbody = document.createElement('tbody')

    while ($dataTable.firstChild) {
        $dataTable.removeChild($dataTable.firstChild)
    }

    $dataTable.appendChild($tableHead)

    const table = names.map(({ id, name, city, color, answers }) => `
    <tr><td data-label="Name">
    ${name} </td><td data-label="City"> ${city} </td><td data-label="Color"> ${color} 
    </td><td data-label="Answers"> ${answers} </td><td data-label="Edit"> ${detEditLink(id)} </td></tr>`)
    $tbody.innerHTML = table.join("")
    $dataTable.appendChild($tbody)

    const editBtn = document.getElementsByClassName('edit-btn') //button to open a pop-up window for editing the data
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", openEditForm)
    }
}