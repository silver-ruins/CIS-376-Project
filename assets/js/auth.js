console.log('auth.js loaded');

document
    .getElementById('loginBtn')
    .addEventListener('click', checkLogin);

function checkLogin(){

    let isAuthN = false;

    console.log('checking login...');

    const username =
        document.getElementById('userBox').value;

    const passBox =
        document.getElementById('passBox').value;

    console.log(passBox);

    if(passBox === 'password123'){

        console.log('yep, you are logged in!');

        isAuthN = true;

        sessionStorage.setItem(
            'sessionAuthN',
            isAuthN
        );

        sessionStorage.setItem(
            'username',
            username
        );

        window.location.assign(
            '../index.html'
        );
    }
    else{

        console.log(
            'nope, try again'
        );

        sessionStorage.setItem(
            'sessionAuthN',
            false
        );

        document.getElementById(
            'passBox'
        ).value = '';

    }
}