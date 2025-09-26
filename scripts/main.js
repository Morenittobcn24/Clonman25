document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            // Obtener el target
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Actualizar navegación activa en scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Animaciones de entrada para las tarjetas
    observeCards();
    
    // Verificar disponibilidad de aplicaciones
    checkAppAvailability();
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function observeCards() {
    const cards = document.querySelectorAll('.app-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

async function checkAppAvailability() {
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach(async card => {
        const link = card.querySelector('a[href*=".html"]');
        if (link) {
            const href = link.getAttribute('href');
            
            try {
                const response = await fetch(href, { method: 'HEAD' });
                if (!response.ok) {
                    // Marcar como no disponible
                    card.classList.add('app-unavailable');
                    link.style.opacity = '0.5';
                    link.style.pointerEvents = 'none';
                    
                    const badge = document.createElement('span');
                    badge.className = 'tag';
                    badge.textContent = 'En desarrollo';
                    badge.style.background = '#ffc107';
                    badge.style.color = '#000';
                    
                    const tagsContainer = card.querySelector('.app-tags');
                    if (tagsContainer) {
                        tagsContainer.appendChild(badge);
                    }
                }
            } catch (error) {
                console.log(`App ${href} no disponible:`, error);
            }
        }
    });
}

// Función para mostrar estadísticas animadas
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (target === 100 ? '%' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (target === 100 ? '%' : '');
            }
        }, 20);
    });
}

// Observar sección about para animar estadísticas
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}
