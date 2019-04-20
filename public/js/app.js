$ = query => document.querySelector(query);
const database = firebase.database();
const INTERVAL = 10;

const getRemainders = () => {
    //Retriving the complete set
    firebase.database().ref('events/').orderByChild('/date').on('value', (snap) => {
        
        let data = snap.val();
        let keys = Object.keys(data);
        let tableData = `
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Number</th>
                                <th scope="col">Insurance</th>
                                <th scope="col">Fitness</th>
                                <th scope="col">Taxtation</th>
                                <th scope="col">Permit</th>
                                <th scope="col">PUC</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        for(let i = 0; i < keys.length; i++) {
            tableData += `<tr>
                            <th scope="row">${keys[i]}</td>
                            <td class="${setClass(data[keys[i]].insurance)}">${convertDate(data[keys[i]].insurance)}</td>
                            <td class="${setClass(data[keys[i]].fitness)}">${convertDate(data[keys[i]].fitness)}</td>
                            <td class="${setClass(data[keys[i]].taxtation)}">${convertDate(data[keys[i]].taxtation)}</td>
                            <td class="${setClass(data[keys[i]].permit)}">${convertDate(data[keys[i]].permit)}</td>
                            <td class="${setClass(data[keys[i]].puc)}">${convertDate(data[keys[i]].puc)}</td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-outline-primary btn-sm" onclick="window.location.hash='${keys[i]}'" data-toggle="modal" data-target="#editModal">Edit</button>
                                    <button class="btn btn-outline-danger btn-sm" onclick="fillEditModal(); window.location.hash='${keys[i]}'" data-toggle="modal" data-target="#deleteModal">Delete</button>
                                </div>
                            </td>
                         </tr>`;
        }
        
        //Adding button to it
        tableData += `</tbody>`;

        $('#table').innerHTML = tableData;

    });
    $('#remainder-alert').innerHTML = 'Events Loaded.';
};

const addEntry = () => {
    let number = $('#addNumber').value;
    let insurance = ($('#addInsurance').value == '')?'Not Entered':$('#addInsurance').value;
    let fitness = ($('#addFitness').value == '')?'Not Entered':$('#addFitness').value;
    let taxtation = ($('#addTaxtation').value == '')?'Not Entered':$('#addTaxtation').value;
    let permit = ($('#addPermit').value == '')?'Not Entered':$('#addPermit').value;
    let puc = ($('#addPUC').value == '')?'Not Entered':$('#addPUC').value;

    if(number.trim() !== ""){
        writeData(number, insurance, fitness, taxtation, permit, puc);
        clearAddModal();
        $('#remainder-alert').innerHTML = `Added "${number}".`;
    }
    else{
        alert("Enter vehicle name before proceeding.");
    }
};

const editEntry = () => {
    let number = $('#editNumber').value;
    let insurance = ($('#editInsurance').value == '')?'Not Entered':$('#editInsurance').value;
    let fitness = ($('#editFitness').value == '')?'Not Entered':$('#editFitness').value;
    let taxtation = ($('#editTaxtation').value == '')?'Not Entered':$('#editTaxtation').value;
    let permit = ($('#editPermit').value == '')?'Not Entered':$('#editPermit').value;
    let puc = ($('#editPUC').value == '')?'Not Entered':$('#editPUC').value;

    if(number.trim() !== ""){
        writeData(number, insurance, fitness, taxtation, permit, puc);
        getRemainders();
        $('#remainder-alert').innerHTML = `Edited "${number}".`;
    }
    else{
        alert("Enter vehicle name before proceeding.");
    }
};

const deleteEntry = () => {
    //console.log('Deleting : ' + window.location.hash.substring(1));
    let number = window.location.hash.substring(1);
    firebase.database().ref('events/' + number).set(null);
    $('#remainder-alert').innerHTML = `Deleted "${number}".`;
    window.location.hash = '';
};

const fillEditModal = () => {
    //console.log('Edit Modal Filling');
    if(window.location.hash){
        let number = window.location.hash.substring(1);
        let data = firebase.database().ref('events/' + number);
        data.on('value', (snap) => {
            snap = snap.val();
            if(snap != null){
                $('#editModalTitle').innerHTML = `Update details for <b>${number}</b>`;
                $('#editNumber').value = number;
                $('#editInsurance').value = snap.insurance;
                $('#editFitness').value = snap.fitness;
                $('#editTaxtation').value = snap.taxtation;
                $('#editPermit').value = snap.permit;
                $('#editPUC').value = snap.puc;
            }1
        });
    }
};

const setClass = (date) => {
    if(!(date == "Not Entered")) {
        let passedDate = new Date(date);
        let intervalDate = new Date(passedDate);
        let todaysDate = Date.now();

        intervalDate.setDate(intervalDate.getDate() - INTERVAL);

        if(todaysDate >= intervalDate && todaysDate <= passedDate){
            return "bg-warning";
        }
        if(todaysDate >= intervalDate && todaysDate >= passedDate){
            return "text-white bg-danger";
        }

    }
}

const writeData = (number, insurance, fitness, taxtation, permit, puc) => {
    firebase.database().ref('events/' + number).set({
        insurance: insurance,
        fitness: fitness,
        taxtation: taxtation,
        permit: permit,
        puc: puc,
        date: Date.now()
    });
};

const convertDate = (date) => {
    if(date !== "Not Entered"){
        tempDate = date.split('-');
        return (tempDate[2] + '-' + tempDate[1] + '-' + tempDate[0]);
    }
    else {
        return "Not Entered";
    }
};

const signOut = () => {
    setCookie("rem_username", null, 0);
    window.location.href = 'index.html';    
};

const clearAddModal = () => {
    $('#addNumber').value = '';
    $('#addInsurance').value = '';
    $('#addFitness').value = '';
    $('#addTaxtation').value = '';
    $('#addPermit').value = '';
    $('#addPUC').value = '';
};

getRemainders();