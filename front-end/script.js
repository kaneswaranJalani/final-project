document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        updateDarkModeIcon();
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        updateDarkModeIcon();
    });

    function updateDarkModeIcon() {
        const icon = darkModeToggle.querySelector('i');
        if (body.getAttribute('data-theme') === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Password Visibility Toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });

    // Password Strength Checker
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthMeter = document.querySelector('.strength-meter');
        const strengthText = document.querySelector('.strength-text');
        const passwordContainer = document.querySelector('.password-strength');

        // Reset classes
        passwordContainer.classList.remove('password-weak', 'password-medium', 'password-strong');

        if (password.length === 0) {
            strengthText.textContent = '';
            return;
        }

        // Very basic strength check (replace with more robust logic)
        let strength = 0;
        if (password.length > 5) strength++;
        if (password.length > 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) {
            passwordContainer.classList.add('password-weak');
            strengthText.textContent = 'Weak';
        } else if (strength <= 4) {
            passwordContainer.classList.add('password-medium');
            strengthText.textContent = 'Medium';
        } else {
            passwordContainer.classList.add('password-strong');
            strengthText.textContent = 'Strong';
        }
    });

    // Collapsible Section
    const collapsibleBtn = document.querySelector('.collapsible-btn');
    const collapsible = document.querySelector('.collapsible');

    collapsibleBtn.addEventListener('click', function() {
        collapsible.classList.toggle('active');
    });

    // Chip Selection
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            // For single selection
            chips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Form Validation
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // If validation passes
        alert('Account created successfully! Redirecting...');
        // form.submit(); // Uncomment to actually submit
    });

    // Social Login Buttons (placeholder)
    document.querySelector('.btn-social.google').addEventListener('click', () => {
        alert('Google login would trigger here');
    });

    document.querySelector('.btn-social.apple').addEventListener('click', () => {
        alert('Apple login would trigger here');
    });
});