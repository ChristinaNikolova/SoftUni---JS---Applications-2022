const errorBoxDivElement = document.getElementById('errorBox');
const messageSpanElement = errorBoxDivElement.querySelector('span');

export function notification(message) {
    errorBoxDivElement.style.display = 'block';
    messageSpanElement.textContent = message;

    setTimeout(() => {
        errorBoxDivElement.style.display = 'none';
    }, 3000);
}