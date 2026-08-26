/* =========================================================
   SHAKIL R. PORTFOLIO
   Main JavaScript
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const CONFIG = {

    /* -----------------------------------------
       IMAGE FOLDER
    ----------------------------------------- */

    imageFolder: "assets/images/",


    /* -----------------------------------------
       PROFILE IMAGE
       Rename your profile image to:

       profile.jpg
       profile.png
       profile.webp
    ----------------------------------------- */

    profileNames: [
        "profile.jpg",
        "profile.jpeg",
        "profile.png",
        "profile.webp"
    ],


    /* -----------------------------------------
       SOCIAL LINKS

       Replace these with your real URLs later.
    ----------------------------------------- */

    socials: {

        behance: "#",

        linkedin: "#",

        x: "#"

    },


    /* -----------------------------------------
       GOOGLE APPS SCRIPT

       After deploying Apps Script,
       paste your Web App URL here.
    ----------------------------------------- */

    googleScriptURL:
        "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",


    /* -----------------------------------------
       HOW MANY IMAGE SLOTS TO CHECK

       You can go beyond 20.
       40 gives plenty of room.

       B1 → B40
       W1 → W40
       etc.
    ----------------------------------------- */

    maxImages: 40

};


/* =========================================================
   IMAGE EXTENSIONS
========================================================= */

const IMAGE_EXTENSIONS = [
    "jpg",
    "jpeg",
    "png",
    "webp"
];


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initTheme();

    initNavigation();

    initProfileImage();

    initPortfolio();

    initActiveProfiles();

    initTestimonials();

    initScrollAnimations();

    initHeader();

    initBackToTop();

    initContactForm();

    initSocialLinks();

});


/* =========================================================
   THEME
========================================================= */

function initTheme() {

    const toggle =
        document.getElementById("themeToggle");

    const saved =
        localStorage.getItem("shakil-theme");


    if (saved === "light") {

        document.body.classList.add(
            "light-theme"
        );

    } else if (saved === "dark") {

        document.body.classList.remove(
            "light-theme"
        );

    } else {

        const prefersLight =
            window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches;

        document.body.classList.toggle(
            "light-theme",
            prefersLight
        );

    }


    toggle.addEventListener("click", () => {

        document.body.classList.toggle(
            "light-theme"
        );

        const isLight =
            document.body.classList.contains(
                "light-theme"
            );

        localStorage.setItem(
            "shakil-theme",
            isLight ? "light" : "dark"
        );

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

    const menuButton =
        document.getElementById(
            "mobileMenuBtn"
        );

    const mobileNav =
        document.getElementById(
            "mobileNav"
        );


    menuButton.addEventListener("click", () => {

        mobileNav.classList.toggle("open");

    });


    mobileNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav.classList.remove(
                        "open"
                    );

                }
            );

        });

}


/* =========================================================
   PROFILE IMAGE
========================================================= */

async function initProfileImage() {

    const img =
        document.getElementById(
            "profileImage"
        );

    const found =
        await findImage(
            CONFIG.profileNames
        );


    if (found) {

        img.src = found;

        img.onload = () => {

            img.classList.add("loaded");

        };

    } else {

        /*
          If profile image is missing,
          keep the frame but do not break page.
        */

        img.remove();

    }

}


/* =========================================================
   FIND IMAGE
========================================================= */

function findImage(names) {

    return new Promise(resolve => {

        let index = 0;


        function testNext() {

            if (index >= names.length) {

                resolve(null);

                return;
            }


            const name =
                names[index++];

            const img =
                new Image();


            img.onload = () => {

                resolve(
                    CONFIG.imageFolder + name
                );

            };


            img.onerror = () => {

                testNext();

            };


            img.src =
                CONFIG.imageFolder + name;

        }


        testNext();

    });

}


/* =========================================================
   FIND NUMBERED IMAGE
========================================================= */

function findNumberedImage(prefix, number) {

    return new Promise(resolve => {

        let extensionIndex = 0;


        function tryExtension() {

            if (
                extensionIndex >=
                IMAGE_EXTENSIONS.length
            ) {

                resolve(null);

                return;
            }


            const extension =
                IMAGE_EXTENSIONS[
                    extensionIndex++
                ];


            const filename =
                `${prefix}${number}.${extension}`;


            const img =
                new Image();


            img.onload = () => {

                resolve(
                    CONFIG.imageFolder +
                    filename
                );

            };


            img.onerror = () => {

                tryExtension();

            };


            img.src =
                CONFIG.imageFolder +
                filename;

        }


        tryExtension();

    });

}


/* =========================================================
   PORTFOLIO
========================================================= */

function initPortfolio() {

    const categories =
        document.querySelectorAll(
            ".portfolio-category"
        );


    categories.forEach(category => {

        const prefix =
            category.dataset.prefix;

        const description =
            category.dataset.description;

        const descriptionElement =
            category.querySelector(
                ".category-description"
            );

        const grid =
            category.querySelector(
                ".project-grid"
            );

        const button =
            category.querySelector(
                ".show-more-btn"
            );


        descriptionElement.textContent =
            description;


        loadCategoryImages(
            prefix,
            grid,
            category,
            button
        );

    });

}


