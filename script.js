document.getElementById('clickMeBtn').addEventListener('click', () => {
    const message = document.getElementById('message');
    message.textContent = "Thanks for visiting my site! Deployed via GitHub Actions & AWS S3.";
    message.style.color = "green";
});
