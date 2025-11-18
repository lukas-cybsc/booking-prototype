/* ============================================
   Contact Form Validation & Submission
   Assessment 2 - Interactive Component
   WITH SECURITY ENHANCEMENTS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const liveRegion = document.getElementById('live-region');
    
    /* ============================================
       XSS SANITIZATION UTILITIES
       ============================================ */
    
    /**
     * Sanitizes user input to prevent XSS attacks
     * @param {string} input - Raw user input
     * @returns {string} - Sanitized output
     */
    function sanitizeInput(input) {
        if (typeof input !== 'string') {
            return '';
        }
        
        // Use textContent to escape HTML entities
        const temp = document.createElement('div');
        temp.textContent = input;
        let sanitized = temp.innerHTML;
        
        // Additional security: Remove script tags, event handlers, and javascript: protocol
        sanitized = sanitized
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
            .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/data:text\/html/gi, '')
            .trim();
        
        return sanitized;
    }
    
    /**
     * Sanitizes HTML content for safe display
     * @param {string} html - HTML content
     * @returns {string} - Sanitized HTML
     */
    function sanitizeHTML(html) {
        const temp = document.createElement('div');
        temp.textContent = html;
        return temp.innerHTML;
    }
    
    /* ============================================
       INPUT VALIDATION PATTERNS & FUNCTIONS
       ============================================ */
    
    const validationPatterns = {
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phone: /^[\d\s\+\-\(\)]{7,20}$/,
        name: /^[a-zA-Z\s\-']{2,50}$/,
        alphanumeric: /^[a-zA-Z0-9\s\-_]{1,50}$/,
        bookingRef: /^[A-Z0-9]{5,20}$/
    };
    
    const validators = {
        /**
         * Validates name fields
         */
        name: function(value) {
            if (!value || value.length < 2 || value.length > 50) {
                return false;
            }
            return validationPatterns.name.test(value);
        },
        
        /**
         * Validates email address
         */
        email: function(value) {
            if (!value || value.length > 100) {
                return false;
            }
            return validationPatterns.email.test(value);
        },
        
        /**
         * Validates phone number (optional field)
         */
        phone: function(value) {
            if (!value) return true; // Optional field
            return validationPatterns.phone.test(value) && value.length >= 7 && value.length <= 20;
        },
        
        /**
         * Validates subject selection
         */
        subject: function(value) {
            const validSubjects = [
                'booking', 'modification', 'cancellation', 
                'payment', 'property', 'complaint', 'feedback', 'other'
            ];
            return validSubjects.includes(value);
        },
        
        /**
         * Validates booking reference (optional field)
         */
        bookingRef: function(value) {
            if (!value) return true; // Optional field
            return validationPatterns.bookingRef.test(value);
        },
        
        /**
         * Validates message content
         */
        message: function(value) {
            if (!value) return false;
            const trimmed = value.trim();
            return trimmed.length >= 10 && trimmed.length <= 1000;
        }
    };
    
    /* ============================================
       SECURE INPUT HANDLING
       ============================================ */
    
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const bookingRefInput = document.getElementById('contact-booking-ref');
    
    // Sanitize input on blur
    [nameInput, emailInput, phoneInput, messageInput, bookingRefInput].forEach(input => {
        if (input) {
            input.addEventListener('blur', function() {
                this.value = sanitizeInput(this.value);
            });
        }
    });
    
    // Real-time validation for name field
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            const sanitized = sanitizeInput(this.value);
            this.value = sanitized;
            
            if (!validators.name(sanitized)) {
                showError(this, 'Please enter a valid name (2-50 characters, letters only)');
            } else {
                clearError(this);
            }
        });
    }
    
    // Real-time validation for email field
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const sanitized = sanitizeInput(this.value);
            this.value = sanitized;
            
            if (!validators.email(sanitized)) {
                showError(this, 'Please enter a valid email address');
            } else {
                clearError(this);
            }
        });
    }
    
    // Real-time validation for phone field
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Only allow valid phone characters
            this.value = this.value.replace(/[^\d\s\+\-\(\)]/g, '');
        });
        
        phoneInput.addEventListener('blur', function() {
            const sanitized = sanitizeInput(this.value);
            this.value = sanitized;
            
            if (sanitized && !validators.phone(sanitized)) {
                showError(this, 'Please enter a valid phone number (7-20 characters)');
            } else {
                clearError(this);
            }
        });
    }
    
    // Real-time validation for booking reference
    if (bookingRefInput) {
        bookingRefInput.addEventListener('input', function() {
            // Convert to uppercase and remove invalid characters
            this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        });
        
        bookingRefInput.addEventListener('blur', function() {
            const sanitized = sanitizeInput(this.value);
            this.value = sanitized;
            
            if (sanitized && !validators.bookingRef(sanitized)) {
                showError(this, 'Booking reference must be 5-20 characters (letters and numbers only)');
            } else {
                clearError(this);
            }
        });
    }
    
    // Validate subject field
    if (subjectInput) {
        subjectInput.addEventListener('change', function() {
            if (!validators.subject(this.value)) {
                showError(this, 'Please select a valid subject');
            } else {
                clearError(this);
            }
        });
    }
    
    // Validate message field with character limit
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            const maxLength = 1000;
            if (this.value.length > maxLength) {
                this.value = this.value.substring(0, maxLength);
            }
        });
        
        messageInput.addEventListener('blur', function() {
            const sanitized = sanitizeInput(this.value);
            this.value = sanitized;
            
            if (!validators.message(sanitized)) {
                showError(this, 'Message must be between 10 and 1000 characters');
            } else {
                clearError(this);
            }
        });
    }
    
    /* ============================================
       ERROR HANDLING FUNCTIONS
       ============================================ */
    
    function showError(input, message) {
        const errorSpan = document.getElementById(input.name + '-error');
        if (errorSpan) {
            // Sanitize error message before displaying
            errorSpan.textContent = sanitizeHTML(message);
            errorSpan.style.display = 'block';
        }
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
    }
    
    function clearError(input) {
        const errorSpan = document.getElementById(input.name + '-error');
        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.style.display = 'none';
        }
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
    }
    
    function clearAllErrors() {
        document.querySelectorAll('.error-message').forEach(function(span) {
            span.style.display = 'none';
            span.textContent = '';
        });
        document.querySelectorAll('.error').forEach(function(input) {
            input.classList.remove('error');
            input.setAttribute('aria-invalid', 'false');
        });
    }
    
    /* ============================================
       SECURE FORM SUBMISSION
       ============================================ */
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearAllErrors();
            
            // Sanitize and validate all inputs
            const formData = {
                name: sanitizeInput(nameInput?.value || ''),
                email: sanitizeInput(emailInput?.value || ''),
                phone: sanitizeInput(phoneInput?.value || ''),
                subject: sanitizeInput(subjectInput?.value || ''),
                bookingRef: sanitizeInput(bookingRefInput?.value || '').toUpperCase(),
                message: sanitizeInput(messageInput?.value || '')
            };
            
            // Comprehensive validation
            let isValid = true;
            const errors = [];
            
            if (!validators.name(formData.name)) {
                showError(nameInput, 'Please enter a valid name (2-50 characters, letters only)');
                errors.push('name');
                isValid = false;
            }
            
            if (!validators.email(formData.email)) {
                showError(emailInput, 'Please enter a valid email address');
                errors.push('email');
                isValid = false;
            }
            
            if (formData.phone && !validators.phone(formData.phone)) {
                showError(phoneInput, 'Please enter a valid phone number');
                errors.push('phone');
                isValid = false;
            }
            
            if (!validators.subject(formData.subject)) {
                showError(subjectInput, 'Please select a valid subject');
                errors.push('subject');
                isValid = false;
            }
            
            if (formData.bookingRef && !validators.bookingRef(formData.bookingRef)) {
                showError(bookingRefInput, 'Invalid booking reference format');
                errors.push('bookingRef');
                isValid = false;
            }
            
            if (!validators.message(formData.message)) {
                showError(messageInput, 'Message must be between 10 and 1000 characters');
                errors.push('message');
                isValid = false;
            }
            
            // If validation fails
            if (!isValid) {
                const firstError = document.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
                if (liveRegion) {
                    liveRegion.textContent = 'Please correct the errors in the form';
                }
                console.error('Form validation failed:', errors);
                return;
            }
            
            // Submit form with sanitized data
            submitForm(formData);
        });
    }
    
    /* ============================================
       SECURE FORM SUBMISSION FUNCTION
       ============================================ */
    
    function submitForm(formData) {
        const submitBtn = document.querySelector('.btn-submit');
        const originalText = submitBtn?.textContent || 'Send Message';
        
        // Show loading state
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }
        
        // Announce to screen readers
        if (liveRegion) {
            liveRegion.textContent = 'Sending your message...';
        }
        
        // Simulate API call delay (in production, send to secure backend)
        setTimeout(function() {
            
            // Log sanitized and validated data
            console.log('✓ Secure Form Submission:', {
                ...formData,
                timestamp: new Date().toISOString(),
                ipAddress: '[Would be captured server-side]',
                userAgent: navigator.userAgent.substring(0, 50) + '...'
            });
            
            // Show success message
            if (successMessage) {
                successMessage.style.display = 'flex';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Announce success to screen readers
            if (liveRegion) {
                liveRegion.textContent = 'Message sent successfully! We will respond within 24 hours.';
            }
            
            // Reset form
            if (contactForm) {
                contactForm.reset();
            }
            
            // Reset button
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);
            
        }, 1500);
    }
    
    /* ============================================
       CHARACTER COUNTER FOR MESSAGE FIELD
       ============================================ */
    
    if (messageInput) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.setAttribute('aria-live', 'polite');
        messageInput.parentNode.appendChild(charCounter);
        
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            const maxLength = 1000;
            const remaining = maxLength - length;
            
            charCounter.textContent = sanitizeHTML(`${length} / ${maxLength} characters`);
            
            if (remaining < 50) {
                charCounter.style.color = '#CC0000';
            } else {
                charCounter.style.color = '#6B6B6B';
            }
        });
    }
    
    /* ============================================
       SECURE LOCAL STORAGE (DISABLED BY DEFAULT)
       ============================================ */
    
    // NOTE: localStorage is commented out for security reasons
    // In production, consider server-side session storage instead
    
    /*
    const STORAGE_KEY = 'booking_contact_form_draft';
    
    contactForm.addEventListener('input', debounce(function() {
        const formData = {
            name: sanitizeInput(nameInput.value),
            email: sanitizeInput(emailInput.value),
            phone: sanitizeInput(phoneInput.value),
            subject: sanitizeInput(subjectInput.value),
            message: sanitizeInput(messageInput.value)
        };
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        } catch (e) {
            console.error('LocalStorage error:', e);
        }
    }, 1000));
    */
    
    /* ============================================
       UTILITY FUNCTIONS
       ============================================ */
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /* ============================================
       SECURITY MONITORING
       ============================================ */
    
    // Log potential security issues (in production, send to monitoring service)
    window.addEventListener('error', function(e) {
        console.warn('Security monitoring - Error detected:', {
            message: e.message,
            source: e.filename,
            line: e.lineno
        });
    });
    
    console.log('✓ Contact form initialized with XSS protection and comprehensive input validation');
    console.log('✓ Security features: Input sanitization, pattern validation, character limits, error handling');
    
});