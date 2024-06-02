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

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return rect.top + rect.height / 2 <= windowHeight;
}

const skillItems = document.querySelectorAll('#skills li');

function toggleSkillItemsAnimation() {
  skillItems.forEach((item) => {
    if (isElementInViewport(item)) {
      item.classList.add('fade-in');
    } else {
      item.classList.remove('fade-in');
    }
  });
}

function toggleSkillsSectionAnimation() {
  const skillsSection = document.getElementById('skills');

  if (isElementInViewport(skillsSection)) {
    skillsSection.classList.add('fade-in');
  } else {
    skillsSection.classList.remove('fade-in');
  }
}

function toggleContactsSectionAnimation() {
  const contactsSection = document.getElementById('contact');

  if (isElementInViewport(contactsSection)) {
    contactsSection.classList.add('fade-in');
  } else {
    contactsSection.classList.remove('fade-in');
  }
}

window.addEventListener('scroll', () => {
  toggleSkillItemsAnimation();
  toggleSkillsSectionAnimation();
  toggleContactsSectionAnimation()
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
    setTimeout(() => { span.style.opacity = '1'; }, index * 50);
  });
}

const textContainer = document.getElementById('text-container');
fadeTextIn(textContainer);

toggleSkillItemsAnimation();
toggleSkillsSectionAnimation();
toggleContactsSectionAnimation()


