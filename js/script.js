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
        localStorage.getItem("shakilistic-theme") ||
        "dark";


    function applyTheme(value) {

        document.documentElement
            .setAttribute(
                "data-theme",
                value
            );

        localStorage.setItem(
            "shakilistic-theme",
            value
        );

    }


    applyTheme(theme);


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                theme =
                    theme === "dark"
                        ? "light"
                        : "dark";

                applyTheme(theme);

            }
        );

    }



    /* =====================================================
       MOBILE NAV
    ===================================================== */

    const mobileToggle =
        document.getElementById(
            "mobileToggle"
        );


    const mobileNav =
        document.getElementById(
            "mobileNav"
        );


    if (
        mobileToggle &&
        mobileNav
    ) {

        mobileToggle.addEventListener(
            "click",
            () => {

                mobileNav.classList.toggle(
                    "open"
                );

            }
        );


        mobileNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileNav
                            .classList
                            .remove("open");

                    }
                );

            });

    }



    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursorDot =
        document.querySelector(
            ".cursor-dot"
        );


    const cursorRing =
        document.querySelector(
            ".cursor-ring"
        );


    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


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


    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        animateCursor();

    }



    /* =====================================================
       CURSOR HOVER
    ===================================================== */

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
                        .add(
                            "cursor-hover"
                        );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    document.body
                        .classList
                        .remove(
                            "cursor-hover"
                        );

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


    if (
        "IntersectionObserver"
        in window
    ) {

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
                                    .add(
                                        "visible"
                                    );

                                revealObserver
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

                },
                {
                    threshold: .08
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    }
    else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



    /* =====================================================
       BACK TO TOP
       
       Fixed on screen.
       Appears after scrolling.
    ===================================================== */

    const backTop =
        document.getElementById(
            "backTop"
        );


    function updateBackTop() {

        if (!backTop)
            return;


        if (
            window.scrollY > 500
        ) {

            backTop.classList.add(
                "show"
            );

        }
        else {

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


    updateBackTop();


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
       
       W1 = Web 1
       S1 = Social 1
       L1 = Logo 1
       P1 = Print 1
       
       Supports up to 100 images.
       
       Missing numbers stay blank.
       
       Example:
       
       B1.jpg
       B2.jpg
       B5.png
       
       B3 and B4 can be missing.
       
       No serial number is displayed.
    ===================================================== */

    const categories = [

        {
            prefix: "B",
            grid: "bookGrid"
        },

        {
            prefix: "W",
            grid: "webGrid"
        },

        {
            prefix: "S",
            grid: "socialGrid"
        },

        {
            prefix: "L",
            grid: "logoGrid"
        },

        {
            prefix: "P",
            grid: "printGrid"
        }

    ];


    const imageExtensions = [
        "jpg",
        "jpeg",
        "png",
        "webp"
    ];



    function testImage(
        src
    ) {

        return new Promise(
            resolve => {

                const img =
                    new Image();


                img.onload =
                    () => resolve(true);


                img.onerror =
                    () => resolve(false);


                img.src =
                    src;

            }
        );

    }



    function createProject(
        src
    ) {

        const article =
            document.createElement(
                "article"
            );


        article.className =
            "project-card";


        article.innerHTML = `

            <a
                href="${src}"
                target="_blank"
                rel="noopener"
            >

                <div class="project-image">

                    <img
                        src="${src}"
                        alt="Portfolio project"
                        loading="lazy"
                    >

                </div>

            </a>

        `;


        return article;

    }



    async function loadCategory(
        category
    ) {

        const grid =
            document.getElementById(
                category.grid
            );


        if (!grid)
            return;


        const section =
            grid.closest(
                ".design-category"
            );


        let found =
            0;


        for (
            let number = 1;
            number <= 100;
            number++
        ) {

            let foundImage =
                null;


            for (
                const extension
                of imageExtensions
            ) {

                const src =
                    `assets/images/${category.prefix}${number}.${extension}`;


                const exists =
                    await testImage(
                        src
                    );


                if (exists) {

                    foundImage =
                        src;

                    break;

                }

            }


            if (!foundImage)
                continue;


            found++;


            const card =
                createProject(
                    foundImage
                );


            grid.appendChild(
                card
            );


            requestAnimationFrame(
                () => {

                    card.classList.add(
                        "visible"
                    );

                }
            );

        }


        /*
           Hide entire section if
           there are no images.
        */

        if (
            found === 0 &&
            section
        ) {

            section.classList.add(
                "is-empty"
            );

        }

    }



    categories.forEach(
        category => {

            loadCategory(
                category
            );

        }
    );



    /* =====================================================
       BLOGGER
       
       Client Feedback
       Currently Working
    ===================================================== */

    const BLOGGER =
        "https://createwithshakil.blogspot.com";


    let jsonpCounter =
        0;



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


                script.src =
                    url;


                document.body.appendChild(
                    script
                );

            }
        );

    }



    /* =====================================================
       BLOGGER HELPERS
    ===================================================== */

    function entryTitle(
        entry
    ) {

        return (
            entry?.title?.$t ||
            "Client"
        );

    }


    function entryContent(
        entry
    ) {

        return (
            entry?.content?.$t ||
            entry?.summary?.$t ||
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


        div.innerHTML =
            html;


        return (
            div.textContent ||
            div.innerText ||
            ""
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();

    }


    function firstImage(
        entry
    ) {

        const html =
            entryContent(
                entry
            );


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
            entry?.link ||
            [];


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
       
       ALL reviews are shown.
       No Show More button.
    ===================================================== */

    const clientsGrid =
        document.getElementById(
            "clientsGrid"
        );


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



    function makeClientCard(
        entry
    ) {

        const name =
            entryTitle(
                entry
            );


        const raw =
            entryContent(
                entry
            );


        const text =
            stripHTML(
                raw
            );


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
                ★★★★★
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



    async function loadClients() {

        if (!clientsGrid)
            return;


        try {

            const clients =
                await bloggerFeed(
                    "Client Feedback",
                    100
                );


            clientsGrid.innerHTML =
                "";


            if (
                !clients.length
            ) {

                clientsGrid.innerHTML = `

                    <div class="loading-state">

                        Client feedback
                        will appear here.

                    </div>

                `;

                return;

            }


            /*
               IMPORTANT:
               ALL client feedback is rendered.
            */

            clients.forEach(
                entry => {

                    clientsGrid.appendChild(
                        makeClientCard(
                            entry
                        )
                    );

                }
            );

        }
        catch(error) {

            console.error(
                "Client feedback:",
                error
            );


            clientsGrid.innerHTML = `

                <div class="loading-state">

                    Unable to load
                    client feedback right now.

                </div>

            `;

        }

    }


    loadClients();



    /* =====================================================
       CURRENTLY WORKING
       
       Blogger label:
       Currently Working
       
       6 logos visible where possible.
       
       Auto continuous movement.
       Mouse hover pauses.
       Arrow buttons work.
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


    let profiles =
        [];


    let profileIndex =
        0;


    let autoProfileTimer =
        null;


    let profilePaused =
        false;


    let profileMoving =
        false;



    function makeProfile(
        entry
    ) {

        const image =
            firstImage(
                entry
            );


        if (!image)
            return null;


        const url =
            entryUrl(
                entry
            );


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
            "noopener noreferrer";


        card.innerHTML = `

            <img
                src="${image}"
                alt="${escapeHTML(
                    entryTitle(entry)
                )}"
                loading="lazy"
            >

        `;


        return card;

    }



    function cardWidth() {

        if (!profileTrack)
            return 0;


        const card =
            profileTrack.querySelector(
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



    function renderProfiles() {

        if (
            !profileTrack ||
            !profiles.length
        )
            return;


        profileTrack.innerHTML =
            "";


        /*
           Triple clone for
           continuous loop.
        */

        const displayProfiles =
            [
                ...profiles,
                ...profiles,
                ...profiles
            ];


        displayProfiles.forEach(
            entry => {

                const card =
                    makeProfile(
                        entry
                    );


                if (card) {

                    profileTrack.appendChild(
                        card
                    );

                }

            }
        );


        /*
           Start in the middle copy.
        */

        profileIndex =
            profiles.length;


        updateProfilePosition(
            false
        );

    }



    function updateProfilePosition(
        animate = true
    ) {

        if (!profileTrack)
            return;


        profileTrack.style.transition =
            animate
                ? "transform .7s cubic-bezier(.2,.8,.2,1)"
                : "none";


        profileTrack.style.transform =
            `translateX(-${profileIndex * cardWidth()}px)`;

    }



    function moveProfile(
        direction
    ) {

        if (
            !profiles.length ||
            !profileTrack ||
            profileMoving
        )
            return;


        profileMoving =
            true;


        profileIndex +=
            direction;


        updateProfilePosition(
            true
        );


        setTimeout(
            () => {

                /*
                   Jump silently to
                   the middle copy.
                */

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


                profileMoving =
                    false;

            },
            720
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

                        moveProfile(
                            1
                        );

                    }

                },
                2400
            );

    }



    if (profilePrev) {

        profilePrev.addEventListener(
            "click",
            () => {

                moveProfile(
                    -1
                );

                startProfileAuto();

            }
        );

    }



    if (profileNext) {

        profileNext.addEventListener(
            "click",
            () => {

                moveProfile(
                    1
                );

                startProfileAuto();

            }
        );

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


            profiles =
                profiles.filter(
                    entry =>
                        firstImage(entry)
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

            console.error(
                "Currently Working:",
                error
            );


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
                    String(
                        formData.get(
                            "name"
                        ) || ""
                    ).trim();


                const email =
                    String(
                        formData.get(
                            "email"
                        ) || ""
                    ).trim();


                const message =
                    String(
                        formData.get(
                            "message"
                        ) || ""
                    ).trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Please complete all fields.";

                    }

                    return;

                }


                const subject =
                    encodeURIComponent(
                        "New Project Enquiry — Shakil R."
                    );


                const body =
                    encodeURIComponent(
                        `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`
                    );


                if (formStatus) {

                    formStatus.textContent =
                        "Opening your email client...";

                }


                window.location.href =
                    `mailto:?subject=${subject}&body=${body}`;

            }
        );

    }



    /* =====================================================
       MAGNETIC BUTTON
    ===================================================== */

    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

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
                            `translate(${x * .10}px, ${y * .10}px)`;

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

    }



    /* =====================================================
       INTERNAL LINKS
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
                        link.getAttribute(
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



    /* =====================================================
       YEAR
    ===================================================== */

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date()
                .getFullYear();

    }

});
