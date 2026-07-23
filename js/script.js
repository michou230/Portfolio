const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const revealItems = document.querySelectorAll('.reveal');
const contactButton = document.querySelector('#contactButton');

function markActivePage() {
  const links = document.querySelectorAll('.nav-links a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('#')) {
      // single-page anchor on index
      link.classList.toggle('active', window.location.hash === href || (path === 'index.html' && href === '#home'));
    } else {
      const file = href.split('/').pop();
      link.classList.toggle('active', file === path || (path === '' && file === 'index.html'));
    }
  });
}

function handleScrollSpy() {
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPosition >= top && scrollPosition < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

function createRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupMobileToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');

  toggle?.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.topbar')) {
      menu.classList.remove('active');
    }
  });
}

function startTypingEffect() {
  const lines = [
    'Computer Science',
    'Game Dev',
    'Coding & programming',
    'Technology'
  ];
  let lineIndex = 0;
  let charIndex = 0;
  const typingElement = document.querySelector('#typeEffect');
  const cursor = document.querySelector('#typingCursor');

  if (!typingElement || !cursor) return;

  function type() {
    const currentText = lines[lineIndex];
    typingElement.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      setTimeout(() => {
        erase();
      }, 1800);
      return;
    }
    setTimeout(type, 90);
  }

  function erase() {
    const currentText = lines[lineIndex];
    typingElement.textContent = currentText.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      lineIndex = (lineIndex + 1) % lines.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(erase, 60);
  }

  type();
  setInterval(() => cursor.classList.toggle('blink'), 500);
}

function initContactButton() {
  contactButton?.addEventListener('click', () => {
    const message = document.createElement('div');
    message.className = 'pulse-notification';
    message.textContent = 'Coming soon...';
    document.body.appendChild(message);

    setTimeout(() => {
      message.classList.add('visible');
    }, 20);

    setTimeout(() => {
      message.classList.remove('visible');
      setTimeout(() => message.remove(), 300);
    }, 2400);
  });
}

function setActivenav() {
  let currentPath = window.location.pathname;

  let currentPage = currentPath.split("/").pop().split("#")[0].split("?")[0];
  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  const links = document.querySelectorAll(".nav-links a");
  
  links.forEach(link => {
    const rawHref = link.getAttribute("href");
    if (!rawHref) return;

    const cleanHref = rawHref.split("/").pop().split("#")[0].split("?")[0];

    link.classList.remove("active");

    if (cleanHref === currentPage) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  //loads header
  if (document.getElementById("header-placeholder")) {
    loadHeader();
  }

  //loads footer
  if (document.getElementById("footer-placeholder")) {
    loadFooter();
  }
});

function loadFooter(){
  fetch("footer.html").then(response => response.text()).then(data => {const footerrContainer = document.getElementById("footer-placeholder").innerHTML = data;
  })
  .catch(error => console.error("Error loading footer:", error));
}

function loadHeader(){
  fetch("header.html").then(response => response.text()).then(data => {const headerContainer = document.getElementById("header-placeholder")
    if(headerContainer){
      headerContainer.innerHTML = data;
      setActivenav();
      setupMobileToggle();
      headerContainer.style.opacity = "1";
    }    
  })
  .catch(error => console.error("Error loading header:", error));
}

window.addEventListener('scroll', handleScrollSpy);
window.addEventListener('load', () => {
  handleScrollSpy();
  createRevealObserver();
  startTypingEffect();
  initContactButton();
  markActivePage();
});
