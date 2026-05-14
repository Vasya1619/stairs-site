document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify({username, password}),
        credentials: 'include'
    })

    const data = await response.json();

    if (response.ok && data.user.role === 'admin') {
        window.location.href = '/admin'
    } else {
        
    }
})
