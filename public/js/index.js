const validate = () => {

    let name = document.forms["login"]["name"].value.toUpperCase().trim();
    let password = document.forms["login"]["password"].value.trim();
    document.getElementById('submit-btn').classList.add('is-loading');

    if(name == ""){
        console.log("Nothing Entered");
    }
    else if(name !== "" && password == ""){
        console.log("Password not entered");
    }
    else{
        fetch('/login/'+ name +'/' + password)
        .then(
            function (response) {
                if (response.status !== 200){
                    console.log('There was an Error. Status Code : ' + response.status);
                    return;
                }

                response.json().then(function(data){
                    if(data.valid == 1){
                        setCookie("username", name, 30);
                        window.location.href = 'remainders.html';
                    }
                    else{
                        console.log('No such user');
                        document.getElementById('login-err').style.display = 'inline-flex';
                    }
                });
            }
        )
        .catch(function(err) {
            console.log('Error : ' + err);
        });
    }
    document.getElementById('submit-btn').classList.remove('is-loading');
    return false;   
};