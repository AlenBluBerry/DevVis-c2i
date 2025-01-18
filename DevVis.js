const codeEditor = document.getElementById('codeEditor');
const generateBtn = document.querySelector('.generate-btn');
const spinner = document.querySelector('.spinner');
const outputWindow = document.querySelector('.output-window');
const outputContent = document.querySelector('.output-content');
const lineNumbers = document.querySelector('.line-numbers');

function updateLineNumbers() {
    const lines = codeEditor.value.split('\n').length;
    lineNumbers.innerHTML = Array(lines).fill(0).map((_, i) => `<div>${i + 1}</div>`).join('');
}

codeEditor.addEventListener('input', updateLineNumbers);
codeEditor.addEventListener('scroll', () => {
    lineNumbers.scrollTop = codeEditor.scrollTop;
});

generateBtn.addEventListener('click', async () => {
    const code = codeEditor.value.trim();
    if (!code) {
        alert('Please enter some code first!');
        return;
    }

    spinner.style.display = 'block';
    generateBtn.disabled = true;

    setTimeout(() => {
        spinner.style.display = 'none';
        generateBtn.disabled = false;
        outputWindow.classList.add('visible');
        
        // Corrected: Ensure the output maintains the proper formatting
        outputContent.style.whiteSpace = 'pre'; // Add white-space property
        outputContent.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }, 800);
});

updateLineNumbers();



const words = ["beautiful", "shareable"];
const typingDelay = 200;
const eraseDelay = 200;
const newLetterDelay = 200;

let index = 0;
let charIndex = 0;

// Get the reference to the element where the text will be typed
const typeTextSpan = document.getElementById("typeTextSpan");

document.addEventListener("DOMContentLoaded", () => {
  if (words.length) {
    setTimeout(type, newLetterDelay);
  }
});

function type() {
  if (charIndex < words[index].length) {
    typeTextSpan.textContent += words[index].charAt(charIndex); // Fixed textContext -> textContent and charAt() usage
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newLetterDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typeTextSpan.textContent = words[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, eraseDelay);
  } else {
    index++;
    if (index >= words.length) {
      index = 0;
    }
    setTimeout(type, typingDelay);
  }
  }
