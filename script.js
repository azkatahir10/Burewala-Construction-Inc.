// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const servicesGrid = document.getElementById('servicesGrid');
const serviceSelect = document.getElementById('service');
const quoteForm = document.getElementById('quoteForm');
const currentYearSpan = document.getElementById('currentYear');

// Services Data
const services = [
    {
        name: "Decks",
        icon: "fas fa-layer-group",
        description: "Custom deck design and construction for outdoor living spaces, using quality materials for durability and aesthetics."
    },
    {
        name: "Doors",
        icon: "fas fa-door-open",
        description: "Installation and replacement of interior and exterior doors, including custom designs for perfect fit and function."
    },
    {
        name: "Cabinets",
        icon: "fas fa-archive",
        description: "Custom cabinet design and installation for kitchens, bathrooms, and storage areas with precision craftsmanship."
    },
    {
        name: "Flooring",
        icon: "fas fa-th-large",
        description: "Professional flooring installation including hardwood, laminate, tile, and vinyl for beautiful, durable surfaces."
    },
    {
        name: "Framing",
        icon: "fas fa-cube",
        description: "Structural framing services for new construction, additions, and renovations with engineering precision."
    },
    {
        name: "Garage Doors",
        icon: "fas fa-warehouse",
        description: "Installation, repair, and replacement of garage doors with modern security features and reliable operation."
    },
    {
        name: "Insulation",
        icon: "fas fa-temperature-low",
        description: "Energy-efficient insulation solutions to improve comfort and reduce energy costs in any building."
    },
    {
        name: "Kitchen and Baths",
        icon: "fas fa-sink",
        description: "Complete kitchen and bathroom remodeling services from design to installation with attention to detail."
    },
    {
        name: "Molding",
        icon: "fas fa-border-style",
        description: "Custom trim and molding installation to add architectural detail and finish to your interior spaces."
    },
    {
        name: "Painting",
        icon: "fas fa-brush",
        description: "Interior and exterior painting services with premium materials for lasting beauty and protection."
    },
    {
        name: "Power Washing",
        icon: "fas fa-water",
        description: "Professional power washing to clean exterior surfaces, decks, driveways, and siding effectively."
    },
    {
        name: "Sheetrock/Drywall",
        icon: "fas fa-th",
        description: "Drywall installation, finishing, and repair services for smooth, professional walls and ceilings."
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Populate services grid
    renderServices();
    
    // Populate service dropdown
    populateServiceDropdown();
    
    // Setup mobile menu toggle
    setupMobileMenu();
    
    // Setup form submission
    setupForm();
});

// Render services to the grid
function renderServices() {
    servicesGrid.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <div class="service-content">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
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

// Setup form submission
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
        if (!name || !email || !service) {
            alert('Please fill in all required fields: Name, Email, and Service.');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For this example, we'll just show a success message
        
        // Create a simple modal or alert
        alert(`Thank you, ${name}! Your quote request for ${service} has been received. We will contact you at ${email} within 24 hours.`);
        
        // Reset form
        quoteForm.reset();
    });
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