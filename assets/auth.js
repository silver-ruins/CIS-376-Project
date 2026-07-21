console.log('auth.js loaded');

const loginBtn = document.getElementById('loginBtn');
const loginMessage = document.getElementById('loginMessage');

if (loginBtn) {
    loginBtn.addEventListener('click', checkLogin);
}

function checkLogin() {
    const username = document.getElementById('userBox').value.trim();
    const passBox = document.getElementById('passBox').value;

    const fallbackPassword = 'password123';
    const hashedPassword = 'cat';

    const passwordToUse = passBox === hashedPassword ? hashedPassword : fallbackPassword;

    if (passBox === passwordToUse) {
        sessionStorage.setItem('sessionAuthN', 'true');
        sessionStorage.setItem('username', username || 'friend');
        loginMessage.textContent = 'Login successful. Redirecting...';
        window.location.assign('../index.html');
    } else {
        sessionStorage.setItem('sessionAuthN', 'false');
        document.getElementById('passBox').value = '';
        loginMessage.textContent = 'Incorrect password. Try the demo password or use the hashed password cat.';
    }
}
