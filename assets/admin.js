const adminContent = document.getElementById('adminContent');

function showAdminData() {
    const sessionEntries = sessionStorage.getItem('savedEntries') || '[]';
    const localEntries = localStorage.getItem('savedEntries') || '[]';
    const authState = sessionStorage.getItem('sessionAuthN') || 'false';
    const username = sessionStorage.getItem('username') || 'guest';

    const derivedData = {
        timestamp: new Date().toLocaleString(),
        browser: navigator.userAgent,
        pathname: window.location.pathname,
        auth: authState,
        username
    };

    adminContent.innerHTML = `
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="card h-100">
                    <h3 class="h5">Session storage</h3>
                    <pre class="mb-0">${escapeHtml(sessionEntries)}</pre>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card h-100">
                    <h3 class="h5">Local storage</h3>
                    <pre class="mb-0">${escapeHtml(localEntries)}</pre>
                </div>
            </div>
            <div class="col-12">
                <div class="card">
                    <h3 class="h5">Derived user data</h3>
                    <pre class="mb-0">${escapeHtml(JSON.stringify(derivedData, null, 2))}</pre>
                </div>
            </div>
        </div>
    `;
}

function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

if (sessionStorage.getItem('sessionAuthN') !== 'true') {
    window.location.assign('../index.html');
} else {
    showAdminData();
}
