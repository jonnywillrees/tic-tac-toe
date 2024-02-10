import './style.css'

const squareEls = document.getElementsByClassName('square');

for (let i = 0; i < squareEls.length; i++) {
    const element = squareEls[i];
    element.addEventListener('click', (_) => {
        element.classList.add('x');
    });
}
