/* =========================================================
   SHAKIL R. PORTFOLIO
   COMPLETE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       THEME
    ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");

    let theme =
        localStorage.getItem("shakilstic-theme") ||
        "light";


    function applyTheme(value) {

        document.documentElement
            .setAttribute("data-theme", value);

        localStorage.setItem(
            "shakilstic-theme",
            value
        );

    }


    applyTheme(theme);


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                theme =
                    theme === "light"
                        ? "dark"
                        : "light";

                applyTheme(theme);

            }
        );

    }



    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorRing =
        document.querySelector(".cursor-ring");


    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            if (cursorDot) {

                cursorDot.style.left =
                    mouseX + "px";

                cursorDot.style.top =
                    mouseY + "px";

            }

        }
    );


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * .16;

        ringY +=
            (mouseY - ringY) * .16;


        if (cursorRing) {

            cursorRing.style.left =
                ringX + "px";

            cursorRing.style.top =
                ringY + "px";

        }


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    document
        .querySelectorAll(
            "a, button, input, textarea"
        )
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    document.body
                        .classList
                        .add("cursor-hover");

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    document.body
                        .classList
                        .remove("cursor-hover");

                }
            );

        });



    /* =====================================================
       MOBILE NAV
    ===================================================== */

    const mobileNav =
        document.getElementById("mobileNav");


    document
        .querySelectorAll(
            ".desktop-nav a"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    if (mobileNav) {

                        mobileNav
                            .classList
                            .remove("open");

                    }

                }
            );

        });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },
            {
                threshold: .10
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById(
            "backTop"
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



    /* =====================================================
       DYNAMIC PORTFOLIO IMAGES
       
       B1 = Book Cover 1
       B2 = Book Cover 2
       ...
       
       W1 = Web 1
       S1 = Social 1
       L1 = Logo 1
       P1 = Print 1
       
       If image doesn't exist:
       nothing is shown.
       
       Section automatically hides if
       no images exist.
    ===================================================== */

    const categories = [

        {
            prefix: "B",
            grid: "bookGrid",
            title: "Book Cover"
        },

        {
            prefix: "W",
            grid: "webGrid",
            title: "Web Design"
        },

        {
            prefix: "S",
            grid: "socialGrid",
            title: "Social Media"
        },

        {
            prefix: "L",
            grid: "logoGrid",
            title: "Logo Design"
        },

        {
            prefix: "P",
            grid: "printGrid",
            title: "Print Media"
        }

    ];


    const imageExtensions = [
        "jpg",
        "jpeg",
        "png",
        "webp"
    ];


    function createProject(
        src,
        title,
        number
    ) {

        const article =
            document.createElement(
                "article"
            );

        article.className =
            "project-card reveal";


        article.innerHTML = `

            <a href="${src}" target="_blank">

                <div class="project-image">

                    <img
                        src="${src}"
                        alt="${title} ${number}"
                        loading="lazy">

                </div>

                <div class="project-info">

                    <h3>
                        ${title} / ${number}
                    </h3>

                    <span>
                        ${title}
                    </span>

                </div>

            </a>

        `;


        return article;

    }


    function testImage(src) {

        return new Promise(resolve => {

            const img =
                new Image();


            img.onload = () =>
                resolve(true);


            img.onerror = () =>
                resolve(false);


            img.src = src;

        });

    }


    async function loadCategory(
        category
    ) {

        const grid =
            document.getElementById(
                category.grid
            );


        if (!grid) return;


        const section =
            grid.closest(
                ".design-section"
            );


        let found = 0;


        /*
           Supports 1–100 images.
           You can upload more than 20.
        */

        for (
            let number = 1;
            number <= 100;
            number++
        ) {

            let foundImage = null;


            for (
                const extension
                of imageExtensions
            ) {

                const src =
                    `assets/images/${category.prefix}${number}.${extension}`;


                const exists =
                    await testImage(src);


                if (exists) {

                    foundImage =
                        src;

                    break;

                }

            }


            if (!foundImage) {

                continue;

            }


            found++;


            const card =
                createProject(
                    foundImage,
                    category.title,
                    number
                );


            grid.appendChild(card);

        }


        if (!found && section) {

            section.classList
                .add("is-empty");

        }


        /*
           Reveal dynamically generated cards.
        */

        grid
            .querySelectorAll(
                ".reveal"
            )
            .forEach(
                element => {

                    setTimeout(
                        () => {

                            element
                                .classList
                                .add("visible");

                        },
                        80
                    );

                }
            );

    }


    categories.forEach(
        loadCategory
    );



    /* =====================================================
       BLOGGER JSONP ENGINE
       
       Blogger:
       Client Feedback
       Currently Working
    ===================================================== */

    const BLOGGER =
        "https://createwithshakil.blogspot.com";


    let jsonpCounter = 0;


    function bloggerFeed(
        label,
        maxResults = 100
    ) {

        return new Promise(
            (resolve, reject) => {

                const callback =
                    `shakilFeed_${++jsonpCounter}`;


                const script =
                    document.createElement(
                        "script"
                    );


                const encodedLabel =
                    encodeURIComponent(
                        label
                    );


                const url =
                    `${BLOGGER}/feeds/posts/default/-/${encodedLabel}?alt=json-in-script&max-results=${maxResults}&callback=${callback}`;


                window[callback] =
                    data => {

                        delete window[
                            callback
                        ];

                        script.remove();

                        resolve(
                            data?.feed?.entry ||
                            []
                        );

                    };


                script.onerror =
                    () => {

                        delete window[
                            callback
                        ];

                        script.remove();

                        reject(
                            new Error(
                                "Blogger feed failed"
                            )
                        );

                    };


                script.src = url;

                document.body.appendChild(
                    script
                );

            }
        );

    }



    /* =====================================================
       BLOGGER HELPERS
    ===================================================== */

    function entryTitle(entry) {

        return (
            entry.title?.$t ||
            "Client"
        );

    }


    function entryContent(entry) {

        return (
            entry.content?.$t ||
            entry.summary?.$t ||
            ""
        );

    }


    function stripHTML(
        html
    ) {

        const div =
            document.createElement(
                "div"
            );

        div.innerHTML = html;

        return (
            div.textContent ||
            div.innerText ||
            ""
        )
        .replace(/\s+/g, " ")
        .trim();

    }


    function firstImage(
        entry
    ) {

        const html =
            entryContent(entry);


        const match =
            html.match(
                /<img[^>]+src=["']([^"']+)["']/i
            );


        return match
            ? match[1]
            : "";

    }


    function entryUrl(
        entry
    ) {

        const links =
            entry.link || [];


        const alternate =
            links.find(
                link =>
                    link.rel ===
                    "alternate"
            );


        return alternate
            ? alternate.href
            : "#";

    }



    /* =====================================================
       CLIENT FEEDBACK
    ===================================================== */

    const clientsGrid =
        document.getElementById(
            "clientsGrid"
        );


    const clientsMore =
        document.getElementById(
            "clientsMore"
        );


    let allClients = [];

    let clientsExpanded =
        false;


    function makeClientCard(
        entry
    ) {

        const name =
            entryTitle(entry);


        const raw =
            entryContent(entry);


        const text =
            stripHTML(raw);


        let rating =
            "★★★★★";


        /*
           Remove star rating from review text
        */

        const cleaned =
            text
                .replace(
                    /^[★☆\s]+/,
                    ""
                )
                .trim();


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "client-card";


        card.innerHTML = `

            <div class="client-stars">
                ${rating}
            </div>

            <div class="client-review">
                ${escapeHTML(cleaned)}
            </div>

            <div class="client-name">
                — ${escapeHTML(name)}
            </div>

        `;


        return card;

    }


    function escapeHTML(
        text
    ) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent =
            text || "";


        return div.innerHTML;

    }


    function renderClients() {

        if (!clientsGrid)
            return;


        clientsGrid.innerHTML = "";


        const limit =
            clientsExpanded
                ? allClients.length
                : Math.min(
                    3,
                    allClients.length
                );


        allClients
            .slice(0, limit)
            .forEach(entry => {

                clientsGrid.appendChild(
                    makeClientCard(
                        entry
                    )
                );

            });


        if (
            clientsMore &&
            allClients.length > 3
        ) {

            clientsMore.hidden =
                false;


            clientsMore.innerHTML =
                clientsExpanded
                    ? "Show Less <span>−</span>"
                    : "Show More <span>+</span>";

        }

    }


    async function loadClients() {

        if (!clientsGrid)
            return;


        try {

            allClients =
                await bloggerFeed(
                    "Client Feedback",
                    100
                );


            /*
               If no feedback is returned,
               keep section clean.
            */

            if (
                !allClients.length
            ) {

                clientsGrid.innerHTML = `
                    <div class="loading-state">
                        Client feedback will appear here.
                    </div>
                `;

                return;

            }


            renderClients();


        }

        catch(error) {

            clientsGrid.innerHTML = `
                <div class="loading-state">
                    Unable to load client feedback right now.
                </div>
            `;

        }

    }


    loadClients();


    if (clientsMore) {

        clientsMore.addEventListener(
            "click",
            () => {

                clientsExpanded =
                    !clientsExpanded;

                renderClients();

            }
        );

    }



    /* =====================================================
       CURRENTLY WORKING PROFILES
       
       Blogger label:
       Currently Working
       
       First image = logo
    ===================================================== */

    const profileTrack =
        document.getElementById(
            "profileTrack"
        );


    const profileWindow =
        document.getElementById(
            "profileWindow"
        );


    const profilePrev =
        document.getElementById(
            "profilePrev"
        );


    const profileNext =
        document.getElementById(
            "profileNext"
        );


    let profiles = [];


    let profileIndex = 0;


    let autoProfileTimer = null;


    let profilePaused = false;


    function makeProfile(
        entry
    ) {

        const image =
            firstImage(entry);


        if (!image)
            return null;


        const url =
            entryUrl(entry);


        const card =
            document.createElement(
                "a"
            );


        card.className =
            "profile-card";


        card.href =
            url || "#";


        card.target =
            "_blank";


        card.rel =
            "noopener";


        card.innerHTML = `

            <img
                src="${image}"
                alt="${escapeHTML(
                    entryTitle(entry)
                )}"
                loading="lazy">

        `;


        return card;

    }


    function renderProfiles() {

        if (!profileTrack)
            return;


        profileTrack.innerHTML =
            "";


        /*
           Clone enough profiles
           for continuous looping.
        */

        const displayProfiles =
            [
                ...profiles,
                ...profiles,
                ...profiles
            ];


        displayProfiles
            .forEach(entry => {

                const card =
                    makeProfile(
                        entry
                    );


                if (card) {

                    profileTrack
                        .appendChild(
                            card
                        );

                }

            });


        profileIndex =
            profiles.length;


        updateProfilePosition(
            false
        );

    }


    function cardWidth() {

        if (!profileTrack)
            return 0;


        const card =
            profileTrack
                .querySelector(
                    ".profile-card"
                );


        if (!card)
            return 0;


        const gap =
            parseFloat(
                getComputedStyle(
                    profileTrack
                ).gap
            ) || 0;


        return (
            card.offsetWidth +
            gap
        );

    }


    function updateProfilePosition(
        animate = true
    ) {

        if (!profileTrack)
            return;


        profileTrack.style.transition =
            animate
                ? "transform .65s cubic-bezier(.2,.8,.2,1)"
                : "none";


        profileTrack.style.transform =
            `translateX(-${profileIndex * cardWidth()}px)`;

    }


    function moveProfile(
        direction
    ) {

        if (
            !profiles.length ||
            !profileTrack
        )
            return;


        profileIndex +=
            direction;


        updateProfilePosition(
            true
        );


        /*
           Continuous loop:
           silently jump back to
           equivalent position.
        */

        setTimeout(
            () => {

                if (
                    profileIndex >=
                    profiles.length * 2
                ) {

                    profileIndex =
                        profiles.length;

                    updateProfilePosition(
                        false
                    );

                }


                if (
                    profileIndex <
                    profiles.length
                ) {

                    profileIndex =
                        profiles.length;

                    updateProfilePosition(
                        false
                    );

                }

            },
            680
        );

    }


    if (profilePrev) {

        profilePrev.addEventListener(
            "click",
            () => {

                moveProfile(-1);

                restartProfileAuto();

            }
        );

    }


    if (profileNext) {

        profileNext.addEventListener(
            "click",
            () => {

                moveProfile(1);

                restartProfileAuto();

            }
        );

    }


    function startProfileAuto() {

        clearInterval(
            autoProfileTimer
        );


        autoProfileTimer =
            setInterval(
                () => {

                    if (
                        !profilePaused
                    ) {

                        moveProfile(1);

                    }

                },
                2600
            );

    }


    function restartProfileAuto() {

        startProfileAuto();

    }


    if (profileWindow) {

        profileWindow.addEventListener(
            "mouseenter",
            () => {

                profilePaused =
                    true;

            }
        );


        profileWindow.addEventListener(
            "mouseleave",
            () => {

                profilePaused =
                    false;

            }
        );

    }


    async function loadProfiles() {

        if (!profileTrack)
            return;


        try {

            profiles =
                await bloggerFeed(
                    "Currently Working",
                    100
                );


            if (
                !profiles.length
            ) {

                profileTrack.innerHTML =
                    "";

                return;

            }


            renderProfiles();

            startProfileAuto();

        }

        catch(error) {

            profileTrack.innerHTML =
                "";

        }

    }


    loadProfiles();



    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formStatus =
        document.getElementById(
            "formStatus"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const formData =
                    new FormData(
                        contactForm
                    );


                const name =
                    formData.get(
                        "name"
                    );


                const email =
                    formData.get(
                        "email"
                    );


                const message =
                    formData.get(
                        "message"
                    );


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    formStatus.textContent =
                        "Please complete all fields.";

                    return;

                }


                /*
                   Replace this later with
                   your Google Apps Script
                   endpoint if required.
                */

                const subject =
                    encodeURIComponent(
                        "New Project Enquiry — Shakilstic"
                    );


                const body =
                    encodeURIComponent(
                        `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`
                    );


                window.location.href =
                    `mailto:?subject=${subject}&body=${body}`;


                formStatus.textContent =
                    "Opening your email client...";

            }
        );

    }



    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    document
        .querySelectorAll(
            ".magnetic"
        )
        .forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `translate(${x * .12}px,${y * .12}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });



    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link
                            .getAttribute(
                                "href"
                            );


                    if (
                        !id ||
                        id === "#"
                    )
                        return;


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target)
                        return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start"
                    });

                }
            );

        });


});
