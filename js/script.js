/* =========================================================
   SHAKIL R. PORTFOLIO
   COMPLETE JAVASCRIPT
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           THEME
        ===================================================== */

        const themeToggle =
            document.getElementById(
                "themeToggle"
            );


        let theme =
            localStorage.getItem(
                "shakilstic-theme"
            ) || "dark";


        function applyTheme(
            value
        ) {

            document.documentElement
                .setAttribute(
                    "data-theme",
                    value
                );


            localStorage.setItem(
                "shakilstic-theme",
                value
            );

        }


        applyTheme(
            theme
        );


        if (themeToggle) {

            themeToggle.addEventListener(
                "click",
                () => {

                    theme =
                        theme === "dark"
                            ? "light"
                            : "dark";


                    applyTheme(
                        theme
                    );

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
                .forEach(
                    link => {

                        link.addEventListener(
                            "click",
                            () => {

                                mobileNav
                                    .classList
                                    .remove(
                                        "open"
                                    );

                            }
                        );

                    }
                );

        }



        /* =====================================================
           NO CUSTOM CURSOR
           
           Orange cursor ball has been completely removed.
        ===================================================== */



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

                        behavior:
                            "smooth"

                    });

                }
            );

        }



        /* =====================================================
           DYNAMIC PORTFOLIO IMAGES
           
           B1 = Book Cover
           W1 = Web
           S1 = Social
           L1 = Logo
           P1 = Print
           
           Supports up to 100.
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



        function testImage(
            src
        ) {

            return new Promise(
                resolve => {

                    const img =
                        new Image();


                    img.onload =
                        () => resolve(
                            true
                        );


                    img.onerror =
                        () => resolve(
                            false
                        );


                    img.src =
                        src;

                }
            );

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
                "project-card";


            article.innerHTML = `

                <a
                    href="${src}"
                    target="_blank"
                    rel="noopener noreferrer"
                >

                    <div class="project-image">

                        <img
                            src="${src}"
                            alt="${title}"
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
                        foundImage,
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


            /*
               If category has no images,
               hide entire section.
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
           BLOGGER JSONP
           
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
           ESCAPE HTML
        ===================================================== */

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



        /* =====================================================
           CLIENT FEEDBACK
           
           FIRST 3 SHOW.
           SHOW MORE = remaining reviews.
           SHOW LESS = collapse back to 3.
        ===================================================== */

        const clientsGrid =
            document.getElementById(
                "clientsGrid"
            );


        const clientsMore =
            document.getElementById(
                "clientsMore"
            );


        let allClients =
            [];


        let clientsExpanded =
            false;



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
                    ${escapeHTML(
                        cleaned
                    )}
                </div>

                <div class="client-name">
                    — ${escapeHTML(
                        name
                    )}
                </div>

            `;


            return card;

        }



        function renderClients() {

            if (!clientsGrid)
                return;


            clientsGrid.innerHTML =
                "";


            /*
               Only 3 reviews initially.
               All reviews after SHOW MORE.
            */

            const limit =
                clientsExpanded
                    ? allClients.length
                    : Math.min(
                        3,
                        allClients.length
                    );


            allClients
                .slice(
                    0,
                    limit
                )
                .forEach(
                    entry => {

                        clientsGrid.appendChild(
                            makeClientCard(
                                entry
                            )
                        );

                    }
                );


            /*
               SHOW MORE appears only
               when there are more than 3.
            */

            if (
                clientsMore &&
                allClients.length > 3
            ) {

                clientsMore.hidden =
                    false;


                clientsMore.innerHTML =
                    clientsExpanded

                        ? `
                            SHOW LESS
                            <span>−</span>
                          `

                        : `
                            SHOW MORE
                            <span>+</span>
                          `;

            }
            else if (clientsMore) {

                clientsMore.hidden =
                    true;

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

                    clientsGrid.innerHTML = `

                        <div class="loading-state">

                            Client feedback
                            will appear here.

                        </div>

                    `;


                    if (clientsMore) {

                        clientsMore.hidden =
                            true;

                    }


                    return;

                }


                renderClients();

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


                if (clientsMore) {

                    clientsMore.hidden =
                        true;

                }

            }

        }


        loadClients();



        /*
           SHOW MORE / SHOW LESS
        */

        if (clientsMore) {

            clientsMore.addEventListener(
                "click",
                () => {

                    clientsExpanded =
                        !clientsExpanded;


                    renderClients();


                    /*
                       When collapsing,
                       return smoothly to
                       top of client section.
                    */

                    if (
                        !clientsExpanded
                    ) {

                        const clientsSection =
                            document.getElementById(
                                "clients"
                            );


                        if (
                            clientsSection
                        ) {

                            clientsSection.scrollIntoView({
                                behavior:
                                    "smooth",
                                block:
                                    "start"
                            });

                        }

                    }

                }
            );

        }



        /* =====================================================
           CURRENTLY WORKING
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
                            firstImage(
                                entry
                            )
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
                .forEach(
                    button => {


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


                    }
                );

        }



        /* =====================================================
           INTERNAL LINKS
        ===================================================== */

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                link => {

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

                }
            );



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


    }
);
