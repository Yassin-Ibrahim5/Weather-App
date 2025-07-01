document.getElementById("mode").addEventListener("click", () => {
    document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    console.log(document.body.dataset.theme);
    document.getElementById("navbar-icon").src = document.body.dataset.theme === 'light' ? "images/favicon.png" : "images/favicon-dark.png";
});


document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");

    function setActiveLink() {
        let currentHash = window.location.hash || '#contact';
        navLinks.forEach((link) => {
            link.classList.remove('active');

            if (link.getAttribute("href") === currentHash) {
                link.classList.add('active');
            }
        })
    }

    setActiveLink();

    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            navLinks.forEach((l) => l.classList.remove('active'));
            this.classList.add('active');
        })
    })

    window.addEventListener("hashchange", setActiveLink)
});