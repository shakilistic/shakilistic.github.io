/* =========================================================
   SHAKILISTIC PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const $ = (selector, element = document) =>
        element.querySelector(selector);

    const $$ = (selector, element = document) =>
        [...element.querySelectorAll(selector)];


    /* =====================================================
       SOCIAL LINKS
    ===================================================== */

    const socialLinks = [
        {
            name: "Behance",
            url: "https://www.behance.net/shakilistic",
            icon: "https://cdn.simpleicons.org/behance"
        },
        {
            name: "X",
            url: "https://x.com/shakilistic",
            icon: "https://cdn.simpleicons.org/x"
        },
        {
            name: "Pinterest",
            url: "https://www.pinterest.com/shakilistic/",
            icon: "https://cdn.simpleicons.org/pinterest"
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/shakilistic/",
            icon: "https://cdn.simpleicons.org/linkedin"
        },
        {
            name: "GitHub",
            url: "https://github.com/shakilistic",
            icon: "https://cdn.simpleicons.org/github"
        },
        {
            name: "Dribbble",
            url: "https://dribbble.com/shakilistic",
            icon: "https://cdn.simpleicons.org/dribbble"
        }
    ];


    const socialsContainer = $("#socials");

    if (socialsContainer) {

        socialsContainer.innerHTML = socialLinks.map(link => {

            return `
                <a
                    class="social"
                    href="${link.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="${link.name}"
                    title="${link.name}"
                >
                    <img
                        src="${link.icon}"
                        alt="${link.name}"
                    >
                </a>
            `;

        }).join("");

    }


    /* =====================================================
       THEME
       Automatically follows OS theme.
       Manual button intentionally disabled/hidden.
    ===================================================== */

    const body = document.body;
    const themeButton = $("#themeToggle");

    const systemTheme = window.matchMedia(
        "(prefers-color-scheme: light)"
    );


    function applySystemTheme() {

        if (systemTheme.matches) {
            body.classList.add("light");
        } else {
            body.classList.remove("light");
        }

    }


    applySystemTheme();


    systemTheme.addEventListener(
        "change",
        applySystemTheme
    );


    /*
       Keep the button visually present if required by the
       existing design, but theme always follows system.
    */

    if (themeButton) {

        themeButton.setAttribute(
            "aria-label",
            "Theme follows system preference"
        );

        themeButton.addEventListener(
            "click",
            () => {
                /*
                   Intentionally no manual theme switching.
                   Theme follows operating system/browser.
                */
            }
        );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton = $("#menuBtn");
    const mainNav = $(".main-nav");

    if (menuButton && mainNav) {

        menuButton.addEventListener(
            "click",
            () => {

                mainNav.classList.toggle("open");

            }
        );


        $$(".main-nav a").forEach(link => {

            link.addEventListener(
                "click",
                () => {
                    mainNav.classList.remove("open");
                }
            );

        });

    }


    /* =====================================================
       PORTFOLIO IMAGE LOADING
       
       Naming:
       B1, B2, B3...
       W1, W2, W3...
       S1, S2, S3...
       L1, L2, L3...
       P1, P2, P3...

       Location:
       assets/images/
    ===================================================== */

    const extensions = [
        "jpg",
        "jpeg",
        "png",
        "webp"
    ];


    function findImage(prefix, number) {

        return new Promise(resolve => {

            let index = 0;

            function tryNext() {

                if (index >= extensions.length) {
                    resolve(null);
                    return;
                }

                const extension =
                    extensions[index++];

                const src =
                    `./assets/images/${prefix}${number}.${extension}`;

                const image =
                    new Image();

                image.onload = () => {

                    resolve(src);

                };

                image.onerror = () => {

                    tryNext();

                };

                image.src = src;

            }

            tryNext();

        });

    }


    async function loadPortfolioSection(section) {

        const gallery =
            $(".gallery", section);

        if (!gallery) return;


        const prefix =
            section.dataset.prefix;


        const sources = [];


        /*
           Search sequentially until there are 3 consecutive
           missing numbers after at least one valid image.

           This supports:
           B1
           B2
           B3
           B4
           ...
        */

        let emptyCount = 0;

        for (
            let number = 1;
            number <= 100;
            number++
        ) {

            const src =
                await findImage(
                    prefix,
                    number
                );


            if (src) {

                sources.push(src);

                emptyCount = 0;

            } else {

                emptyCount++;

                /*
                   Allows missing numbers without destroying
                   the section too early.
                */

                if (
                    sources.length > 0 &&
                    emptyCount >= 3
                ) {
                    break;
                }

            }

        }


        /*
           No images = automatically hide entire section.
        */

        if (sources.length === 0) {

            section.style.display = "none";

            return;

        }


        sources.forEach(
            (src, index) => {

                const card =
                    document.createElement("div");

                card.className =
                    "gallery-card";


                const image =
                    document.createElement("img");

                image.src = src;

                image.alt =
                    "Portfolio work";

                image.loading =
                    index < 3
                        ? "eager"
                        : "lazy";


                /*
                   Clicking does NOTHING.
                   No new window.
                   No full-screen image.
                */

                card.appendChild(image);

                gallery.appendChild(card);

            }
        );


        setupPortfolioCarousel(
            section
        );

    }


    /* =====================================================
       PORTFOLIO CAROUSEL
       
       First 3 visible on desktop.
       Mobile automatically shows 1.
       More than 3 = arrows.
       3 or less = arrows hidden.
    ===================================================== */

    function setupPortfolioCarousel(section) {

        const gallery =
            $(".gallery", section);

        const cards =
            $$(".gallery-card", gallery);

        const previous =
            $(".prev", section);

        const next =
            $(".next", section);


        if (!gallery || cards.length === 0) {
            return;
        }


        let currentIndex = 0;


        function visibleCount() {

            if (window.innerWidth <= 800) {
                return 1;
            }

            return 3;

        }


        function render() {

            const count =
                visibleCount();


            cards.forEach(card => {

                card.style.display =
                    "none";

            });


            for (
                let i = 0;
                i < count;
                i++
            ) {

                const index =
                    (currentIndex + i) %
                    cards.length;

                cards[index].style.display =
                    "block";

            }


            /*
               Arrow only when more than 3
               desktop items exist.
            */

            if (
                cards.length >
                3
            ) {

                section.classList.add(
                    "has-more"
                );

            } else {

                section.classList.remove(
                    "has-more"
                );

            }

        }


        if (previous) {

            previous.addEventListener(
                "click",
                () => {

                    currentIndex--;

                    if (
                        currentIndex < 0
                    ) {

                        currentIndex =
                            Math.max(
                                cards.length - visibleCount(),
                                0
                            );

                    }

                    render();

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                () => {

                    currentIndex++;

                    if (
                        currentIndex >=
                        cards.length
                    ) {

                        currentIndex = 0;

                    }

                    render();

                }
            );

        }


        render();


        window.addEventListener(
            "resize",
            render
        );

    }


    /* =====================================================
       LOAD ALL PORTFOLIO SECTIONS
    ===================================================== */

    $$(".image-section").forEach(
        section => {

            loadPortfolioSection(
                section
            );

        }
    );


    /* =====================================================
       CLIENT FEEDBACK
    ===================================================== */

    const clients = [

        {
            text:
                "Hi Shakil, I just wanted to take a moment to sincerely thank you for the outstanding work you've done on the cover and design for my Balance Exercise for Seniors book. The attention to detail, creativity, and professionalism you brought to this project truly exceeded my expectations. I've received many compliments on how beautiful and impactful the design is. It has made a big difference in the presentation of the book, and I couldn't be happier with the result. I also want you to know that I will definitely be working with you again on my upcoming projects. Your talent and reliability have made this an easy decision. Thank you once again for helping bring my vision to life.",
            name:
                "Dr. Erlinda Asa Sabili, MD, FACP"
        },

        {
            text:
                "Shakil is so easy to work with, responsive, and has a fantastic eye. This is our second project together, and it's getting better and better.",
            name:
                "Client"
        },

        {
            text:
                "I am so pleased with my designer. They had creative ideas that were not quite like the rest in my niche. I look forward to working with this designer in the future.",
            name:
                "Juliekearl"
        },

        {
            text:
                "The best of the best — I've worked with Shakil for around a year now, give or take. He is one of the most helpful, responsive, and creatively quick freelancers I've ever worked with.",
            name:
                "Anonymous Client"
        },

        {
            text:
                "Shakil is the best designer I've had on Fiverr. His work is always thoughtful, professional and creative. He understands what the project needs and delivers excellent results.",
            name:
                "Client"
        },

        {
            text:
                "Shakil is a fantastic designer and communicator. He understands the brief quickly and delivers polished work. Working with him is always smooth and professional.",
            name:
                "Client"
        },

        {
            text:
                "Working with Shakil was easy and professional. The results were exactly what I needed and the communication throughout the project was excellent.",
            name:
                "Client"
        },

        {
            text:
                "The design was beautiful, clean and professional. Shakil understood my vision and made it better. I would definitely recommend working with him.",
            name:
                "Anonymous Client"
        },

        {
            text:
                "Shakil always brings a strong creative eye to the project. He is responsive, reliable and genuinely cares about the final result.",
            name:
                "Client"
        },

        {
            text:
                "I am very happy with the quality of the work. Shakil delivered exactly what I was looking for and made the whole process very easy.",
            name:
                "Client"
        }

    ];


    const clientTrack =
        $("#clientTrack");


    if (clientTrack) {

        clientTrack.innerHTML =
            clients.map(client => {

                return `
                    <article class="client-card">

                        <div class="stars">
                            ★★★★★
                        </div>

                        <p>
                            ${client.text}
                        </p>

                        <small>
                            — ${client.name}
                        </small>

                    </article>
                `;

            }).join("");

    }


    /* =====================================================
       CLIENT SLIDER
       
       Automatic.
       Stops when mouse is over it.
       No arrows.
    ===================================================== */

    const clientSection =
        $("#clients");


    let clientIndex = 0;

    let clientTimer = null;


    function clientVisibleCount() {

        if (
            window.innerWidth <= 700
        ) {

            return 1;

        }

        if (
            window.innerWidth <= 1050
        ) {

            return 2;

        }

        return 4;

    }


    function renderClients() {

        if (!clientTrack) return;


        const cards =
            $$(".client-card", clientTrack);


        if (
            cards.length === 0
        ) {
            return;
        }


        const count =
            clientVisibleCount();


        cards.forEach(
            card => {

                card.style.display =
                    "none";

            }
        );


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const index =
                (clientIndex + i) %
                cards.length;

            cards[index].style.display =
                "flex";

        }

    }


    function nextClients() {

        if (!clientTrack) return;


        const cards =
            $$(".client-card", clientTrack);


        if (
            cards.length === 0
        ) {
            return;
        }


        clientIndex++;


        if (
            clientIndex >=
            cards.length
        ) {

            clientIndex = 0;

        }


        renderClients();

    }


    function startClientSlider() {

        if (clientTimer) {
            clearInterval(clientTimer);
        }


        clientTimer =
            setInterval(
                nextClients,
                3500
            );

    }


    function stopClientSlider() {

        if (clientTimer) {

            clearInterval(
                clientTimer
            );

            clientTimer = null;

        }

    }


    if (
        clientSection &&
        clientTrack
    ) {

        renderClients();

        startClientSlider();


        clientSection.addEventListener(
            "mouseenter",
            stopClientSlider
        );


        clientSection.addEventListener(
            "mouseleave",
            startClientSlider
        );


        window.addEventListener(
            "resize",
            () => {

                renderClients();

            }
        );

    }


    /* =====================================================
       ACTIVE PLATFORM LOGOS
       
       No links.
       Clicking does nothing.
       Continuous automatic loop.
       Stops on mouse hover.
    ===================================================== */

    const platforms = [

        {
            name: "Upwork",
            image:
                "https://cdn.simpleicons.org/upwork"
        },

        {
            name: "Fiverr",
            image:
                "https://cdn.simpleicons.org/fiverr"
        },

        {
            name: "99designs",
            image:
                "https://cdn.simpleicons.org/99designs"
        },

        {
            name: "Dribbble",
            image:
                "https://cdn.simpleicons.org/dribbble"
        },

        {
            name: "Behance",
            image:
                "https://cdn.simpleicons.org/behance"
        },

        {
            name: "Freelancer",
            image:
                "https://cdn.simpleicons.org/freelancer"
        }

    ];


    const logoMarquee =
        $("#logoMarquee");


    if (logoMarquee) {

        /*
           Duplicate the logos so the continuous movement
           has no visible gap.
        */

        const allPlatforms =
            [
                ...platforms,
                ...platforms,
                ...platforms
            ];


        logoMarquee.innerHTML =
            allPlatforms.map(
                platform => {

                    return `
                        <div
                            class="platform"
                            title="${platform.name}"
                            aria-label="${platform.name}"
                        >
                            <img
                                src="${platform.image}"
                                alt="${platform.name}"
                            >
                        </div>
                    `;

                }
            ).join("");


        let position = 0;

        let animationFrame = null;

        let logoPaused = false;


        function animateLogos() {

            if (!logoPaused) {

                position -= 0.35;

                /*
                   Reset periodically.
                   The duplicated logos make this invisible.
                */

                if (
                    Math.abs(position) >=
                    logoMarquee.scrollWidth / 3
                ) {

                    position = 0;

                }

                logoMarquee.style.transform =
                    `translateX(${position}px)`;

            }


            animationFrame =
                requestAnimationFrame(
                    animateLogos
                );

        }


        logoMarquee.addEventListener(
            "mouseenter",
            () => {

                logoPaused = true;

            }
        );


        logoMarquee.addEventListener(
            "mouseleave",
            () => {

                logoPaused = false;

            }
        );


        animateLogos();

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        $("#backTop");


    function updateBackTop() {

        if (!backTop) return;


        if (
            window.scrollY > 500
        ) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackTop,
        {
            passive: true
        }
    );


    if (backTop) {

        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    updateBackTop();


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        $("#contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                alert(
                    "Thank you. Your enquiry has been received."
                );

            }
        );

    }


    /* =====================================================
       PREVENT HASH URL CHANGES
       
       Navigation stays on:
       https://shakilistic.github.io/
       
       instead of:
       /home
       /work
       /about
       etc.
    ===================================================== */

    $$(".main-nav a, .cta").forEach(
        link => {

            const href =
                link.getAttribute("href");


            if (
                href &&
                href.startsWith("#")
            ) {

                link.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        const target =
                            document.querySelector(
                                href
                            );


                        if (target) {

                            target.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }
                );

            }

        }
    );


});
