let loginId = document.getElementById("loginId");
let password = document.getElementById("password");
let idErrorMsg = document.getElementById("idErrorMsg");
let passwordErrorMsg = document.getElementById("passwordErrorMsg");
let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let form = document.getElementById("form");

let arr = { id: "dm", pwd: "w" };

function checkId() {
    idErrorMsg.textContent = "";
    if (loginId.value === "") {
        idErrorMsg.textContent = "Required*";
        return 0;
    }
    return 1;
}

function checkPassword() {
    passwordErrorMsg.textContent = "";
    if (password.value === "") {
        passwordErrorMsg.textContent = "Required*";
        return 0;
    }
    return 1;
}

signUp.addEventListener("click", ()=>
{
    let val1 = checkId();
    let val2 = checkPassword();
    if (val1+val2 === 2) {
        addUser(loginId.value, password.value)
        .then((rep)=>{
            if(rep)
            {
                window.location.href = "https://theuselessweb.com/";
            }
        });
    }
})

signIn.addEventListener("click", () => {
    let val1 = checkId();
    let val2 = checkPassword();
    if(val1+val2 === 2)
    {
        authenticate(loginId.value, password.value)
        .then((rep)=>{
            if(rep)
            {
                window.location.href = "https://theuselessweb.com/";
            }
        });
    }
});

loginId.addEventListener("blur", () => {
    if (loginId.value === "") {
        idErrorMsg.textContent = "Required*";
    } else {
        idErrorMsg.textContent = "";
    }
});

password.addEventListener("blur", () => {
    if (password.value === "") {
        passwordErrorMsg.textContent = "Required*";
    } else {
        passwordErrorMsg.textContent = "";
    }
});

function authenticate(username, password) {
    return new Promise((resolve, reject) => {
        fetch('/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               },
            body: (JSON.stringify(
                { 
                    username: username,
                    password: password 
                }))
        })
        .then(res => res.json())
        .then((res) => {
            if(res.request == "Success") {
                resolve(true);
            }
            else if(res.request == "User doesn't exists")
            {
                resolve(false);
                idErrorMsg.textContent = res.request;
            }
            else {
                resolve(false)
                passwordErrorMsg.textContent = "Password is incorrect! Try again.";
            };
        })
        .catch((err) => {
            alert(err);
            reject(err);
        });
    })
}
function addUser(username, password)
{
    return new Promise((resolve, reject) => {
        fetch("/api/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               },
            body: (JSON.stringify({
                username: username,
                password: password
            }))
        })
        .then((response) => response.json())
        .then((rep) => {
            if(rep.request === "User exists")
            {
                idErrorMsg.textContent = rep.request;
                resolve(false);
            }
            else
            {
                resolve(true);
            }
        })
        .catch((err) => {
            alert(err);
            reject(err);
        });
    });
}