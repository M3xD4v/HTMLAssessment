document.addEventListener("DOMContentLoaded", function () {
    fetch('./footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const footerContainer = document.getElementById('footer');
            footerContainer.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    fetch('./nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const footerContainer = document.getElementById('nav');
            footerContainer.insertAdjacentHTML('beforeend', data);
            const hamburger = document.querySelector(".hamburger");
            const navLinks = document.querySelector(".nav-links");
            const links = document.querySelectorAll(".nav-links li");

            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle("open");
                links.forEach(link => {
                    link.classList.toggle("fade");
                });

                hamburger.classList.toggle("toggle");
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});