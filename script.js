const menuLinks = document.querySelectorAll('.menu a');

for (let link of menuLinks) {
  link.addEventListener('click', smoothScroll);
}

function smoothScroll(event) {
  event.preventDefault();

  const targetId = this.href.substring(this.href.indexOf('#'));
  const targetElement = document.querySelector(targetId);

  const targetPosition = targetElement.offsetTop;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

const skillItems = document.querySelectorAll('#skills li');

const toggleSectionAnimation = (id) => {
  const section = document.getElementById(id);

  if (section) {
    const rect = section.getBoundingClientRect();

    if (rect.y <= window.scrollY && rect.bottom * 2 >= window.scrollY) {
      section.classList.add('fade-in');
    } else {
      section.classList.remove('fade-in');
    }
  }

  return false;
};

window.addEventListener('scroll', () => {
  toggleSectionAnimation('skills');
  toggleSectionAnimation('contact');
});

function fadeTextIn(element) {
  const paragraphs = element.getElementsByTagName('p');
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const text = paragraph.innerText;

    paragraph.innerHTML = '';

    for (let j = 0; j < text.length; j++) {
      const span = document.createElement('span');
      span.innerText = text.charAt(j);
      span.classList.add('fad-in');
      paragraph.appendChild(span);
    }
  }

  const spanArray = Array.from(element.getElementsByTagName('span'));
  spanArray.forEach((span, index) => {
    setTimeout(() => { span.style.opacity = '1'; }, index * 20);
  });
}

const textContainer = document.getElementById('text-container');
fadeTextIn(textContainer);


