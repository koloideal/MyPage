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


