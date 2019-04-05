const addEntry = () => {
    let number = document.getElementById('add-number').value.trim();
    let insurance = document.getElementById('add-insurance').value.trim();
    let fitness = document.getElementById('add-fitness').value.trim();
    let taxtation = document.getElementById('add-taxtation').value.trim();
    let permit = document.getElementById('add-permit').value.trim();
    let puc = document.getElementById('add-puc').value.trim();

    if(number == "" || insurance == "" || fitness == "" || taxtation == "" || permit == "" || puc == "") {
        window.alert("Please fill in all the details before Adding!");
        document.getElementById('add-number').focus();
        return;
    }

    //Converting to Indian Date Format
    insurance = convertDateFormat(insurance);
    fitness = convertDateFormat(fitness);
    taxtation = convertDateFormat(taxtation);
    permit = convertDateFormat(permit);
    puc = convertDateFormat(puc);

    fetch(`/add/${number}/${insurance}/${fitness}/${taxtation}/${permit}/${puc}`)
    .then(
        function (response){
            if(response.status !== 200){
                console.log("Error status : " + response.status);
            }
            response.json().then(data => {
                document.getElementById('add-modal').classList.remove('is-active');
                clearForm();
                getRemainders();
            });
        }
    )
};


const updateEntry = () => {
    let number = document.getElementById('edit-number').value.trim();
    
    let insurance = convertDateFormat(document.getElementById('edit-insurance').value);
    let fitness = convertDateFormat(document.getElementById('edit-fitness').value);
    let taxtation = convertDateFormat(document.getElementById('edit-taxtation').value);
    let permit = convertDateFormat(document.getElementById('edit-permit').value);
    let puc = convertDateFormat(document.getElementById('edit-puc').value);
    
    let id = document.getElementById('edit-number').getAttribute('data-id');

    fetch(`/update/${id}/${number}/${insurance}/${fitness}/${taxtation}/${permit}/${puc}`)
    .then(
        function (response) {
            if(response.status !== 200) {
                console.log('Error status : ' + response.status);
                return;
            }
            response.json().then(data => {
                document.getElementById('edit-modal').classList.remove('is-active');
                console.log(data);
                getRemainders();
            });
        }
    )

}


const showAddModal = () => {
    document.getElementById('add-modal').classList.add('is-active');
};

//Get the already existing information
const showEditModal = (elem) => {
    let i = elem.getAttribute("data-id");
    document.getElementById('edit-number').value = document.getElementById(`number${i}`).innerHTML;
    document.getElementById('edit-insurance').value = convertDateFormat(document.getElementById(`insurance${i}`).innerHTML);
    document.getElementById('edit-fitness').value = convertDateFormat(document.getElementById(`fitness${i}`).innerHTML);
    document.getElementById('edit-taxtation').value = convertDateFormat(document.getElementById(`taxtation${i}`).innerHTML);
    document.getElementById('edit-permit').value = convertDateFormat(document.getElementById(`permit${i}`).innerHTML);
    document.getElementById('edit-puc').value = convertDateFormat(document.getElementById(`puc${i}`).innerHTML);

    //We have to pass id as well, so setting the attribute for it
    document.getElementById('edit-number').setAttribute("data-id", i);

    document.getElementById('edit-modal').classList.add('is-active');
};

const showDeleteModal = (param) => {
    document.getElementById('delete-modal').classList.add('is-active');
    let conf = document.getElementById('delete-confirm');
    
    conf.addEventListener('click', function removeFunc() {

        deleteData(param);

        param.removeAttribute("data-id");
        document.getElementById('delete-modal').classList.remove('is-active');
        //Cuz data id was repeating
        conf.removeEventListener('click', removeFunc);
    });
};


const closeAddModal = () => {
    document.getElementById('add-modal').classList.remove('is-active');
};
const closeEditModal = () => {
    document.getElementById('edit-modal').classList.remove('is-active');
};
const closeDeleteModal = () => {
    document.getElementById('delete-modal').classList.remove('is-active');
};

const clearForm = () => {
    document.getElementById('add-number').value = "";
    document.getElementById('add-insurance').value = "";
    document.getElementById('add-fitness').value = "";
    document.getElementById('add-taxtation').value = "";
    document.getElementById('add-permit').value = "";
    document.getElementById('add-puc').value = "";
};

const convertDateFormat = (date) => {
    let dateArray = date.split("-");
    return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
};