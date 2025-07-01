document.getElementById("mode").addEventListener("click", () => {
    document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    document.getElementById("hours-carousel").classList.toggle("carousel-dark");
    console.log(document.body.dataset.theme);
    document.getElementById("navbar-icon").src = document.body.dataset.theme === 'light' ? "images/favicon.png" : "images/favicon-dark.png";
});

