// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const servicesGrid = document.getElementById('servicesGrid');
const serviceSelect = document.getElementById('service');
const quoteForm = document.getElementById('quoteForm');
const currentYearSpan = document.getElementById('currentYear');
const gmailComposeBtn = document.getElementById('gmailCompose');

// Services Data - Updated with WhatsApp button
const services = [
    {
        name: "Decks",
        image: "media/decks.jpg",
        description: "Custom deck design and construction for outdoor living spaces, using quality materials for durability and aesthetics."
    },
    {
        name: "Doors",
        image: "media/doors.jpg",
        description: "Installation and replacement of interior and exterior doors, including custom designs for perfect fit and function."
    },
    {
        name: "Cabinets",
        image: "media/cabinets.jpg",
        description: "Custom cabinet design and installation for kitchens, bathrooms, and storage areas with precision craftsmanship."
    },
    {
        name: "Flooring",
        image: "media/flooring.jpg",
        description: "Professional flooring installation including hardwood, laminate, tile, and vinyl for beautiful, durable surfaces."
    },
    {
        name: "Framing",
        image: "media/framing.jpg",
        description: "Structural framing services for new construction, additions, and renovations with engineering precision."
    },
    {
        name: "Garage Doors",
        image: "media/garage-doors.jpg",
        description: "Installation, repair, and replacement of garage doors with modern security features and reliable operation."
    },
    {
        name: "Insulation",
        image: "media/insulation.jpg",
        description: "Energy-efficient insulation solutions to improve comfort and reduce energy costs in any building."
    },
    {
        name: "Kitchen and Baths",
        image: "media/kitchen-bathroom.jpg",
        description: "Complete kitchen and bathroom remodeling services from design to installation with attention to detail."
    },
    {
        name: "Molding",
        image: "media/molding.jpg",
        description: "Custom trim and molding installation to add architectural detail and finish to your interior spaces."
    },
    {
        name: "Painting",
        image: "media/paintings.jpg",
        description: "Interior and exterior painting services with premium materials for lasting beauty and protection."
    },
    {
        name: "Power Washing",
        image: "media/power-washing.jpg",
        description: "Professional power washing to clean exterior surfaces, decks, driveways, and siding effectively."
    },
    {
        name: "Sheetrock/Drywall",
        image: "media/SheetrockDrywall.jpg",
        description: "Drywall installation, finishing, and repair services for smooth, professional walls and ceilings."
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Populate services grid with images
    renderServices();
    
    // Populate service dropdown
    populateServiceDropdown();
    
    // Setup mobile menu toggle
    setupMobileMenu();
    
    // Setup form submission
    setupForm();
    
    // Setup Gmail compose button
    setupGmailCompose();
    
    // Add lazy loading for images
    setupLazyLoading();
});

// Render services to the grid with WhatsApp button
function renderServices() {
    servicesGrid.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        // Create WhatsApp message for this service
        const whatsappMessage = `Hello Burewala Construction! I'm interested in your ${service.name} service. Can you provide more information and a quote?`;
        const whatsappUrl = `https://wa.me/19177690332?text=${encodeURIComponent(whatsappMessage)}`;
        
        // HTML with WhatsApp button
        serviceCard.innerHTML = `
            <div class="service-image">
                <img src="${service.image}" alt="${service.name} service" loading="lazy">
            </div>
            <div class="service-content">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <a href="${whatsappUrl}" target="_blank" class="service-whatsapp-btn">
                    <i class="fab fa-whatsapp"></i>
                    Contact Now: +1 (917) 769-0332
                </a>
            </div>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
}

// Populate service dropdown in contact form
function populateServiceDropdown() {
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.name.toLowerCase();
        option.textContent = service.name;
        serviceSelect.appendChild(option);
    });
}

// Setup mobile menu functionality
function setupMobileMenu() {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Change menu icon
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Setup Gmail compose button to open compose window
function setupGmailCompose() {
    if (!gmailComposeBtn) return;
    
    gmailComposeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create Gmail compose URL with parameters for small window
        const to = 'burewalaconstructioninc@gmail.com';
        const subject = 'Construction Inquiry from Website';
        const body = `Hello Burewala Construction Team,%0A%0AI would like to inquire about your services.%0A%0ABest regards,%0A[Your Name]`;
        
        // Gmail compose URL - This opens the compose window
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${body}`;
        
        // Open in a small popup window (like Gmail's compose window)
        const windowFeatures = 'width=600,height=700,resizable=yes,scrollbars=yes,status=yes';
        
        // Try to detect if user is already logged into Gmail
        const userAgent = navigator.userAgent.toLowerCase();
        const isChrome = userAgent.indexOf('chrome') > -1;
        
        if (isChrome) {
            // For Chrome, we can try a different approach
            window.open(gmailUrl, 'GmailCompose', windowFeatures);
        } else {
            // Standard approach
            const newWindow = window.open(gmailUrl, 'GmailCompose', windowFeatures);
            
            // Focus the window if it opened
            if (newWindow) {
                newWindow.focus();
            } else {
                // If popup blocked, open in new tab
                alert('Popup was blocked. Opening Gmail in a new tab instead.');
                window.open(gmailUrl, '_blank');
            }
        }
    });
}

