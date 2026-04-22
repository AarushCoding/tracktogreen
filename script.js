import { supabaseClient } from './supabase.js';

window.toggleAuth = function(type) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');

    if (type === 'signup') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
    } else {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
    }
}

function toggleAuth(type) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');

    if (type === 'signup') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
    } else {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
    }
}

// --- SIGNUP LOGIC ---
async function handleSignup(email, password, fullName) {
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: fullName,
                is_pro: false // Default to free tier
            }
        }
    })

    if (error) {
        alert("Error: " + error.message)
    } else {
        alert("Check your email for the confirmation link!")
        // Redirect to a 'Check Email' or Dashboard page
    }
}

// --- LOGIN LOGIC ---
async function handleLogin(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) {
        alert("Login failed: " + error.message)
    } else {
        // Success! Go to dashboard
        window.location.href = '/dashboard.html'
    }
}

// 1. Hook up the Login Form
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop the page from refreshing
    
    // Get values from inputs (assuming standard types)
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    await handleLogin(email, password);
});

// 2. Hook up the Signup Form
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop the page from refreshing
    
    // Get values from inputs
    const fullName = e.target.querySelector('input[placeholder="Alex Smith"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    await handleSignup(email, password, fullName);
});

