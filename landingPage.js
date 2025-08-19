  // DOM Content Loaded Event
        document.addEventListener('DOMContentLoaded', function () {
            // Initialize form validation for all login forms
            initializeFormValidation();

            // Initialize navigation handlers
            initializeNavigation();

            // Initialize CTA buttons
            initializeCTAButtons();
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
            // Smooth scroll navigation
            document.getElementById('nav-home').addEventListener('click', function (e) {
                e.preventDefault();
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
            });

            document.getElementById('nav-about').addEventListener('click', function (e) {
                e.preventDefault();
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            });

            document.getElementById('nav-features').addEventListener('click', function (e) {
                e.preventDefault();
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
            });

            document.getElementById('nav-contact').addEventListener('click', function (e) {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            });

            // Footer links
            document.getElementById('terms-link').addEventListener('click', function (e) {
                e.preventDefault();
                // TODO: Backend Integration Point
                // window.location.href = '/terms';
                console.log('Navigate to Terms of Use');
            });

            document.getElementById('privacy-link').addEventListener('click', function (e) {
                e.preventDefault();
                // TODO: Backend Integration Point
                // window.location.href = '/privacy';
                console.log('Navigate to Privacy Policy');
            });
        }

        // CTA Button Handlers
        function initializeCTAButtons() {
            document.getElementById('get-started-btn').addEventListener('click', function () {
                // TODO: Backend Integration Point
                // window.location.href = '/register';
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
            });

            document.getElementById('create-account-btn').addEventListener('click', function () {
                // TODO: Backend Integration Point
                // window.location.href = '/register';
                console.log('Navigate to registration page');
                alert('Registration functionality will be implemented with backend integration.');
            });
        }

        // FAQ Toggle Function
        function toggleFAQ(button) {
            const answer = button.nextElementSibling;
            const icon = button.querySelector('i');
            
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.classList.remove('bi-chevron-up');
                icon.classList.add('bi-chevron-down');
            } else {
                // Close all other FAQs
                document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
                document.querySelectorAll('.faq-question i').forEach(ic => {
                    ic.classList.remove('bi-chevron-up');
                    ic.classList.add('bi-chevron-down');
                });
                
                // Open current FAQ
                answer.style.display = 'block';
                icon.classList.remove('bi-chevron-down');
                icon.classList.add('bi-chevron-up');
            }
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

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });