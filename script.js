document.addEventListener('DOMContentLoaded', () => {
  // Tema oscuro/claro
  const toggleButton = document.getElementById('modo-oscuro-toggle');
  const body = document.body;

  // Verificar si hay una preferencia guardada
  const darkModePreference = localStorage.getItem('darkMode');
  if (darkModePreference === 'true') {
    body.classList.add('modo-oscuro');
    toggleButton.src = 'imagenes/claro.png';
  }

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('modo-oscuro');

    if (body.classList.contains('modo-oscuro')) {
      toggleButton.src = 'imagenes/claro.png'; // ícono para modo claro
      localStorage.setItem('darkMode', 'true');
    } else {
      toggleButton.src = 'imagenes/oscuro.png'; // ícono para modo oscuro
      localStorage.setItem('darkMode', 'false');
    }
  });

  // Revelar elementos al hacer scroll
  const revelarElementos = () => {
    const elementos = document.querySelectorAll('.seccion, .principal, .tecno, .proy, #contacto');
    
    elementos.forEach(elemento => {
      const windowHeight = window.innerHeight;
      const elementoTop = elemento.getBoundingClientRect().top;
      const elementoVisible = 150;
      
      if (elementoTop < windowHeight - elementoVisible) {
        elemento.classList.add('reveal', 'active', 'visible');
      }
    });
  };

  // Añadir clase reveal a todos los elementos animables
  const elementos = document.querySelectorAll('.seccion, .principal, .tecno, .proy, #contacto');
  elementos.forEach(elemento => {
    elemento.classList.add('reveal');
  });

  // Configuración del modal de CV
  const modal = document.getElementById('videoModal');
  const cvButton = document.getElementById('cvButton');
  const span = document.getElementsByClassName('close')[0];
  const video = document.getElementById('cvVideo');

  if (cvButton && modal && span && video) {
    cvButton.addEventListener('click', () => {
      modal.style.display = 'block';
      video.play();
    });

    span.addEventListener('click', () => {
      modal.style.display = 'none';
      video.pause();
      video.currentTime = 0;
    });

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  // Animación de navegación suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animación del header al hacer scroll
  const header = document.querySelector('header');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.style.background = body.classList.contains('modo-oscuro') ? 
        'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = body.classList.contains('modo-oscuro') ? 
        '#1e1e1e' : 'white';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollY = currentScrollY;
    
    // Llamar a revelarElementos para las animaciones de scroll
    revelarElementos();
  });

  // Ejecutar revelarElementos al cargar para mostrar elementos iniciales
  revelarElementos();


   // Animación de barras de habilidades simplificada
   const skillLevels = {
    'HTML': '70%',
    'CSS': '50%',
    'JavaScript': '40%',
    'C#': '30%',
    'C++': '30%',
    'Java': '40%',
    'Kotlin': '30%',
    'SQL Server': '10%',
    'Visual Studio': '70%',
    'VS Code': '80%',
    'Sublime Text': '20%'
  };

  // Función para iniciar la animación cuando el elemento sea visible
  const animateSkillBars = () => {
    document.querySelectorAll('.lan').forEach(lanElement => {
      const skillName = lanElement.getAttribute('data-skill');
      const skillBar = lanElement.querySelector('.skill-level');
  
      if (skillBar && skillName && skillLevels[skillName]) {
        const rect = lanElement.getBoundingClientRect();
        const isVisible = (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        );
  
        if (isVisible && !skillBar.classList.contains('animated')) {
          skillBar.style.width = '0%';
          skillBar.classList.add('animated');
  
          let start = 0;
          const end = parseInt(skillLevels[skillName]);
          const duration = 1000; // milisegundos
          const increment = end / (duration / 10);
  
          const interval = setInterval(() => {
            if (start >= end) {
              skillBar.style.width = end + '%';
              clearInterval(interval);
            } else {
              start += increment;
              skillBar.style.width = `${start.toFixed(1)}%`;
            }
          }, 10);
        }
      }
    });
  };
  
  // Ejecutar la animación al cargar y al hacer scroll
  animateSkillBars();
  window.addEventListener('scroll', animateSkillBars);

});

  // Animación de entrada inicial
  document.querySelectorAll('.lan, .project-info').forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '0';
      element.style.animation = 'fadeInUp 0.6s forwards';
      element.style.animationDelay = `${index * 0.1}s`;
    }, 500);
  });

  // Animación para las imágenes
  const observerImgs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
      }
    });
  });

  document.querySelectorAll('.project-img, .yo-image, .seccion-img').forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observerImgs.observe(img);
  });

  // Efecto de typing para el banner
  const bannerTitle = document.querySelector('.banner-title');
  const bannerSubtitle = document.querySelector('.banner-subtitle');
  
  if (bannerTitle && bannerSubtitle) {
    const titleText = bannerTitle.textContent;
    const subtitleText = bannerSubtitle.textContent;
    
    bannerTitle.textContent = '';
    bannerSubtitle.textContent = '';
    
    let titleIndex = 0;
    
    const typeTitle = () => {
      if (titleIndex < titleText.length) {
        bannerTitle.textContent += titleText.charAt(titleIndex);
        titleIndex++;
        setTimeout(typeTitle, 50);
      } else {
        typeSubtitle();
      }
    };
    
    let subtitleIndex = 0;
    
    const typeSubtitle = () => {
      if (subtitleIndex < subtitleText.length) {
        bannerSubtitle.textContent += subtitleText.charAt(subtitleIndex);
        subtitleIndex++;
        setTimeout(typeSubtitle, 30);
      }
    };
    
    setTimeout(typeTitle, 500);
  }

  // Botón volver arriba
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
        backToTopButton.style.opacity = '1';
      } else {
        backToTopButton.style.opacity = '0';
        setTimeout(() => {
          if (window.scrollY <= 300) {
            backToTopButton.style.display = 'none';
          }
        }, 300);
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Efecto hover para proyectos
  const projectImgContainers = document.querySelectorAll('.project-img-container');
  
  projectImgContainers.forEach(container => {
    const overlay = container.querySelector('.project-overlay');
    
    container.addEventListener('mouseenter', () => {
      overlay.style.opacity = '1';
    });
    
    container.addEventListener('mouseleave', () => {
      overlay.style.opacity = '0';
    });
  });

  // Inicializar formulario de contacto
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Aquí podrías añadir la lógica para enviar el formulario
      alert('Gracias por tu mensaje. Te contactaremos pronto.');
      contactForm.reset();
    });
  }

  // Agregar efecto a la navegación
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.hash;
  
  navLinks.forEach(link => {
    // Marcar enlace activo basado en el hash actual
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active-link');
    }
    
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active-link'));
      this.classList.add('active-link');
    });
  });
