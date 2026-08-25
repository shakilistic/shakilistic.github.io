document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       YEAR
    ============================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ==============================
       THEME
       AUTO → LIGHT → DARK → AUTO
    ============================== */

    const themeToggle = document.getElementById("themeToggle");
    const themeLabel = document.getElementById("themeLabel");
    const themeIcon = document.querySelector(".theme-icon");

    let currentTheme =
        localStorage.getItem("shakilstic-theme") || "auto";


    function systemTheme() {
        return window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches ? "dark" : "light";
    }


    function applyTheme(mode) {

        const actualTheme =
            mode === "auto" ? systemTheme() : mode;

        document.documentElement.setAttribute(
            "data-theme",
            actualTheme
        );


        if (themeLabel) {
            themeLabel.textContent =
                mode.toUpperCase();
        }


        if (themeIcon) {

            if (mode === "auto") {
                themeIcon.textContent = "◐";
            }

            else if (mode === "light") {
                themeIcon.textContent = "☀";
            }

            else {
                themeIcon.textContent = "☾";
            }
        }
    }


    applyTheme(currentTheme);


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            if (currentTheme === "auto") {
                currentTheme = "light";
            }

            else if (currentTheme === "light") {
                currentTheme = "dark";
            }

            else {
                currentTheme = "auto";
            }


            localStorage.setItem(
                "shakilstic-theme",
                currentTheme
            );


            applyTheme(currentTheme);


            themeToggle.classList.remove("clicked");

            void themeToggle.offsetWidth;

            themeToggle.classList.add("clicked");
        });
    }


    /* Browser theme changes while AUTO */

    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).addEventListener("change", () => {

        if (currentTheme === "auto") {
            applyTheme("auto");
        }

    });


    /* ==============================
       SCROLL REVEAL
    ============================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        /*
                           IMPORTANT:
                           CSS uses .is-visible
                        */

                        entry.target.classList.add(
                            "is-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }

    else {

        revealElements.forEach(element => {

            element.classList.add("is-visible");

        });

    }


    /* ==============================
       SHOW MORE / SHOW LESS
    ============================== */

    document
        .querySelectorAll(".show-more")
        .forEach(button => {

            button.addEventListener("click", () => {

                const target =
                    button.dataset.target;

                const grid =
                    document.getElementById(target);


                if (!grid) {
                    return;
                }


                const expanded =
                    grid.classList.toggle("expanded");


                const buttonText =
                    button.querySelector(
                        ".show-more-text"
                    );


                const icon =
                    button.querySelector("span");


                if (expanded) {

                    if (buttonText) {
                        buttonText.textContent =
                            "SHOW LESS";
                    }

                    if (icon) {
                        icon.textContent = "−";
                    }

                }

                else {

                    if (buttonText) {
                        buttonText.textContent =
                            "SHOW MORE";
                    }

                    if (icon) {
                        icon.textContent = "+";
                    }


                    const category =
                        button.closest(
                            ".category-block"
                        );


                    if (category) {

                        category.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            });

        });


    /* ==============================
       CUSTOM CURSOR
    ============================== */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorRing =
        document.querySelector(".cursor-ring");


    if (
        cursorDot &&
        cursorRing &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;


                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        function moveRing() {

            ringX +=
                (mouseX - ringX) * 0.14;

            ringY +=
                (mouseY - ringY) * 0.14;


            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;


            requestAnimationFrame(
                moveRing
            );

        }


        moveRing();


        document
            .querySelectorAll(
                "a, button, .project, input, textarea, select"
            )
            .forEach(element => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        document.body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        document.body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            });

    }


    /* ==============================
       BUTTON CLICK EFFECT
    ============================== */

    document
        .querySelectorAll(
            ".button, .submit-button, .show-more, .theme-toggle"
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


    /* ==============================
       SMOOTH NAVIGATION
    ============================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute("href");


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* ==============================
       ACTIVE NAV
    ============================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            "nav a"
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const navObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${entry.target.id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-40% 0px -50% 0px"
                }
            );


        sections.forEach(section => {

            navObserver.observe(section);

        });

    }


    /* ==============================
       CONTACT FORM
    ============================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formStatus =
        document.getElementById(
            "formStatus"
        );


    /*
       GOOGLE APPS SCRIPT URL
       Will be added later.
    */

    const GOOGLE_SCRIPT_URL = "";


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const honeypot =
                    contactForm.querySelector(
                        '[name="website"]'
                    );


                if (
                    honeypot &&
                    honeypot.value.trim()
                ) {

                    return;

                }


                if (
                    !contactForm.checkValidity()
                ) {

                    contactForm.reportValidity();

                    return;

                }


                const submitButton =
                    contactForm.querySelector(
                        ".submit-button"
                    );


                const originalText =
                    submitButton
                        ? submitButton.innerHTML
                        : "SEND";


                if (!GOOGLE_SCRIPT_URL) {

                    if (formStatus) {

                        formStatus.textContent =
                            "The contact form is ready. Google Sheet connection will be added next.";

                        formStatus.className =
                            "form-status info";

                    }

                    return;
                }


                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent =
                        "SENDING...";
                }


                try {

                    const formData =
                        new FormData(
                            contactForm
                        );


                    await fetch(
                        GOOGLE_SCRIPT_URL,
                        {
                            method: "POST",
                            body: formData,
                            mode: "no-cors"
                        }
                    );


                    contactForm.reset();


                    if (formStatus) {

                        formStatus.textContent =
                            "Thank you. Your message has been sent.";

                        formStatus.className =
                            "form-status success";

                    }

                }

                catch (error) {

                    console.error(error);


                    if (formStatus) {

                        formStatus.textContent =
                            "Something went wrong. Please try again.";

                        formStatus.className =
                            "form-status error";

                    }

                }

                finally {

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            originalText;

                    }

                }

            }
        );

    }


    /* ==============================
       PAGE READY
    ============================== */

    document.body.classList.add(
        "page-ready"
    );

});
