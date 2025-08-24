/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /*========== sticky navbar ==========*/
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*========== remove menu icon navbar when click navbar link (scroll) ==========*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*========== swiper ==========*/
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};

/*========== scroll reveal ==========*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

/*========== contact form handling ==========*/
const contactForm = document.querySelector('.contact form');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const phoneInput = document.querySelector('input[name="phone"]');
const subjectInput = document.querySelector('input[name="subject"]');
const messageInput = document.querySelector('textarea[name="message"]');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Create mailto link with form data
        const subject = subjectInput.value || 'Contact from Portfolio Website';
        const body = `Name: ${nameInput.value}%0D%0A` +
                    `Email: ${emailInput.value}%0D%0A` +
                    `Phone: ${phoneInput.value}%0D%0A%0D%0A` +
                    `Message:%0D%0A${messageInput.value}`;
        
        const mailtoLink = `mailto:rohitjeevanrathore@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        setTimeout(() => {
            alert('Thank you for your message! Your default email client should open now.');
        }, 100);
    });
}

/*========== smooth scrolling for navigation links ==========*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    });
});

/*========== typing animation effect ==========*/
const typed = document.querySelector('.home-content h1');
if (typed) {
    const textArray = ['Rohit Rathore', 'Full Stack Developer', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function typeEffect() {
        if (textIndex < textArray.length) {
            if (!isDeleting && charIndex < textArray[textIndex].length) {
                currentText += textArray[textIndex].charAt(charIndex);
                typed.textContent = currentText;
                charIndex++;
                setTimeout(typeEffect, 100);
            } else if (isDeleting && charIndex > 0) {
                currentText = textArray[textIndex].substring(0, charIndex - 1);
                typed.textContent = currentText;
                charIndex--;
                setTimeout(typeEffect, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    textIndex++;
                    if (textIndex >= textArray.length) {
                        textIndex = 0;
                    }
                }
                setTimeout(typeEffect, 1000);
            }
        }
    }

    // Start typing effect after page load
    setTimeout(typeEffect, 2000);
}

/*========== portfolio project links ==========*/
const portfolioLinks = {
    'Developer Hub': 'https://developers-hub-pzqx.vercel.app',
    'Car Rental Web App': 'https://rental-car-app-rho.vercel.app',
    'Fitness AI Coach': 'https://fitness-ai-mu.vercel.app'
};

// Add click tracking for portfolio items
document.querySelectorAll('.portfolio-box').forEach(box => {
    const link = box.querySelector('.portfolio-layer a');
    const title = box.querySelector('.portfolio-layer h4').textContent;
    
    if (link && portfolioLinks[title]) {
        link.href = portfolioLinks[title];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }
});

/*========== preloader ==========*/
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

/*========== back to top button functionality ==========*/
const backToTopButton = document.querySelector('.footer-iconTop a');
if (backToTopButton) {
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*========== skill progress animation ==========*/
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 500);
    });
}

// Trigger skill animation when skills section is in view
const skillsSection = document.querySelector('.testimonial-container');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    });
    observer.observe(skillsSection);
}