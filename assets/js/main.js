console.log('main.js loaded');

let isAuthN = sessionStorage.getItem('sessionAuthN');
let username = sessionStorage.getItem('username');

if(isAuthN === 'true'){

    document.getElementById('loginState').innerText =
        `Hello, ${username}`;

}
else{

    document.getElementById('loginState').innerText =
        'Please log in';

}

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', function(){

    console.log('Logging out');

    sessionStorage.removeItem('sessionAuthN');
    sessionStorage.removeItem('username');

    location.reload();

});