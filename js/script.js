// Smooth reveal animation

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});


sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});


// Current year update (footer)

const year = document.querySelector("#year");

if(year){
    year.textContent = new Date().getFullYear();
}
