const links = [...document.querySelectorAll('nav a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));

const setActive = () => {
  const y = window.scrollY + 84; 
  let activeIndex = 0;
  sections.forEach((sec, i) => {
    if (sec && sec.offsetTop <= y) activeIndex = i;
  });
  links.forEach(l => l.classList.remove('active'));
  links[activeIndex]?.classList.add('active');
};
window.addEventListener('scroll', setActive);
window.addEventListener('load', setActive);


links.forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(id);
      window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' });
    }
  });
});

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const sendBtn = document.getElementById('sendBtn');

const TO_EMAIL = form.dataset.to || 'ddanya873@gmail.com';

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()){
    note.textContent = 'Please fill out all required fields correctly.';
    note.style.color = '#ffd2d2';
    return;
  }

  const name    = form.elements['name']?.value.trim()   || '';
  const email   = form.elements['email']?.value.trim()  || '';
  const phone   = form.elements['phone']?.value.trim()  || '';
  const message = form.elements['message']?.value.trim()|| '';

  const subject = `Portfolio contact from ${name || 'Unknown'}`;
  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n\n` +
    `Message:\n${message}`;

  const mailtoURL = `mailto:${encodeURIComponent(TO_EMAIL)}`
    + `?subject=${encodeURIComponent(subject)}`
    + `&body=${encodeURIComponent(body)}`;

  
  window.location.href = mailtoURL;

  
  note.textContent = 'Your email app should open with the message pre-filled.';
  note.style.color = '#e8e9f1';
});



document.getElementById('year').textContent = new Date().getFullYear();

