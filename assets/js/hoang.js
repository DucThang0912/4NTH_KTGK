// Initialize AOS Animation Library
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

// Navbar scroll behavior
const navbar = document.getElementById('mainNav');
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        backToTopButton.classList.add('active');
    } else {
        navbar.classList.remove('navbar-scrolled');
        backToTopButton.classList.remove('active');
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to your backend
        console.log({name, email, subject, message});
        
        // Show success message (in a real app, you'd do this after successful submission)
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Add animation to code container in hero section
const codeContainer = document.querySelector('.code-container');
if (codeContainer) {
    const codeLines = codeContainer.querySelectorAll('code');
    
    if (codeLines.length > 0) {
        // Add a typing animation effect
        let fullText = codeLines[0].textContent;
        codeLines[0].textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < fullText.length) {
                codeLines[0].textContent += fullText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }
}