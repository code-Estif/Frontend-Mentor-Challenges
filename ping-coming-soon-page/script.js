// DOM elements
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('errorMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form submission handler
emailForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Clear previous error
    clearError();
    
    // Validate email
    if (!email) {
        showError('Whoops! It looks like you forgot to add your email');
        return;
    }
    
    if (!emailRegex.test(email)) {
        showError('Please provide a valid email address');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Simulate API call (replace with actual endpoint)
        await submitEmail(email);
        
        // Show success state
        setSuccessState();
        
        // Reset form after success
        setTimeout(() => {
            resetForm();
        }, 3000);
        
    } catch (error) {
        // Show error state
        setErrorState();
        showError('Something went wrong. Please try again.');
        
        // Reset button state
        setTimeout(() => {
            setLoadingState(false);
        }, 2000);
    }
});

// Email input validation on blur
emailInput.addEventListener('blur', function() {
    const email = this.value.trim();
    
    if (email && !emailRegex.test(email)) {
        showError('Please provide a valid email address');
        emailInput.classList.add('error');
    } else {
        clearError();
        emailInput.classList.remove('error');
    }
});

// Clear error when user starts typing
emailInput.addEventListener('input', function() {
    if (this.value.trim()) {
        clearError();
        this.classList.remove('error');
    }
});

// Functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    emailInput.classList.add('error');
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
    emailInput.classList.remove('error');
}

function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        submitBtn.classList.add('loading');
    } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Notify Me';
        submitBtn.classList.remove('loading');
    }
}

function setSuccessState() {
    submitBtn.textContent = 'Success!';
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');
    submitBtn.disabled = true;
}

function setErrorState() {
    submitBtn.textContent = 'Error';
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('error');
}

function resetForm() {
    emailForm.reset();
    clearError();
    submitBtn.textContent = 'Notify Me';
    submitBtn.classList.remove('success', 'error', 'loading');
    submitBtn.disabled = false;
}

// Simulate API call (replace with actual implementation)
async function submitEmail(email) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve({ success: true, message: 'Email submitted successfully' });
            } else {
                reject(new Error('Network error'));
            }
        }, 1500);
    });
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on page load
    const elements = document.querySelectorAll('.container > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add keyboard navigation support
emailInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !submitBtn.disabled) {
        emailForm.dispatchEvent(new Event('submit'));
    }
});

// Add focus management
submitBtn.addEventListener('focus', function() {
    this.style.outline = '2px solid #667eea';
    this.style.outlineOffset = '2px';
});

submitBtn.addEventListener('blur', function() {
    this.style.outline = 'none';
});

// Add accessibility improvements
emailInput.setAttribute('aria-describedby', 'errorMessage');
submitBtn.setAttribute('aria-live', 'polite');

// Add form validation feedback
emailInput.addEventListener('invalid', function(e) {
    e.preventDefault();
    showError('Please provide a valid email address');
});

// Add success message for screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}