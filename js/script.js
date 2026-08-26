/* =========================================================
   SHAKIL R. PORTFOLIO
   COMPLETE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SETTINGS
    ===================================================== */

    const SETTINGS = {

        /*
         * CHANGE YOUR SOCIAL LINKS HERE
         */

        behance:
            "https://www.behance.net/",

        linkedin:
            "https://www.linkedin.com/",

        x:
            "https://x.com/",


        /*
         * GOOGLE APPS SCRIPT
         *
         * Keep your existing deployed URL here.
         * If your existing form already worked, paste
         * the SAME URL you were using before.
         */

        googleScript:
            "",

    };


    /* =====================================================
       IMAGE EXTENSIONS
    ===================================================== */

    const extensions = [
        "jpg",
        "jpeg",
        "png",
        "webp"
    ];


    /* =====================================================
       IMAGE AUTO LOADER
       
       B1.jpg
       B2.jpg
       B3.png

       L1.jpg
       L2.webp

       W1.jpg
       S1.png
       P1.jpg
    ===================================================== */

    function createImageSlots(container) {

        if (!container) return;


        const type =
            container.dataset.type;

        const count =
            Number(container.dataset.count || 20);


        for (let i = 1; i <= count; i++) {

            const card =
                document.createElement("article");

            card.className =
                "project-card";


            /*
             * We initially create the image element.
             * If none of the extensions exists,
             * the card automatically disappears.
             */

            const img =
                document.createElement("img");


            img.alt =
                `${type}${i}`;


            let extensionIndex = 0;


            function tryNextExtension() {

                if (extensionIndex >= extensions.length) {

                    card.remove();

                    return;
                }


                const ext =
                    extensions[extensionIndex];


                extensionIndex++;


                img.src =
                    `assets/images/${type}${i}.${ext}`;

            }


            img.onerror =
                tryNextExtension;


            img.onload =
                () => {

                    card.classList.remove("empty");

                };


            card.classList.add("empty");


            card.appendChild(img);

            container.appendChild(card);


            tryNextExtension();

        }

    }


    /* =====================================================
       LOAD ALL PORTFOLIO IMAGES
    ===================================================== */

    document
        .querySelectorAll(".image-grid")
        .forEach(createImageSlots);


    /* =====================================================
       TESTIMONIALS
    ===================================================== */

    const testimonials = [

        {
            name:
                "Dr. Erlinda Asa Sabili",

            role:
                "MD, FACP",

            initials:
                "EA",

            text:
                "Hi Shakil! I just wanted to take a moment to sincerely thank you for the outstanding work you've done on the cover and design for my Balance Exercise for Seniors Simplified. The attention to detail, creativity, and professionalism you brought to this project truly exceeded my expectations. I've received many compliments on how beautiful and impactful the design is. It has made a big difference in the presentation of the book, and I couldn't be happier with the result. I also want you to know that I will definitely be working with you again on my upcoming projects. Your talent and reliability have made this an easy decision. Thank you once again for helping bring my vision to life. I look forward to collaborating with you on future books!"
        }

        /*
         * IMPORTANT:
         *
         * Add ONLY real client testimonials here.
         *
         * Example:
         *
         * {
         *     name: "Client Name",
         *     role: "Company / Role",
         *     initials: "CN",
         *     text: "Exact client feedback..."
         * }
         *
         */

    ];


    const testimonialGrid =
        document.getElementById(
            "testimonialGrid"
        );


    function renderTestimonials() {

        if (!testimonialGrid) return;


        testimonialGrid.innerHTML = "";


        if (!testimonials.length) {

            return;

        }


        testimonials.forEach(
            (item, index) => {

                const card =
                    document.createElement("article");


                card.className =
                    "testimonial-card";


                card.innerHTML = `

                    <div class="stars">
                        ★★★★★
                    </div>

                    <p class="testimonial-text">
                        ${escapeHTML(item.text)}
                    </p>

                    <div class="testimonial-author">

                        <div class="author-avatar">
                            ${escapeHTML(item.initials)}
                        </div>

                        <div>

                            <div class="author-name">
                                ${escapeHTML(item.name)}
                            </div>

                            <div class="author-role">
                                ${escapeHTML(item.role)}
                            </div>

                        </div>

                    </div>

                `;


                testimonialGrid.appendChild(card);

            }
        );

    }


    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    renderTestimonials();


    /* =====================================================
       CURRENTLY WORKING ON
       
       L1 = first logo
       L2 = second logo
       ...
       
       It displays 6 at a time.
       Auto slides continuously.
       Mouse hover pauses.
       Arrow buttons work.
    ===================================================== */

    const profileTrack =
        document.getElementById(
            "profileTrack"
        );


    const profilePrev =
        document.getElementById(
            "profilePrev"
        );


    const profileNext =
        document.getElementById(
            "profileNext"
        );


    const profileWindow =
        document.querySelector(
            ".profile-window"
        );


    const PROFILE_COUNT = 20;


    let profileIndex = 0;

    let profileTimer = null;

    let profilePaused = false;


    function buildProfiles() {

        if (!profileTrack) return;


        profileTrack.innerHTML = "";


        for (
            let i = 1;
            i <= PROFILE_COUNT;
            i++
        ) {

            const item =
                document.createElement("div");


            item.className =
                "profile-item";


            const img =
                document.createElement("img");


            img.alt =
                `Profile ${i}`;


            let extIndex = 0;


            function tryProfileImage() {

                if (
                    extIndex >=
                    extensions.length
                ) {

                    item.remove();

                    return;

                }


                img.src =
                    `assets/images/L${i}.${extensions[extIndex]}`;

                extIndex++;

            }


            img.onerror =
                tryProfileImage;


            item.appendChild(img);

            profileTrack.appendChild(item);


            tryProfileImage();

        }

    }


    buildProfiles();


    /*
     * Get visible profile count.
     */

    function visibleProfileCount() {

        if (
            window.innerWidth <= 600
        ) {

            return 3;

        }


        if (
            window.innerWidth <= 900
        ) {

            return 4;

        }


        return 6;

    }


    function getProfileStep() {

        const first =
            profileTrack.querySelector(
                ".profile-item"
            );


        if (!first) return 0;


        const gap =
            parseFloat(
                getComputedStyle(
                    profileTrack
                ).gap
            ) || 0;


        return first.offsetWidth + gap;

    }


    function moveProfiles(
        direction = 1
    ) {

        const items =
            profileTrack.querySelectorAll(
                ".profile-item"
            );


        if (!items.length) return;


        const visible =
            visibleProfileCount();


        const maxIndex =
            Math.max(
                0,
                items.length - visible
            );


        profileIndex += direction;


        /*
         * Continuous loop
         */

        if (
            profileIndex >
            maxIndex
        ) {

            profileIndex = 0;

        }


        if (
            profileIndex < 0
        ) {

            profileIndex =
                maxIndex;

        }


        const step =
            getProfileStep();


        profileTrack.style.transform =
            `translate3d(-${profileIndex * step}px,0,0)`;

    }


    profileNext?.addEventListener(
        "click",
        () => {

            moveProfiles(1);

        }
    );


    profilePrev?.addEventListener(
        "click",
        () => {

            moveProfiles(-1);

        }
    );


    /*
     * Auto slide
     */

    function startProfileAutoSlide() {

        clearInterval(
            profileTimer
        );


        profileTimer =
            setInterval(
                () => {

                    if (!profilePaused) {

                        moveProfiles(1);

                    }

                },
                2200
            );

    }


    profileWindow?.addEventListener(
        "mouseenter",
        () => {

            profilePaused = true;

        }
    );


    profileWindow?.addEventListener(
        "mouseleave",
        () => {

            profilePaused = false;

        }
    );


    startProfileAutoSlide();


    window.addEventListener(
        "resize",
        () => {

            profileIndex = 0;

            if (profileTrack) {

                profileTrack.style.transform =
                    "translate3d(0,0,0)";

            }

        }
    );


    /* =====================================================
       BACK TO TOP
       
       Fixed position.
       Appears after scrolling.
       Works from ANY point on page.
    ===================================================== */

    const backTop =
        document.getElementById(
            "backTop"
        );


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


    backTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    updateBackTop();


    /* =====================================================
       THEME TOGGLE
       
       ICON ONLY.
       No "LIGHT / DARK" text.
    ===================================================== */

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    const savedTheme =
        localStorage.getItem(
            "shakil-theme"
        );


    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light"
        );

        themeToggle.querySelector(
            ".theme-icon"
        ).textContent = "☾";

    }


    themeToggle?.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light"
            );


            const isLight =
                document.body.classList.contains(
                    "light"
                );


            localStorage.setItem(
                "shakil-theme",
                isLight
                    ? "light"
                    : "dark"
            );


            themeToggle.querySelector(
                ".theme-icon"
            ).textContent =
                isLight
                    ? "☾"
                    : "☼";

        }
    );


    /* =====================================================
       SOCIAL LINKS
    ===================================================== */

    const behance =
        document.getElementById(
            "behanceLink"
        );


    const linkedin =
        document.getElementById(
            "linkedinLink"
        );


    const xLink =
        document.getElementById(
            "xLink"
        );


    if (behance)
        behance.href =
            SETTINGS.behance;


    if (linkedin)
        linkedin.href =
            SETTINGS.linkedin;


    if (xLink)
        xLink.href =
            SETTINGS.x;


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".portfolio-category, .testimonial-card, .about-grid, .profiles-section, .contact-box"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "reveal",
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

            revealObserver.observe(
                element
            );

        }
    );


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


    if (
        cursorDot &&
        cursorRing &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

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


                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        function animateCursor() {

            ringX +=
                (mouseX - ringX) * .15;

            ringY +=
                (mouseY - ringY) * .15;


            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        document
            .querySelectorAll(
                "a, button, .project-card, .profile-item"
            )
            .forEach(
                element => {

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

                }
            );

    }


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


    contactForm?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (
                !SETTINGS.googleScript
            ) {

                formStatus.textContent =
                    "Please configure the Google Apps Script URL.";

                return;

            }


            const submit =
                contactForm.querySelector(
                    ".submit-button"
                );


            submit.disabled = true;


            formStatus.textContent =
                "Sending...";


            try {

                const formData =
                    new FormData(
                        contactForm
                    );


                await fetch(
                    SETTINGS.googleScript,
                    {
                        method: "POST",

                        mode: "no-cors",

                        body: formData
                    }
                );


                formStatus.textContent =
                    "Thank you. Your message has been sent.";

                contactForm.reset();


            } catch (error) {

                formStatus.textContent =
                    "Something went wrong. Please try again.";

            }


            submit.disabled = false;

        }
    );


});