// Setup form submission with email sending
function setupForm() {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !service || !message) {
            alert('Please fill in all required fields: Name, Email, Service, and Message.');
            return;
        }
        
        // Create form data object
        const formData = {
            name: name,
            email: email,
            phone: phone || 'Not provided',
            service: service,
            message: message,
            timestamp: new Date().toLocaleString(),
            source: 'Website Contact Form'
        };
        
        // Show loading state
        const submitBtn = quoteForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Option 1: Open Gmail compose window with form data (Recommended)
        openGmailComposeWithFormData(formData, submitBtn, originalText);
        
        // Option 2: Use EmailJS (if configured)
        // sendEmailWithEmailJS(formData, submitBtn, originalText);
    });
}

// Function to open Gmail compose window with form data
function openGmailComposeWithFormData(formData, submitBtn, originalText) {
    // Create email content
    const to = 'burewalaconstructioninc@gmail.com';
    const subject = `Quote Request: ${formData.service}`;
    const body = `
Hello Burewala Construction Team,

I would like to request a quote for your ${formData.service} service.

My Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

Project Details:
${formData.message}

Submitted on: ${formData.timestamp}
From: Website Contact Form
    `;
    
    // Encode for URL
    const encodedSubject = encodeURIComponent(subject.trim());
    const encodedBody = encodeURIComponent(body.trim());
    
    // Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodedSubject}&body=${encodedBody}`;
    
    // Window features for small compose window
    const windowFeatures = 'width=600,height=700,resizable=yes,scrollbars=yes,status=yes,left=' + 
                          (window.screen.width - 600) / 2 + ',top=' + (window.screen.height - 700) / 2;
    
    // Ask user for confirmation
    const userConfirmed = confirm(`Thank you, ${formData.name}! We're opening Gmail to send your quote request. Click OK to continue.`);
    
    if (userConfirmed) {
        // Try to open in small popup window
        const composeWindow = window.open(gmailUrl, 'GmailCompose', windowFeatures);
        
        if (composeWindow) {
            // Success - window opened
            composeWindow.focus();
            
            // Reset form after a short delay
            setTimeout(() => {
                quoteForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                alert('Your quote request has been prepared in Gmail. Please review and send the email to complete your request.');
            }, 1000);
        } else {
            // Popup blocked - open in new tab
            alert('Popup was blocked. Opening Gmail in a new tab instead.');
            window.open(gmailUrl, '_blank');
            
            // Reset form
            quoteForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            alert('Please send the pre-filled email from Gmail to complete your quote request.');
        }
    } else {
        // User cancelled
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Function to send email using EmailJS (alternative method)
function sendEmailWithEmailJS(formData, submitBtn, originalText) {
    // Initialize EmailJS if available
    if (typeof emailjs === 'undefined') {
        // Fallback to Gmail compose
        openGmailComposeWithFormData(formData, submitBtn, originalText);
        return;
    }
    
    // EmailJS configuration (update these with your actual credentials)
    const emailjsConfig = {
        serviceId: 'YOUR_SERVICE_ID',
        templateId: 'YOUR_TEMPLATE_ID',
        userId: 'YOUR_USER_ID',
        companyEmail: 'burewalaconstructioninc@gmail.com'
    };
    
    // Initialize EmailJS if not already initialized
    if (!window.emailjsInitialized) {
        emailjs.init(emailjsConfig.userId);
        window.emailjsInitialized = true;
    }
    
    // Prepare email parameters
    const templateParams = {
        to_email: emailjsConfig.companyEmail,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        timestamp: formData.timestamp
    };
    
    // Send email using EmailJS
    emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            
            // Show success message
            alert(`Thank you, ${formData.name}! Your quote request for "${formData.service}" has been sent successfully. We will contact you at ${formData.email} within 24 hours.`);
            
            // Reset form
            quoteForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        })
        .catch(function(error) {
            console.error('Email sending failed:', error);
            
            // Fallback to Gmail compose
            alert('Automatic email sending failed. Opening Gmail instead...');
            openGmailComposeWithFormData(formData, submitBtn, originalText);
        });
}

// Setup lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Account for fixed header
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

// Debug function to check if images are loading
function checkImageLoading() {
    console.log("Checking images...");
    services.forEach(service => {
        const img = new Image();
        img.onload = function() {
            console.log(`✓ ${service.name} image loaded successfully: ${service.image}`);
        };
        img.onerror = function() {
            console.error(`✗ ${service.name} image failed to load: ${service.image}`);
        };
        img.src = service.image;
    });
}

// Call the debug function after a short delay
setTimeout(checkImageLoading, 1000);