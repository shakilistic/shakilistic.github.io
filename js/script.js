/* =========================================
   SHAKILSTIC PORTFOLIO — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       YEAR
    ========================================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================================
       THEME SYSTEM
       AUTO → LIGHT → DARK → AUTO
    ========================================= */

    const themeToggle = document.getElementById("themeToggle");
    const themeLabel = document.getElementById("themeLabel");
    const themeIcon = document.querySelector(".theme-icon");

    const savedTheme = localStorage.getItem("shakilstic-theme");

    function getBrowserTheme() {
        return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function applyTheme(mode) {

        let actualTheme = mode;

        if (mode === "auto") {
            actualTheme = getBrowserTheme();
        }

        document.documentElement.setAttribute(
            "data-theme",
            actualTheme
        );

        if (themeLabel) {
            themeLabel.textContent = mode.toUpperCase();
        }

        if (themeIcon) {

            if (mode === "auto") {
                themeIcon.textContent = "◐";
            }

            if (mode === "light") {
                themeIcon.textContent = "☼";
            }

            if (mode === "dark") {
                themeIcon.textContent = "☾";
            }
        }

        localStorage.setItem(
            "shakilstic-theme",
            mode
        );
    }


    /*
       Default:
       AUTO = browser decides
    */

    let currentTheme = savedTheme || "auto";

    applyTheme(currentTheme);


    /*
       Button:
       AUTO → LIGHT → DARK → AUTO
    */

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

            applyTheme(currentTheme);

            themeToggle.classList.remove("clicked");

            void themeToggle.offsetWidth;

            themeToggle.classList.add("clicked");
        });
    }


    /*
       If user changes Windows/browser theme
       while AUTO is selected, update automatically.
    */

    const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );

    systemTheme.addEventListener("change", () => {

        const selected =
            localStorage.getItem("shakilstic-theme");

        if (selected === "auto" || !selected) {
            applyTheme("auto");
        }

    });


    /* =========================================
       SCROLL REVEAL ANIMATION
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================================
       SHOW MORE / SHOW LESS
    ========================================= */

    const showMoreButtons =
        document.querySelectorAll(".show-more");


    showMoreButtons.forEach(button => {

        const targetName =
            button.dataset.target;

        const category =
            document.querySelector(
                `[data-category="${targetName}"]`
            );

        if (!category) {
            return;
        }

        const extraProjects =
            category.querySelectorAll(".project.extra");


        /*
           Initially hide extra projects
        */

        extraProjects.forEach(project => {
            project.style.display = "none";
        });


        button.addEventListener("click", () => {

            const isOpen =
                button.classList.contains("open");


            if (!isOpen) {

                extraProjects.forEach(
                    (project, index) => {

                        project.style.display = "block";

                        project.animate(
                            [
                                {
                                    opacity: 0,
                                    transform:
                                        "translateY(25px)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "translateY(0)"
                                }
                            ],
                            {
                                duration: 450,
                                delay: index * 80,
                                easing:
                                    "cubic-bezier(.2,.8,.2,1)",
                                fill: "both"
                            }
                        );

                    }
                );


                button.classList.add("open");

                button.innerHTML =
                    'Show less <span>−</span>';

            }

            else {

                extraProjects.forEach(
                    project => {
                        project.style.display = "none";
                    }
                );


                button.classList.remove("open");

                button.innerHTML =
                    'Show more <span>+</span>';


                category.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       CUSTOM CURSOR
    ========================================= */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorRing =
        document.querySelector(".cursor-ring");


    /*
       Only enable on devices with a mouse
    */

    if (
        cursorDot &&
        cursorRing &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                cursorDot.style.left =
                    `${event.clientX}px`;

                cursorDot.style.top =
                    `${event.clientY}px`;


                cursorRing.animate(
                    {
                        left: `${event.clientX}px`,
                        top: `${event.clientY}px`
                    },
                    {
                        duration: 350,
                        fill: "forwards"
                    }
                );

            }
        );


        const interactiveElements =
            document.querySelectorAll(
                "a, button, input, textarea, select, .project"
            );


        interactiveElements.forEach(element => {

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


    /* =========================================
       MAGNETIC BUTTON EFFECT
    ========================================= */

    const magneticElements =
        document.querySelectorAll(".magnetic");


    magneticElements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                element.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform = "";

            }
        );

    });


    /* =========================================
       BUTTON CLICK EFFECT
    ========================================= */

    document.querySelectorAll(
        ".button, .submit-button, .show-more, .theme-toggle"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.classList.remove("clicked");

                void button.offsetWidth;

                button.classList.add("clicked");

            }
        );

    });


    /* =========================================
       SMOOTH ANCHOR NAVIGATION
    ========================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

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


    /* =========================================
       CONTACT FORM
    ========================================= */

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");


    /*
       IMPORTANT:
       We will put your Google Apps Script
       Web App URL here later.

       Example:

       const GOOGLE_SCRIPT_URL =
       "https://script.google.com/macros/s/XXXXX/exec";
    */

    const GOOGLE_SCRIPT_URL = "";


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                /*
                   Honeypot spam protection
                */

                const honeypot =
                    contactForm.querySelector(
                        '[name="website"]'
                    );


                if (
                    honeypot &&
                    honeypot.value.trim() !== ""
                ) {

                    return;

                }


                /*
                   Browser validation
                */

                if (!contactForm.checkValidity()) {

                    contactForm.reportValidity();

                    return;

                }


                const submitButton =
                    contactForm.querySelector(
                        ".submit-button"
                    );


                const originalText =
                    submitButton.innerHTML;


                /*
                   If Google Sheet URL isn't
                   connected yet
                */

                if (!GOOGLE_SCRIPT_URL) {

                    if (formStatus) {

                        formStatus.textContent =
                            "The enquiry form is ready. Google Sheet connection will be added next.";

                        formStatus.className =
                            "form-status info";

                    }

                    return;

                }


                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Sending...";


                const formData =
                    new FormData(contactForm);


                try {

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
                            "Thank you. Your enquiry has been sent successfully.";

                        formStatus.className =
                            "form-status success";

                    }


                }

                catch (error) {

                    console.error(error);


                    if (formStatus) {

                        formStatus.textContent =
                            "Something went wrong. Please try again or email me directly.";

                        formStatus.className =
                            "form-status error";

                    }

                }

                finally {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalText;

                }

            }
        );

    }


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            "nav a"
        );


    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                    });


                    const activeLink =
                        document.querySelector(
                            `nav a[href="#${entry.target.id}"]`
                        );


                    if (activeLink) {

                        activeLink.classList.add(
                            "active"
                        );

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(section => {
        navObserver.observe(section);
    });


    /* =========================================
       PAGE LOADED
    ========================================= */

    document.body.classList.add(
        "page-ready"
    );

});
