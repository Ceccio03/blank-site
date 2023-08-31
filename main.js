function updateCounters() {
    const textarea = document.getElementById('textarea');
    const counterDiv = document.getElementById('counter');
    const wordsCount = countWords(textarea.value);
    const charactersCount = countCharacters(textarea.value);

    counterDiv.textContent = `Hai scritto ${wordsCount} parole e ${charactersCount} caratteri`;
}

function countWords(text) {
    const trimmedText = text.trim();

    if (trimmedText === '') {
        return 0;
    }

    const wordsArray = trimmedText.split(/\s+/);

    return wordsArray.length;
}

function countCharacters(text) {
    const textWithoutSpaces = text.replace(/\s+/g, '');

    return textWithoutSpaces.length;
}

const textarea = document.getElementById('textarea');
textarea.addEventListener('input', updateCounters);

updateCounters();

function switchThemes() {
    const textarea = document.getElementById('textarea');
    
    if (document.body.className === 'light' && textarea.className === 'light') {
        textarea.className = 'dark';
        document.body.className = 'dark';
    } else {
        document.body.className = 'light';
        textarea.className = 'light';
    } 
}

function downloadTXT() {
    const textToSave = textarea.value;
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = "output.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
const downloadBtn = document.getElementById('download-btn');
downloadBtn.addEventListener('click', downloadTXT);

const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.addEventListener('click', toggleFullScreen);

function toggleFullScreen() {
    if (document.fullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}

function enterFullscreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {

    } else if (element.webkitRequestFullscreen) {

    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {

    } else if (document.webkitExitFullscreen) {

    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } 
}

const markdownBtn = document.getElementById('markdown-btn');
markdownBtn.addEventListener('click', toggleConversion);

let isMarkdown = true;
let originalText = '';
const md = window.markdownit();

function toggleConversion() {
    if (isMarkdown) {
        originalText = textarea.value;

        const htmlText = md.render(originalText);
        const preview = document.getElementById('preview');

        preview.innerHTML = htmlText;
        textarea.style.display = 'none';
        preview.style.display = 'block';
    } else {
        const preview = document.getElementById('preview');

        textarea.style.display = 'none';
        preview.style.display = 'block';
        textarea.value = originalText;
    }
    isMarkdown = !isMarkdown;
}

function saveLocally() {
    textarea.addEventListener('input', function (event) {
        const text = event.target.value;
        localStorage.setItem(localStorageKey, text);
    });
}

function loadLocally() {
    window.addEventListener('load', function () {
        const textSaved = this.localStorage.getItem(localStorageKey);

        if (textSaved) {
            textarea.value = textSaved;
        }
    });
}

const localStorageKey = 'Testo: ';

saveLocally();
loadLocally();