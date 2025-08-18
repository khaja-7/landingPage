// DOM Content Loaded Event
        document.addEventListener('DOMContentLoaded', function () {

            // Initialize form validation for all login forms
            initializeFormValidation();

            // Initialize navigation handlers
            initializeNavigation();
        });

        // Form Validation Function
        function initializeFormValidation() {
            const forms = ['student-login-form', 'ug-login-form', 'institution-login-form'];

            forms.forEach(formId => {
                const form = document.getElementById(formId);
                const formType = formId.split('-')[0]; // student, ug, or institution

                form.addEventListener('submit', function (e) {
                    e.preventDefault(); // Prevent default form submission

                    // Validate form
                    if (validateLoginForm(formType)) {
                        // TODO: Backend Integration Point
                        // Call backend authentication API here
                        handleLogin(formType, getFormData(formType));
                    }
                });
            });
        }

        // Form Validation Logic
        function validateLoginForm(formType) {
            const username = document.getElementById(`${formType}-username`).value.trim();
            const password = document.getElementById(`${formType}-password`).value.trim();

            let isValid = true;

            // Validate Username
            if (!username) {
                showError(`${formType}-username-error`);
                isValid = false;
            } else {
                hideError(`${formType}-username-error`);
            }

            // Validate Password
            if (!password) {
                showError(`${formType}-password-error`);
                isValid = false;
            } else {
                hideError(`${formType}-password-error`);
            }

            return isValid;
        }

        // Show/Hide Error Messages
        function showError(errorId) {
            document.getElementById(errorId).style.display = 'block';
        }

        function hideError(errorId) {
            document.getElementById(errorId).style.display = 'none';
        }

        // Get Form Data
        function getFormData(formType) {
            return {
                username: document.getElementById(`${formType}-username`).value.trim(),
                password: document.getElementById(`${formType}-password`).value.trim(),
                userType: formType
            };
        }

        // Handle Login - Backend Integration Point
        function handleLogin(formType, formData) {
            // Show loading state
            const loginBtn = document.getElementById(`${formType}-login-btn`);
            const originalText = loginBtn.textContent;
            loginBtn.textContent = 'Logging in...';
            loginBtn.disabled = true;

            // TODO: Replace this with actual API call to backend
            // Example API call structure:
            /*
            fetch('/api/login/' + formType, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken() // if using Django/CSRF protection
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirect to appropriate dashboard
                    window.location.href = data.redirect_url;
                } else {
                    // Show error message
                    showLoginError(formType, data.message);
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                showLoginError(formType, 'An error occurred. Please try again.');
            })
            .finally(() => {
                // Reset button state
                loginBtn.textContent = originalText;
                loginBtn.disabled = false;
            });
            */

            // Temporary simulation for demo purposes
            setTimeout(() => {
                console.log('Login attempt:', formData);
                alert(`Login attempt for ${formType} user: ${formData.username}`);

                // Reset button state
                loginBtn.textContent = originalText;
                loginBtn.disabled = false;
            }, 1500);
        }

        // Show Login Error (for backend integration)
        function showLoginError(formType, message) {
            // You can create a dedicated error display area
            alert('Login Error: ' + message);
        }

        // Navigation Handlers
        function initializeNavigation() {
            // TODO: Backend Integration Point
            // Replace these with actual routing logic when implementing SPA or server-side routing

            document.getElementById('nav-home').addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Navigate to Home');
                // window.location.href = '/home';
            });

            document.getElementById('nav-about').addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Navigate to About');
                // window.location.href = '/about';
            });

            document.getElementById('nav-features').addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Navigate to Features');
                // window.location.href = '/features';
            });

            document.getElementById('nav-contact').addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Navigate to Contact');
                // window.location.href = '/contact';
            });
        }

        // Utility Functions for Backend Integration

        // Get CSRF Token (for Django backend)
        function getCsrfToken() {
            return document.querySelector('[name=csrfmiddlewaretoken]')?.value;
        }

        // Clear form data
        function clearForm(formType) {
            document.getElementById(`${formType}-username`).value = '';
            document.getElementById(`${formType}-password`).value = '';
            hideError(`${formType}-username-error`);
            hideError(`${formType}-password-error`);
        }

        // Set form loading state
        function setFormLoading(formType, loading) {
            const form = document.getElementById(`${formType}-login-form`);
            const inputs = form.querySelectorAll('input');
            const button = document.getElementById(`${formType}-login-btn`);

            inputs.forEach(input => input.disabled = loading);
            button.disabled = loading;
            button.textContent = loading ? 'Logging in...' : 'Login';
        }