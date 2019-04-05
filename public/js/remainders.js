const INTERVAL = 10;

const getRemainders = () => {
    fetch('/all')
    .then(
        function (response){
            if(response.status !== 200){
                console.log('Error Status : ' + response.status);
                return;
            }
            response.json().then((data) => tableify(data));
        }
    )
};

const checkDate = (param, index) => {

    document.getElementById("insurance" + index).setAttribute("class", getClassColor(param.insurance));
    document.getElementById("fitness" + index).setAttribute("class", getClassColor(param.fitness));
    document.getElementById("taxtation" + index).setAttribute("class", getClassColor(param.taxtation));
    document.getElementById("permit" + index).setAttribute("class", getClassColor(param.permit));
    document.getElementById("puc" + index).setAttribute("class", getClassColor(param.puc));

}

const getClassColor = (paramDate) => {
    //INTERVAL before today's date
    paramDate = paramDate.split("-");
    let date = new Date(paramDate[2] + "-" + paramDate[1] + "-" +paramDate[0]);
    intervalDate = date.valueOf();
    intervalDate = new Date(date)
    intervalDate.setDate(intervalDate.getDate() - INTERVAL);

    let todayDate = new Date();

    if(todayDate >= intervalDate && todayDate <= date) {
        return "is-danger";
    }
    
    if(todayDate >= intervalDate && todayDate >= date){
        return "";
    }
};

//checkDate("6-4-2019");

const tableify = (data) => {
    let outputText = "";
    outputText += `
        <table class="table is-striped is-hoverable is-bordered">
            <thead>
                <tr>
                    <th>SNo</th>
                    <th>Machine No</th>
                    <th>Insurance</th>
                    <th>Fitness</th>
                    <th>Taxtation</th>
                    <th>Permit</th>
                    <th>PUC</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td colspan="8"><button class="button is-primary" onclick="showAddModal()">Add Entry</button></td>
                </tr>
            </tfoot>
            <tbody>`;

            for(let i = 0; i < data.length; i++){
                outputText += `
                    <tr id="details${i}">
                        <td>${i + 1}</td>
                        <td id="number${i}">${data[i].number}</td>
                        <td id="insurance${i}">${data[i].insurance}</td>
                        <td id="fitness${i}">${data[i].fitness}</td>
                        <td id="taxtation${i}">${data[i].taxtation}</td>
                        <td id="permit${i}">${data[i].permit}</td>
                        <td id="puc${i}">${data[i].puc}</td>
                        <td>
                            <div class="buttons has-addons">
                                <span class="button" data-id="${i}" onclick="showEditModal(this)">Edit</span>
                                <span class="button" data-id="${i}" onclick="showDeleteModal(this)">Delete</span>
                            </div>
                        </td>
                    </tr>`;

            }

        outputText += '</tbody></table>';    
        document.querySelector('#table-container').innerHTML = outputText;

        //Set class after checking date
        for(let i = 0; i < data.length; i++){
            checkDate(data[i], i);
        }
};

const editData = (elem) => {
    
};

const deleteData = (elem) => {
    let id = elem.getAttribute('data-id');        
    //Deleting the record with id
    fetch(`/delete/${id}`)
    .then(
        function (response){
            if(response.status !== 200){
                console.log('Error returned : ' + response.status);
                return;
            }
            response.json().then(data => {
                getRemainders();
             });
        }
    )
        
};

getRemainders();