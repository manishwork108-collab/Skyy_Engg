const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const form = document.querySelector('#project-form');
const formNote = document.querySelector('#form-note');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
});

function closeMenu() {
  menuToggle.classList.remove('active');
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}

menuToggle.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  menuToggle.classList.toggle('active', open);
  nav.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.dataset.tab;
    tabButtons.forEach((item) => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-selected', item === button ? 'true' : 'false');
    });
    tabPanels.forEach((panel) => panel.classList.toggle('active', panel.id === id));
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const requiredFields = form.querySelectorAll('[required]');
  let valid = true;

  requiredFields.forEach((field) => {
    field.classList.remove('invalid');
    if (!field.value.trim() || (field.type === 'email' && !field.validity.valid)) {
      field.classList.add('invalid');
      valid = false;
    }
  });

  if (!valid) {
    formNote.textContent = 'Please complete the required fields before sending.';
    formNote.classList.remove('success');
    return;
  }

  formNote.textContent = 'Front-end check complete. Your backend can now be connected here to store and send enquiries.';
  formNote.classList.add('success');
});

form.addEventListener('input', (event) => {
  if (event.target.matches('input, select, textarea')) event.target.classList.remove('invalid');
});

document.querySelector('#year').textContent = new Date().getFullYear();
