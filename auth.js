// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken');
    if (token && window.location.pathname.includes('login.html')) {
        window.location.href = 'home.html';
    }
});

// Password validation function
function validatePassword(password) {
    const errors = [];
    
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)");
    }
    
    return errors;
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store the token
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to home page
            window.location.href = 'home.html';
        } else {
            showError(data.message || 'Login failed');
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
    }
}

// Handle signup
async function handleSignup(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate password requirements
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
        showPasswordRequirements(passwordErrors);
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store the token
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to home page
            window.location.href = 'home.html';
        } else {
            showError(data.message || 'Signup failed');
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
    }
}

// Show password requirements
function showPasswordRequirements(errors) {
    const requirementsDiv = document.querySelector('.password-requirements') || document.createElement('div');
    requirementsDiv.className = 'password-requirements';
    requirementsDiv.style.color = '#ff6b6b';
    requirementsDiv.style.textAlign = 'left';
    requirementsDiv.style.marginTop = '10px';
    requirementsDiv.style.padding = '10px';
    requirementsDiv.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
    requirementsDiv.style.borderRadius = '5px';
    
    let html = '<strong>Password Requirements:</strong><ul style="margin: 5px 0; padding-left: 20px;">';
    errors.forEach(error => {
        html += `<li>${error}</li>`;
    });
    html += '</ul>';
    
    requirementsDiv.innerHTML = html;
    
    const form = document.querySelector('form');
    const existingRequirements = document.querySelector('.password-requirements');
    if (!existingRequirements) {
        form.appendChild(requirementsDiv);
    } else {
        existingRequirements.innerHTML = html;
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.marginTop = '10px';
    
    const form = document.querySelector('form');
    if (!document.querySelector('.error-message')) {
        form.appendChild(errorDiv);
    }
}

// Logout function
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Check authentication for protected routes
function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
    }
} 