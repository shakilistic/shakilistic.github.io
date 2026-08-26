document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       YEAR
    ========================================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================================
       THEME
       LIGHT / DARK
    ========================================= */

    const html = document.documentElement;
    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");


    const savedTheme =
        localStorage.getItem("shakilstic-theme");


    function systemTheme() {

        return window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light";

    }


    function applyTheme(theme) {

        let actualTheme = theme;

        if (theme === "auto") {
            actualTheme = systemTheme();
        }

        html.setAttribute(
            "data-theme",
            actualTheme
        );

        html.classList.toggle(
            "dark",
            actualTheme === "dark"
        );


        if (themeIcon) {

            themeIcon.textContent =
                actualTheme === "dark"
                    ? "☀"
                    : "☾";

        }

    }


    const initialTheme =
        savedTheme || "auto";


    applyTheme(initialTheme);


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const current =
                    html.classList.contains("dark")
                        ? "dark"
                        : "light";


                const next =
                    current === "dark"
                        ? "light"
                        : "dark";


                localStorage.setItem(
                    "shakilstic-theme",
                    next
                );


                applyTheme(next);


                themeToggle.classList.remove(
                    "clicked"
                );

                void themeToggle.offsetWidth;

                themeToggle.classList.add(
                    "clicked"
                );

            }
        );

    }


    /* =========================================
       BROWSER THEME CHANGE
    ========================================= */

    window
        .matchMedia(
            "(prefers-color-scheme: dark)"
        )
        .addEventListener(
            "change",
            event => {

                if (!localStorage.getItem(
                    "shakilstic-theme"
                )) {

                    applyTheme(
                        event.matches
                            ? "dark"
                            : "light"
                    );

                }

            }
        );


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    if (
        menuToggle &&
        mobileMenu
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

                mobileMenu.classList.toggle(
                    "open"
                );

                menuToggle.classList.toggle(
                    "active"
                );

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "open"
                        );

                        menuToggle.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }


    /* =========================================
       PORTFOLIO
    ========================================= */

    const portfolio =
        document.getElementById(
            "portfolio"
        );


    const categories = [

        {
            key: "B",
            title: "BOOK COVER DESIGN",
            description:
                "Book covers and editorial visuals designed to make a strong first impression."
        },

        {
            key: "W",
            title: "WEB DESIGN & DEVELOPMENT",
            description:
                "Responsive websites combining visual design, usability and modern digital experiences."
        },

        {
            key: "S",
            title: "SOCIAL MEDIA POSTER",
            description:
                "Bold campaign visuals created for social media, advertising and digital communication."
        },

        {
            key: "L",
            title: "LOGO DESIGN",
            description:
                "Distinctive identities designed to be recognizable, flexible and memorable."
        },

        {
            key: "P",
            title: "PRINT MEDIA DESIGN",
            description:
                "Professional print designs including posters, brochures and promotional materials."
        }

    ];


    /*
       Maximum image number.

       B1.jpg → B30.jpg
       L1.jpg → L30.jpg
       W1.jpg → W30.jpg

       Change 30 to 50 or 100 later
       if you ever need more.
    */

    const MAX_IMAGES = 30;


    /* =========================================
       FAST IMAGE CHECK
    ========================================= */

    function checkImage(src) {

        return new Promise(resolve => {

            const image =
                new Image();


            image.onload = () => {

                resolve({
                    exists: true,
                    src: src
                });

            };


            image.onerror = () => {

                resolve({
                    exists: false,
                    src: src
                });

            };


            image.src = src;

        });

    }


    /* =========================================
       FIND IMAGES IN PARALLEL
    ========================================= */

    async function findImages(key) {

        const checks = [];


        for (
            let i = 1;
            i <= MAX_IMAGES;
            i++
        ) {

            checks.push(
                checkImage(
                    `assets/images/${key}${i}.jpg`
                )
            );

        }


        const results =
            await Promise.all(checks);


        return results
            .filter(result => result.exists)
            .map(result => result.src);

    }


    /* =========================================
       CREATE CATEGORY
    ========================================= */

    function createCategory(
        category,
        images
    ) {

        if (!images.length) {
            return "";
        }


        const cards =
            images
                .map(
                    (src, index) => {

                        return `

                        <article
                            class="project ${
                                index < 4
                                    ? "visible"
                                    : ""
                            }"
                        >

                            <div class="project-media">

                                <img
                                    src="${src}"
                                    alt="${category.title} ${
                                        index + 1
                                    }"
                                    loading="${
                                        index < 4
                                            ? "eager"
                                            : "lazy"
                                    }"
                                >

                            </div>

                            <div class="project-info">

                                <span class="project-number">
                                    ${String(
                                        index + 1
                                    ).padStart(2, "0")}
                                </span>

                                <h3>
                                    ${category.title}
                                </h3>

                            </div>

                        </article>

                        `;

                    }
                )
                .join("");


        const showMore =
            images.length > 4
                ? `

                    <button
                        type="button"
                        class="show-more"
                    >
                        <span>
                            SHOW MORE
                        </span>

                        <b>+</b>

                    </button>

                  `
                : "";


        return `

            <section
                class="portfolio-section reveal"
            >

                <div class="container">

                    <div class="section-head">

                        <div>

                            <p class="eyebrow">
                                ${category.title}
                            </p>

                            <h2>
                                ${category.title}
                            </h2>

                        </div>

                        <p class="section-description">
                            ${category.description}
                        </p>

                    </div>


                    <div class="projects">

                        ${cards}

                    </div>


                    ${showMore}

                </div>

            </section>

        `;

    }


    /* =========================================
       BUILD PORTFOLIO
    ========================================= */

    async function buildPortfolio() {

        if (!portfolio) {
            return;
        }


        /*
           Check ALL categories at the
           same time.
        */

        const results =
            await Promise.all(

                categories.map(
                    async category => {

                        const images =
                            await findImages(
                                category.key
                            );


                        return {
                            category,
                            images
                        };

                    }
                )

            );


        const output =
            results
                .map(
                    item =>
                        createCategory(
                            item.category,
                            item.images
                        )
                )
                .join("");


        portfolio.innerHTML =
            output;


        setupShowMore();

        setupReveal();

    }


    /* =========================================
       SHOW MORE / SHOW LESS
    ========================================= */

    function setupShowMore() {

        document
            .querySelectorAll(
                ".show-more"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const section =
                            button.closest(
                                ".portfolio-section"
                            );


                        if (!section) {
                            return;
                        }


                        const projects =
                            section.querySelectorAll(
                                ".project"
                            );


                        const expanded =
                            section.classList.toggle(
                                "expanded"
                            );


                        projects.forEach(
                            (project, index) => {

                                if (
                                    index >= 4
                                ) {

                                    project.classList.toggle(
                                        "visible",
                                        expanded
                                    );

                                }

                            }
                        );


                        const text =
                            button.querySelector(
                                "span"
                            );


                        const icon =
                            button.querySelector(
                                "b"
                            );


                        if (expanded) {

                            if (text) {
                                text.textContent =
                                    "SHOW LESS";
                            }

                            if (icon) {
                                icon.textContent =
                                    "−";
                            }

                        }

                        else {

                            if (text) {
                                text.textContent =
                                    "SHOW MORE";
                            }

                            if (icon) {
                                icon.textContent =
                                    "+";
                            }


                            section.scrollIntoView({
                                behavior:
                                    "smooth",
                                block:
                                    "start"
                            });

                        }

                    }
                );

            });

    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    function setupReveal() {

        const elements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            !(
                "IntersectionObserver"
                in window
            )
        ) {

            elements.forEach(
                element => {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );

            return;

        }


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        elements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    }


    /* =========================================
       BUTTON CLICK EFFECT
    ========================================= */

    document
        .querySelectorAll(
            ".button, .show-more, .theme-toggle"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.remove(
                        "clicked"
                    );


                    void button.offsetWidth;


                    button.classList.add(
                        "clicked"
                    );

                }
            );

        });


    /* =========================================
       SMOOTH ANCHOR NAVIGATION
    ========================================= */

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
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            "smooth"
                    });

                }
            );

        });


    /* =========================================
       CONTACT FORM
    ========================================= */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const status =
                    document.getElementById(
                        "formStatus"
                    );


                if (status) {

                    status.textContent =
                        "Your message is ready to be sent.";

                }

            }
        );

    }


    /* =========================================
       START
    ========================================= */

    buildPortfolio();

});
