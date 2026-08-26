/* =========================================================
   SHAKIL R.
   COMPLETE PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       THEME
    ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.querySelector(".theme-icon");

    let theme =
        localStorage.getItem("shakilstic-theme") ||
        "dark";


    function applyTheme(value) {

        document.documentElement
            .setAttribute("data-theme", value);

        localStorage.setItem(
            "shakilstic-theme",
            value
        );


        if (themeIcon) {

            themeIcon.textContent =
                value === "dark"
                    ? "☼"
                    : "☾";

        }

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
       MOBILE MENU
    ===================================================== */

    const mobileToggle =
        document.getElementById(
            "mobileToggle"
        );

    const mobileNav =
        document.getElementById(
            "mobileNav"
        );


    if (mobileToggle && mobileNav) {

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

                        mobileNav.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }



    /* =====================================================
       CURSOR
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


    function cursorAnimation() {

        ringX +=
            (mouseX - ringX) * .14;

        ringY +=
            (mouseY - ringY) * .14;


        if (cursorRing) {

            cursorRing.style.left =
                ringX + "px";

            cursorRing.style.top =
                ringY + "px";

        }


        requestAnimationFrame(
            cursorAnimation
        );

    }


    cursorAnimation();



    /* =====================================================
       REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if ("IntersectionObserver" in window) {

        const observer =
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

                                observer.unobserve(
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

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



    /* =====================================================
       DYNAMIC PORTFOLIO
       
       B1 = Book Cover
       W1 = Web
       S1 = Social
       L1 = Logo
       P1 = Print
       
       Supports 1–200.
       
       IMPORTANT:
       Uses GitHub API directory listing.
       This means it does NOT make hundreds
       of image requests.
    ===================================================== */

    const categories = [

        {
            prefix: "B",
            grid: "bookGrid",
            section: "book-covers",
            title: "Book Cover"
        },

        {
            prefix: "W",
            grid: "webGrid",
            section: "web-design",
            title: "Web Design"
        },

        {
            prefix: "S",
            grid: "socialGrid",
            section: "social-design",
            title: "Social Media"
        },

        {
            prefix: "L",
            grid: "logoGrid",
            section: "logo-design",
            title: "Logo Design"
        },

        {
            prefix: "P",
            grid: "printGrid",
            section: "print-design",
            title: "Print Media"
        }

    ];


    const imageExtensions = [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "gif"
    ];


    const GITHUB_API =
        "https://api.github.com/repos/shakilstic/shakilstic.github.io/contents/assets/images?ref=main";


    const GITHUB_RAW =
        "https://raw.githubusercontent.com/shakilstic/shakilstic.github.io/main/assets/images/";


    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent =
            text || "";

        return div.innerHTML;

    }


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

            <a
                href="${src}"
                target="_blank"
                rel="noopener">

                <div class="project-image">

                    <img
                        src="${src}"
                        alt="${escapeHTML(title)}"
                        loading="lazy">

                </div>

                <div class="project-info">

                    <h3>
                        ${escapeHTML(title)}
                    </h3>

                    <span>
                        Selected Work
                    </span>

                </div>

            </a>

        `;


        return article;

    }


    async function loadPortfolioImages() {

        try {

            const response =
                await fetch(
                    GITHUB_API,
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "GitHub API failed"
                );

            }


            const files =
                await response.json();


            categories.forEach(
                category => {

                    const grid =
                        document.getElementById(
                            category.grid
                        );


                    const section =
                        document.getElementById(
                            category.section
                        );


                    if (!grid || !section)
                        return;


                    grid.innerHTML = "";


                    const matchingFiles =
                        files
                            .filter(file => {

                                if (
                                    file.type !==
                                    "file"
                                )
                                    return false;


                                const name =
                                    file.name;


                                const match =
                                    name.match(
                                        new RegExp(
                                            `^${category.prefix}(\\d+)\\.(${imageExtensions.join("|")})$`,
                                            "i"
                                        )
                                    );


                                return !!match;

                            })
                            .sort(
                                (a, b) => {

                                    const aNumber =
                                        parseInt(
                                            a.name.match(
                                                /\d+/
                                            )[0]
                                        );


                                    const bNumber =
                                        parseInt(
                                            b.name.match(
                                                /\d+/
                                            )[0]
                                        );


                                    return (
                                        aNumber -
                                        bNumber
                                    );

                                }
                            );


                    if (
                        matchingFiles.length === 0
                    ) {

                        section.classList.add(
                            "is-empty"
                        );

                        return;

                    }


                    section.classList.remove(
                        "is-empty"
                    );


                    matchingFiles.forEach(
                        file => {

                            const number =
                                file.name.match(
                                    /\d+/
                                )[0];


                            const src =
                                GITHUB_RAW +
                                encodeURIComponent(
                                    file.name
                                );


                            const card =
                                createProject(
                                    src,
                                    category.title,
                                    number
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
                    );

                }
            );


        }

        catch(error) {

            console.error(
                "Portfolio images could not load:",
                error
            );

        }

    }


    loadPortfolioImages();



    /* =====================================================
       BLOGGER JSONP
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

                const callbackName =
                    `shakilBlogger_${++jsonpCounter}`;


                const script =
                    document.createElement(
                        "script"
                    );


                const encodedLabel =
                    encodeURIComponent(
                        label
                    );


                const url =
                    `${BLOGGER}/feeds/posts/default/-/${encodedLabel}?alt=json-in-script&max-results=${maxResults}&callback=${callbackName}`;


                const timeout =
                    setTimeout(
                        () => {

                            delete window[
                                callbackName
                            ];

                            script.remove();

                            reject(
                                new Error(
                                    "Blogger timeout"
                                )
                            );

                        },
                        8000
                    );


                window[callbackName] =
                    data => {

                        clearTimeout(
                            timeout
                        );


                        delete window[
                            callbackName
                        ];


                        script.remove();


                        resolve(
                            data?.feed?.entry ||
                            []
                        );

                    };


                script.onerror =
                    () => {

                        clearTimeout(
                            timeout
                        );


                        delete window[
                            callbackName
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


    function stripHTML(html) {

        const div =
            document.createElement(
                "div"
            );


        div.innerHTML =
            html || "";


        return (
            div.textContent ||
            div.innerText ||
            ""
        )
        .replace(/\s+/g, " ")
        .trim();

    }



    /* =====================================================
       CLIENT FEEDBACK
       
       ALL BLOGGER CLIENT FEEDBACK POSTS
       
       No "View Original"
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


    function createClientCard(entry) {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "client-card reveal";


        const name =
            entryTitle(entry);


        let text =
            stripHTML(
                entryContent(entry)
            );


        text =
            text
                .replace(
                    /^[★☆\s]+/,
                    ""
                )
                .trim();


        card.innerHTML = `

            <div class="client-stars">
                ★★★★★
            </div>

            <div class="client-review">
                ${escapeHTML(text)}
            </div>

            <div class="client-name">
                — ${escapeHTML(name)}
            </div>

        `;


        return card;

    }


    function renderClients() {

        if (!clientsGrid)
            return;


        clientsGrid.innerHTML =
            "";


        const amount =
            clientsExpanded
                ? allClients.length
                : Math.min(
                    3,
                    allClients.length
                );


        allClients
            .slice(0, amount)
            .forEach(entry => {

                clientsGrid.appendChild(
                    createClientCard(
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


            clientsMore.textContent =
                clientsExpanded
                    ? "SHOW LESS"
                    : "SHOW MORE";

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


            if (
                !allClients.length
            ) {

                clientsGrid.innerHTML =
                    "";

                return;

            }


            renderClients();

        }

        catch(error) {

            console.warn(
                "Client feedback unavailable:",
                error
            );

            clientsGrid.innerHTML =
                "";

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
       CURRENTLY WORKING
       
       6 LOGOS VISIBLE
       AUTO SLIDE
       CONTINUOUS LOOP
       PAUSE ON MOUSE
       ARROW CONTROL
       
       Blogger:
       Currently Working
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

    let profilePosition = 0;

    let profileTimer = null;

    let profilePaused = false;


    function firstImage(entry) {

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


    function createProfileCard(entry) {

        const image =
            firstImage(entry);


        if (!image)
            return null;


        const card =
            document.createElement(
                "a"
            );


        card.className =
            "profile-card";


        card.href =
            "#";


        card.setAttribute(
            "aria-label",
            entryTitle(entry)
        );


        card.innerHTML = `

            <img
                src="${image}"
                alt="${escapeHTML(
                    entryTitle(entry)
                )}"
                loading="lazy">

        `;


        /*
           Important:
           Clicking logo DOES NOT open Blogger.
        */

        card.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );


        return card;

    }


    function getProfileStep() {

        const card =
            profileTrack?.querySelector(
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

        if (!profileTrack)
            return;


        profileTrack.innerHTML =
            "";


        if (!profiles.length)
            return;


        /*
           Triple clone creates enough
           material for a smooth loop.
        */

        const repeated =
            [
                ...profiles,
                ...profiles,
                ...profiles
            ];


        repeated.forEach(
            entry => {

                const card =
                    createProfileCard(
                        entry
                    );


                if (card) {

                    profileTrack.appendChild(
                        card
                    );

                }

            }
        );


        profilePosition =
            profiles.length;


        setProfilePosition(
            false
        );

    }


    function setProfilePosition(
        animate = true
    ) {

        if (!profileTrack)
            return;


        profileTrack.style.transition =
            animate
                ? "transform .55s cubic-bezier(.2,.8,.2,1)"
                : "none";


        const step =
            getProfileStep();


        profileTrack.style.transform =
            `translate3d(-${profilePosition * step}px,0,0)`;

    }


    function moveProfile(
        direction
    ) {

        if (
            !profiles.length ||
            !profileTrack
        )
            return;


        profilePosition +=
            direction;


        setProfilePosition(
            true
        );


        setTimeout(
            () => {

                if (
                    profilePosition >=
                    profiles.length * 2
                ) {

                    profilePosition =
                        profiles.length;

                    setProfilePosition(
                        false
                    );

                }


                if (
                    profilePosition <
                    profiles.length
                ) {

                    profilePosition =
                        profiles.length;

                    setProfilePosition(
                        false
                    );

                }

            },
            570
        );

    }


    function startProfileAuto() {

        clearInterval(
            profileTimer
        );


        profileTimer =
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
                2300
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

        try {

            profiles =
                await bloggerFeed(
                    "Currently Working",
                    100
                );


            /*
               Remove entries without images.
            */

            profiles =
                profiles.filter(
                    entry =>
                        !!firstImage(
                            entry
                        )
                );


            renderProfiles();

            startProfileAuto();

        }

        catch(error) {

            console.warn(
                "Currently Working unavailable:",
                error
            );

        }

    }


    loadProfiles();



    /* =====================================================
       BACK TO TOP
       
       Fixed button.
       Available from anywhere.
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
       MAGNETIC BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".magnetic"
        )
        .forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    if (
                        window.innerWidth <
                        900
                    )
                        return;


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

                    if (formStatus) {

                        formStatus.textContent =
                            "Please complete all fields.";

                    }

                    return;

                }


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


                if (formStatus) {

                    formStatus.textContent =
                        "Opening your email client...";

                }

            }
        );

    }



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
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


});