/* =========================================================
   LOAD CATEGORY
========================================================= */

async function loadCategoryImages(
    prefix,
    grid,
    category,
    button
) {

    const foundImages = [];


    /*
      Check B1 → B40,
      W1 → W40,
      etc.
    */

    for (
        let number = 1;
        number <= CONFIG.maxImages;
        number++
    ) {

        const image =
            await findNumberedImage(
                prefix,
                number
            );


        if (image) {

            foundImages.push({
                number,
                image
            });

        }

    }


    /*
      No image = hide whole section
    */

    if (foundImages.length === 0) {

        category.remove();

        return;

    }


    /*
      Create cards
    */

    foundImages.forEach(
        (item, index) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "project-card";


            /*
              First 4 visible.
              Everything else hidden.
            */

            if (index >= 4) {

                card.classList.add(
                    "is-hidden"
                );

            }


            const img =
                document.createElement(
                    "img"
                );

            img.src =
                item.image;

            img.alt =
                `${prefix} design`;

            img.loading =
                index < 4
                    ? "eager"
                    : "lazy";


            const overlay =
                document.createElement(
                    "div"
                );

            overlay.className =
                "project-overlay";


            const title =
                document.createElement(
                    "strong"
                );

            title.textContent =
                getCategoryTitle(
                    prefix
                );


            const type =
                document.createElement(
                    "span"
                );

            type.textContent =
                "Selected work";


            overlay.appendChild(title);

            overlay.appendChild(type);

            card.appendChild(img);

            card.appendChild(overlay);

            grid.appendChild(card);

        }
    );


    /*
      Hide show-more button
      if 4 or fewer images
    */

    if (foundImages.length <= 4) {

        button.style.display =
            "none";

    }


    button.addEventListener(
        "click",
        () => {

            const hiddenCards =
                grid.querySelectorAll(
                    ".project-card.is-hidden"
                );


            const expanded =
                button.classList.contains(
                    "expanded"
                );


            if (!expanded) {

                hiddenCards.forEach(card => {

                    card.classList.remove(
                        "is-hidden"
                    );

                });

                button.classList.add(
                    "expanded"
                );

                button.querySelector(
                    "span"
                ).textContent =
                    "SHOW LESS";

            } else {

                const allCards =
                    grid.querySelectorAll(
                        ".project-card"
                    );


                allCards.forEach(
                    (card, index) => {

                        if (index >= 4) {

                            card.classList.add(
                                "is-hidden"
                            );

                        }

                    }
                );


                button.classList.remove(
                    "expanded"
                );

                button.querySelector(
                    "span"
                ).textContent =
                    "SHOW MORE";


                category.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


/* =========================================================
   CATEGORY TITLES
========================================================= */

function getCategoryTitle(prefix) {

    const titles = {

        B: "Book Cover Design",

        W: "Web Design & Develop",

        S: "Social Media Poster",

        L: "Logo Design",

        P: "Print Media Design"

    };


    return titles[prefix] ||
        "Selected Work";

}


/* =========================================================
   ACTIVE CLIENT PROFILES
========================================================= */

async function initActiveProfiles() {

    const track =
        document.getElementById(
            "activeTrack"
        );

    const section =
        document.querySelector(
            ".active-section"
        );


    const logos = [];


    /*
      A1 → A40

      Rename active/client logo:

      A1.png
      A2.png
      A3.png

      etc.
    */

    for (
        let number = 1;
        number <= CONFIG.maxImages;
        number++
    ) {

        const image =
            await findNumberedImage(
                "A",
                number
            );


        if (image) {

            logos.push(image);

        }

    }


    if (logos.length === 0) {

        section.remove();

        return;

    }


    /*
      Duplicate logos for
      seamless continuous loop.
    */

    const repeated =
        [
            ...logos,
            ...logos,
            ...logos
        ];


    repeated.forEach(image => {

        const item =
            document.createElement(
                "div"
            );

        item.className =
            "active-logo";


        const img =
            document.createElement(
                "img"
            );

        img.src = image;

        img.alt =
            "Client platform";


        item.appendChild(img);

        track.appendChild(item);

    });


    startActiveSlider(
        track,
        logos.length
    );

}


/* =========================================================
   ACTIVE SLIDER
========================================================= */

function startActiveSlider(
    track,
    originalCount
) {

    let position = 0;

    let paused = false;

    let direction = 1;

    let itemWidth = 145;


    const windowElement =
        document.querySelector(
            ".active-window"
        );


    const getWidth = () => {

        const first =
            track.querySelector(
                ".active-logo"
            );

        if (!first) return 145;

        const style =
            getComputedStyle(track);

        const gap =
            parseFloat(style.gap) || 0;

        return first.offsetWidth + gap;

    };


    function move(
        amount = 1
    ) {

        itemWidth =
            getWidth();

        position +=
            amount;

        track.style.transition =
            "transform .65s cubic-bezier(.2,.8,.2,1)";

        track.style.transform =
            `translateX(${-position * itemWidth}px)`;


        /*
          Infinite reset.
        */

        if (
            position >=
            originalCount
        ) {

            setTimeout(() => {

                track.style.transition =
                    "none";

                position = 0;

                track.style.transform =
                    "translateX(0)";

            }, 680);

        }


        if (position < 0) {

            track.style.transition =
                "none";

            position =
                originalCount - 1;

            track.style.transform =
                `translateX(${-position * itemWidth}px)`;

        }

    }


    let timer =
        setInterval(
            () => {

                if (!paused) {

                    move(1);

                }

            },
            2200
        );


    windowElement.addEventListener(
        "mouseenter",
        () => {

            paused = true;

        }
    );


    windowElement.addEventListener(
        "mouseleave",
        () => {

            paused = false;

        }
    );


    document
        .getElementById("activeNext")
        .addEventListener(
            "click",
            () => {

                move(1);

            }
        );


    document
        .getElementById("activePrev")
        .addEventListener(
            "click",
            () => {

                move(-1);

            }
        );


    window.addEventListener(
        "resize",
        () => {

            itemWidth =
                getWidth();

            track.style.transition =
                "none";

            track.style.transform =
                `translateX(${-position * itemWidth}px)`;

        }
    );

}


/* =========================================================
   TESTIMONIALS
========================================================= */

function initTestimonials() {

    const grid =
        document.getElementById(
            "testimonialGrid"
        );


    /*
      This is the client feedback
      supplied in your current design.

      Add more objects later if you
      have more real testimonials.
    */

    const testimonials = [

        {
            name: "Dr. Erlinda Asa Sabili",
            role: "MD, FACP",
            initials: "EA",
            text:
                "Hi Shakil! I just wanted to take a moment to sincerely thank you for the outstanding work you've done on the cover and design for my Balance Exercise for Seniors Simplified. The attention to detail, creativity, and professionalism you brought to this project truly exceeded my expectations. I've received many compliments on how beautiful and impactful the design is. It has made a big difference in the presentation of the book, and I couldn't be happier with the result. I also want you to know that I will definitely be working with you again on my upcoming projects. Your talent and reliability have made this an easy decision. Thank you once again for helping bring my vision to life. I look forward to collaborating with you on future books!"
        }

    ];


    if (
        testimonials.length === 0
    ) {

        document
            .querySelector(
                ".testimonials"
            )
            .remove();

        return;

    }


    testimonials.forEach(item => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "testimonial-card";


        card.innerHTML = `

            <div class="stars">
                ★★★★★
            </div>

            <p class="testimonial-text">
                ${item.text}
            </p>

            <div class="testimonial-author">

                <div class="author-avatar">
                    ${item.initials}
                </div>

                <div>
                    <div class="author-name">
                        ${item.name}
                    </div>

                    <div class="author-role">
                        ${item.role}
                    </div>
                </div>

            </div>

        `;


        grid.appendChild(card);

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    elements.forEach(
        element =>
            observer.observe(element)
    );

}


/* =========================================================
   HEADER SCROLL
========================================================= */

function initHeader() {

    const header =
        document.querySelector(
            ".site-header"
        );


    function update() {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }


    update();

    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backTop"
        );


    function update() {

        if (
            window.scrollY > 450
        ) {

            button.classList.add(
                "show"
            );

        } else {

            button.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    update();

}


/* =========================================================
   SOCIAL LINKS
========================================================= */

function initSocialLinks() {

    document
        .querySelectorAll(
            ".social-icon"
        )
        .forEach(link => {

            const key =
                link.dataset.social;


            if (
                CONFIG.socials[key] &&
                CONFIG.socials[key] !== "#"
            ) {

                link.href =
                    CONFIG.socials[key];

            } else {

                link.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                    }
                );

            }

        });

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );

    const status =
        document.getElementById(
            "formStatus"
        );


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const url =
                CONFIG.googleScriptURL;


            if (
                !url ||
                url.includes(
                    "PASTE_YOUR"
                )
            ) {

                status.textContent =
                    "Contact form is not connected yet.";

                return;

            }


            const submit =
                form.querySelector(
                    ".submit-btn"
                );


            submit.disabled = true;


            status.textContent =
                "Sending enquiry...";


            const data =
                new FormData(form);


            try {

                /*
                  text/plain avoids CORS
                  preflight with Apps Script.
                */

                await fetch(
                    url,
                    {

                        method: "POST",

                        mode: "no-cors",

                        body:
                            new URLSearchParams(
                                data
                            )

                    }
                );


                form.reset();


                status.textContent =
                    "Thank you. Your enquiry has been sent.";

            } catch (error) {

                console.error(error);

                status.textContent =
                    "Something went wrong. Please try again.";

            }


            submit.disabled = false;

        }
    );

}
