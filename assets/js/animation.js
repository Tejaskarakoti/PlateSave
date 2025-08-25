
// Account type selection
document.querySelectorAll('.type-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.type-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        
        // Update avatar icon based on selection
        const avatar = document.querySelector('.avatar-circle');
        if (this.dataset.type === 'restaurant') {
            avatar.textContent = '🏪';
        } else {
            avatar.textContent = '🤝';
        }
    });
});

// Social login functions
function signInWithGoogle() {
    showNotification('Redirecting to Google...', 'info');
    // Implement Google OAuth
}

function signInWithFacebook() {
    showNotification('Redirecting to Facebook...', 'info');
    // Implement Facebook OAuth
}

function goToLogin() {
    showNotification('Redirecting to login page...', 'info');
    // Redirect to login page
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 15px 25px;
        border-radius: 15px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        max-width: 350px;
    `;
    
    // Set background based on type
    switch(type) {
        case 'success':
            notification.style.background = 'rgba(76, 175, 80, 0.9)';
            break;
        case 'error':
            notification.style.background = 'rgba(244, 67, 54, 0.9)';
            break;
        default:
            notification.style.background = 'rgba(33, 150, 243, 0.9)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 4000);
}

// Add slideInRight and slideOutRight animation keyframes to the document head
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
});

// Add some interactivity to inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});