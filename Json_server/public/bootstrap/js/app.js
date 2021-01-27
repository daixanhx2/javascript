$(document).ready(function() {
    $("#myBtn ").click(function() {
        $("#create ").modal();
    });
    $(".btnedit ").click(function() {
        $("#update ").modal();
    });

    $(".btndelete ").click(function() {
        $("#delete ").modal();
    });
});
var fieldApi = 'http://localhost:3000/fields';

function start() {
    getFields(renderFields);
    handleCreateForm();


}
start();

function getFields(callback) {
    fetch(fieldApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);

}

function createField(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    };
    fetch(fieldApi, options)
        .then(function(response) {
            response.json();

        })
        .then(callback);
}

function renderFields(fields) {
    var listFieldsBlock =
        document.querySelector('.list-fields');
    var htmls = fields.map(function(fields) {
        return `
        <li>
        <h4>${fields.Malinhvuc}</h4>
        <h4>${fields.Tenlinhvuc}</h4>
        
        </li>
        `;

    });
    listFieldsBlock.innerHTML = htmls.join('');

}

function handleCreateForm() {
    var createBtn = document.querySelector('#save');
    createBtn.onclick = function() {

        var Malinhvuc = document.querySelector('input[Malinhvuc="Malinhvuc "]'.value);

        var Tenlinhvuc = document.querySelector('input[Tenlinhvuc="Tenlinhvuc "]'.value);
        var Mota = document.querySelector('input[Mota="Mota "]'.value);
        var Trangthai = document.querySelector('input[Trangthai="Trangthai "]'.value);

        var formData = {
            Malinhvuc: Malinhvuc,
            Tenlinhvuc: Tenlinhvuc,
            Mota: Mota,
            Trangthai: Trangthai
        };
        createField(formData);
    }
}