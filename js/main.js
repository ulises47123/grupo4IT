// Espera a que todo el contenido del HTML se cargue antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {

    // Selecciona todos los elementos que queremos animar.
    // Les pondremos la clase 'fade-in' en nuestro HTML.
    const elementsToAnimate = document.querySelectorAll('.fade-in');

    // Configuración del "Intersection Observer".
    // Esto es una API moderna del navegador que es muy eficiente para detectar
    // cuándo un elemento entra en la pantalla.
    const observerOptions = {
        root: null, // Observa la ventana principal del navegador
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando al menos el 10% del elemento es visible
    };

    // Creamos el observador.
    // La función que está dentro se ejecutará cada vez que un elemento observado
    // cumpla con la condición del 'threshold'.
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento está ahora visible en la pantalla...
            if (entry.isIntersecting) {
                // ...le añadimos la clase 'visible'. El CSS se encargará de la animación.
                entry.target.classList.add('visible');
                // Dejamos de observar este elemento para no repetir la animación.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Le decimos al observador que empiece a "vigilar" cada uno de los elementos
    // que seleccionamos al principio.
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Lógica para el menú de hamburguesa
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Lógica para el filtro del portafolio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Gestionar clase activa en botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;

                // Mostrar u ocultar tarjetas de proyecto
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Lógica para la ventana modal del portafolio
    const modal = document.getElementById('project-modal');
    if (modal) {
        const closeModal = modal.querySelector('.close-modal');
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');

        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function() {
                const projectTitle = this.querySelector('h3').innerText;
                const projectCategory = this.querySelector('p').innerText;
                const projectImage = this.querySelector('img').src;
                const projectDescription = this.dataset.description;

                modalImg.src = projectImage;
                modalTitle.innerText = projectTitle;
                modalDescription.innerText = projectDescription;

                modal.style.display = 'block';
            });
        });

        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    // --- Configuración para el fondo de partículas animado ---
    tsParticles.load("particles-container", {
        background: {
            color: {
                value: "#0f0f17" // Nuestro color base
            }
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: "#7f5af0" // El color de acento para las partículas
            },
            links: {
                color: "#3b82f6", // Un color secundario para las líneas
                distance: 150,
                enable: true,
                opacity: 0.1,
                width: 1
            },
            collisions: {
                enable: true
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce"
                },
                random: false,
                speed: 1,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 80
            },
            opacity: {
                value: 0.2
            },
            shape: {
                type: "circle"
            },
            size: {
                value: { min: 1, max: 3 }
            }
        },
        detectRetina: true
    });

    // --- Lógica para el Acordeón de la Bitácora ---
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Cierra otros items abiertos para que solo uno esté abierto a la vez
            const openItem = document.querySelector('.accordion-item.active');
            if (openItem && openItem !== item) {
                openItem.classList.remove('active');
                openItem.querySelector('.accordion-content').style.maxHeight = 0;
            }

            // Abre o cierra el item actual
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = 0;
            }
        });
    });

});

// --- Lógica para activar la galería Lightbox en la Bitácora ---
// Se aplica a cualquier enlace dentro de un div con la clase .content-gallery
var lightbox = new SimpleLightbox('.content-gallery a', {
    /* Opciones opcionales para personalizar el estilo */
    captionsData: 'alt',
    captionDelay: 250,
});

// --- Lógica para el botón "Ver galería completa" ---
document.addEventListener('DOMContentLoaded', function() {
    const galleryButton = document.querySelector('.gallery-view-all');
    if (galleryButton) {
        galleryButton.addEventListener('click', function() {
            // Busca el primer enlace de la galería
            const firstImageLink = document.querySelector('.content-gallery a');
            if (firstImageLink) {
                // Simula un clic en la primera imagen para abrir la Lightbox
                firstImageLink.click();
            }
        });
    }
});