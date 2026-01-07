// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });

    // Rate limiting to prevent spam submissions
    let lastSubmissionTime = 0;
    const MIN_SUBMISSION_INTERVAL = 20000; // 20 seconds between submissions

    // Contact Form with EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Initialize EmailJS
        emailjs.init('BfVEOED2PeC29HQ11');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formMessage = document.getElementById('form-message');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Clear previous messages
            formMessage.className = '';
            formMessage.textContent = '';

            // Rate limiting check
            const now = Date.now();
            if (now - lastSubmissionTime < MIN_SUBMISSION_INTERVAL) {
                formMessage.textContent = 'Please wait a moment before submitting again.';
                formMessage.className = 'form-message error';
                return;
            }

            // Check reCAPTCHA verification
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                formMessage.textContent = 'Please complete the reCAPTCHA verification.';
                formMessage.className = 'form-message error';
                return;
            }

            // Disable submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Get and trim form data
            const rawData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                case_type: (() => {
                    const select = document.getElementById('case-type');
                    const selectedOption = select.options[select.selectedIndex];
                    return selectedOption ? selectedOption.text : 'Not specified';
                })(),
                message: document.getElementById('message').value
            };

            // Validate all inputs
            if (!validateName(rawData.name)) {
                formMessage.textContent = 'Please enter a valid name (at least 2 characters, letters only).';
                formMessage.className = 'form-message error';
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                return;
            }

            if (!validateEmail(rawData.email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.className = 'form-message error';
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                return;
            }

            if (!validatePhone(rawData.phone)) {
                formMessage.textContent = 'Please enter a valid phone number (at least 10 digits).';
                formMessage.className = 'form-message error';
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                return;
            }

            if (!validateMessage(rawData.message)) {
                formMessage.textContent = 'Please enter a message (between 10 and 5000 characters).';
                formMessage.className = 'form-message error';
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                return;
            }

            // Sanitize all inputs to prevent XSS and code injection
            const sanitizedData = {
                name: sanitizeText(rawData.name.trim()),
                email: rawData.email.trim().toLowerCase(), // Email is validated, just normalize
                phone: rawData.phone.trim().replace(/\D/g, ''), // Keep only digits for phone
                case_type: sanitizeText(rawData.case_type),
                message: sanitizeText(rawData.message.trim())
            };

            // Update last submission time
            lastSubmissionTime = now;

            // Send email using EmailJS with sanitized data
            emailjs.send(
                'service_2brcexp',
                'template_ds94u6l',
                {
                    from_name: sanitizedData.name,
                    from_email: sanitizedData.email,
                    phone: sanitizedData.phone,
                    case_type: sanitizedData.case_type,
                    message: sanitizedData.message,
                    to_email: 'limitlesslawllp@gmail.com',
                    'g-recaptcha-response': recaptchaResponse
                }
            )
            .then(function(response) {
                console.log('Success!', response.status, response.text);

                // ✅ GOOGLE ADS CONVERSION (fires once, only on success)
                // Use dataLayer directly to ensure it works even if gtag.js hasn't fully loaded
                if (window.dataLayer) {
                    console.log('Pushing conversion event to dataLayer...');
                    window.dataLayer.push({
                        'event': 'conversion',
                        'send_to': 'AW-17812504236/XbUiCJ2Fh9MbEKz91K1C'
                    });
                    console.log('Conversion event pushed!', window.dataLayer);
                } else if (typeof gtag === 'function') {
                    console.log('Using gtag fallback...');
                    // Fallback to gtag if dataLayer isn't available but gtag is
                    gtag('event', 'conversion', {
                        'send_to': 'AW-17812504236/XbUiCJ2Fh9MbEKz91K1C'
                    });
                    console.log('Conversion event sent via gtag!');
                } else {
                    console.error('Neither dataLayer nor gtag available!');
                }
                
                // Show success message
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will contact you within 24 hours.';
                formMessage.className = 'form-message success';
                
                // Reset form and reCAPTCHA
                contactForm.reset();
                grecaptcha.reset();
                
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            })
            .catch(function(error) {
                console.error('Error:', error);
                
                // Show error message
                formMessage.textContent = 'There was an error sending your message. Please try again or call us directly at (818) 465-8795.';
                formMessage.className = 'form-message error';
                
                // Reset reCAPTCHA on error so user can try again
                grecaptcha.reset();
                
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Input sanitization function to prevent XSS and code injection
function sanitizeInput(str) {
    if (!str || typeof str !== 'string') return '';
    // Remove any HTML tags and encode special characters
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// Sanitize text input (allows basic characters but removes dangerous patterns)
function sanitizeText(str) {
    if (!str || typeof str !== 'string') return '';
    // Remove potentially dangerous characters and patterns
    return str
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .replace(/<iframe/gi, '') // Remove iframe tags
        .replace(/<object/gi, '') // Remove object tags
        .replace(/<embed/gi, ''); // Remove embed tags
}

// Form validation helper
function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
}

function validatePhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function validateName(name) {
    if (!name || typeof name !== 'string') return false;
    const trimmed = name.trim();
    // Name should be at least 2 characters, max 100, and contain only letters, spaces, hyphens, and apostrophes
    return trimmed.length >= 2 && trimmed.length <= 100 && /^[a-zA-Z\s\-']+$/.test(trimmed);
}

function validateMessage(message) {
    if (!message || typeof message !== 'string') return false;
    const trimmed = message.trim();
    // Message should be at least 10 characters, max 5000
    return trimmed.length >= 10 && trimmed.length <= 5000;
}

