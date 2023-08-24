function switchThemes() {
    const body = document.querySelector("body");

    body.style.backgroundColor = (body.style.backgroundColor === "white") ? "#313131" : "white";
    body.style.color = (body.style.color === "#313131") ? "white" : "#313131";

    const links = document.querySelectorAll("a");

    for (const link of links) {
        link.style.color = (link.style.color === "black") ? "white" : "#313131";
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

function markdown() {
    const markdownBtn = document.getElementById('markdown-btn');

}