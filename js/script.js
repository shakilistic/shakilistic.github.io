/* =========================================================
   SHAKIL R. PORTFOLIO
   SAFE CONTENT SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const CONFIG = {

        /*
         * Profile image
         */
        profileImage: "assets/images/profile.jpg",


        /*
         * IMPORTANT:
         *
         * এখানে তোমার portfolio images-এর নাম বসাবে।
         *
         * Example:
         * B1.jpg
         * B2.jpg
         * B3.jpg
         *
         * যদি তোমার file PNG হয়:
         * B1.png
         */

        galleries: {

            bookCovers: [
                "assets/images/B1.jpg",
                "assets/images/B2.jpg",
                "assets/images/B3.jpg",
                "assets/images/B4.jpg",
                "assets/images/B5.jpg",
                "assets/images/B6.jpg",
                "assets/images/B7.jpg"
            ],

            webDesign: [
                "assets/images/W1.jpg",
                "assets/images/W2.jpg",
                "assets/images/W3.jpg",
                "assets/images/W4.jpg",
                "assets/images/W5.jpg",
                "assets/images/W6.jpg"
            ],

            socialMedia: [
                "assets/images/S1.jpg",
                "assets/images/S2.jpg",
                "assets/images/S3.jpg",
                "assets/images/S4.jpg",
                "assets/images/S5.jpg",
                "assets/images/S6.jpg"
            ],

            logoDesign: [
                "assets/images/L1.jpg",
                "assets/images/L2.jpg",
                "assets/images/L3.jpg",
                "assets/images/L4.jpg",
                "assets/images/L5.jpg",
                "assets/images/L6.jpg"
            ],

            printMedia: [
                "assets/images/P1.jpg",
                "assets/images/P2.jpg",
                "assets/images/P3.jpg",
                "assets/images/P4.jpg",
                "assets/images/P5.jpg",
                "assets/images/P6.jpg"
            ]

        },


        /*
         * ACTIVE PLATFORM LOGOS
         */

        activeProfiles: [

            {
                name: "Behance",
                image: "assets/images/behance.png"
            },

            {
                name: "Freelancer",
                image: "assets/images/freelancer.png"
            },

            {
                name: "Upwork",
                image: "assets/images/upwork.png"
            },

            {
                name: "Fiverr",
                image: "assets/images/fiverr.png"
            },

            {
                name: "99designs",
                image: "assets/images/99designs.png"
            },

            {
                name: "Dribbble",
                image: "assets/images/dribbble.png"
            }

        ],


        /*
         * CLIENT FEEDBACK
         *
         * এখানে তোমার existing Blogger feedbackগুলো
         * বসানো যাবে।
         */

        testimonials: [

            {
                text: `Hi Shakil, I just wanted to take a moment to sincerely thank you for the outstanding work you've done on the cover and design for my Balance Exercise for Seniors Simplified. The attention to detail, creativity, and professionalism you brought to this project truly exceeded my expectations. I've received many compliments on how beautiful and impactful the design is. It has made a big difference in the presentation of the book, and I couldn't be happier with the result. I also want you to know that I will definitely be working with you again on my upcoming projects. Your talent and reliability have made this an easy decision. Thank you once again for helping bring my vision to life. I look forward to collaborating with you on future books!`,
                author: "Dr. Erlinda Asa Sabili, MD, FACP"
            },

            {
                text: `Shakil is so easy to work with, responsive, and has a fantastic eye. This is our second project together, and it's getting better and better.`,
                author: "Client"
            },

            {
                text: `I am so pleased with my designer. They had creative ideas that were not like the rest in my niche. I look forward to working with this designer in the future.`,
                author: "Julie"
            },

            {
                text: `The best of the best - I've worked with Shakil for around a year now, give or take. He is one of the most helpful, responsive, and creatively quick freelancers I've ever worked with.`,
                author: "Anonymous Client"
            },

            {
                text: `The base of the book - I've worked with Shakil for around a year now. His work is always beautiful, responsive, and creatively quick.`,
                author: "Returning Client"
            },

            {
                text: `Shakil is the best designer we have worked with. His ideas, communication and execution always make the final project stronger.`,
                author: "Client"
            },

            {
                text: `Shakil is always a pleasure to work with. He understands feedback quickly and delivers strong visual solutions.`,
                author: "Client"
            },

            {
                text: `The level of attention and professionalism Shakil brings to every project makes collaboration easy and enjoyable.`,
                author: "Client"
            },

            {
                text: `I had an exceptional experience working with Shakil on the cover design for my book. His creativity, responsiveness and attention to detail made the entire process smooth.`,
                author: "Book Client"
            },

            {
                text: `Shakil is absolutely fantastic. He understood the brief, improved the concept and delivered a polished final design.`,
                author: "Client"
            }

        ]

    };


    /* =====================================================
       THEME
       Automatic according to OS.
       NO manual theme button.
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    const systemTheme = window.matchMedia("(prefers-color-scheme: light)");

    function applySystemTheme() {

        if (systemTheme.matches) {
            document.body.classList.add("light-theme");
        } else {
            document.body.classList.remove("light-theme");
        }

    }

    applySystemTheme();

    systemTheme.addEventListener("change", applySystemTheme);

    /*
     * Keep the button visually harmless.
     * It does NOT manually change theme.
     */

    if (themeToggle) {

        themeToggle.setAttribute(
            "aria-label",
            "Theme follows your device settings"
        );

        themeToggle.addEventListener("click", () => {
            applySystemTheme();
        });

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (mobileMenuButton && mobileMenu) {

        mobileMenuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("open");

        });

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

            });

        });

    }


    /* =====================================================
       PROFILE IMAGE
    ===================================================== */

    const profileImage =
        document.querySelector(".hero-image");

    if (profileImage) {

        profileImage.src = CONFIG.profileImage;

    }


    /* =====================================================
       IMAGE HELPER
    ===================================================== */

    function createImageCard(src, index, galleryName) {

        const card =
            document.createElement("div");

        card.className = "portfolio-card";

        const image =
            document.createElement("img");

        image.alt =
            `${galleryName} design ${index + 1}`;

        image.loading = "lazy";

        image.src = src;

        /*
         * If image doesn't exist, hide ONLY this image card.
         * It will NOT hide the whole website section.
         */

        image.addEventListener("error", () => {

            card.remove();

            updateSliderNavigation(
                card.closest(".portfolio-slider")
            );

        });

        card.appendChild(image);

        return card;

    }


    /* =====================================================
       PORTFOLIO GALLERY
    ===================================================== */

    function setupGallery(galleryName, images) {

        const track =
            document.querySelector(
                `[data-gallery="${galleryName}"]`
            );

        if (!track) return;

        /*
         * Clear ONLY this gallery track.
         *
         * Nothing else on the page is touched.
         */

        track.innerHTML = "";

        const validImages = [];

        images.forEach((src, index) => {

            const card =
                createImageCard(
                    src,
                    index,
                    galleryName
                );

            track.appendChild(card);

            validImages.push(card);

        });

        const slider =
            track.closest(".portfolio-slider");

        if (!slider) return;

        const previous =
            slider.querySelector(".slider-arrow.prev");

        const next =
            slider.querySelector(".slider-arrow.next");

        function scrollAmount() {

            const card =
                track.querySelector(".portfolio-card");

            if (!card) return 0;

            const style =
                window.getComputedStyle(track);

            const gap =
                parseFloat(style.columnGap || style.gap || 0);

            return card.offsetWidth + gap;

        }

        if (previous) {

            previous.addEventListener("click", () => {

                track.scrollBy({
                    left: -scrollAmount(),
                    behavior: "smooth"
                });

            });

        }

        if (next) {

            next.addEventListener("click", () => {

                track.scrollBy({
                    left: scrollAmount(),
                    behavior: "smooth"
                });

            });

        }

        updateSliderNavigation(slider);

        window.addEventListener(
            "resize",
            () => updateSliderNavigation(slider)
        );

    }


    /* =====================================================
       SLIDER NAVIGATION
    ===================================================== */

    function updateSliderNavigation(slider) {

        if (!slider) return;

        const track =
            slider.querySelector(".portfolio-track");

        if (!track) return;

        const cards =
            track.querySelectorAll(".portfolio-card");

        /*
         * Less than or equal to the number that can fit:
         * arrows hidden.
         */

        if (cards.length <= 1) {

            slider.classList.add("no-navigation");

            return;

        }

        /*
         * Check whether horizontal overflow exists.
         */

        if (track.scrollWidth <= track.clientWidth + 5) {

            slider.classList.add("no-navigation");

        } else {

            slider.classList.remove("no-navigation");

        }

    }


    /* =====================================================
       LOAD ALL PORTFOLIO SECTIONS
    ===================================================== */

    Object.entries(CONFIG.galleries).forEach(
        ([galleryName, images]) => {

            setupGallery(
                galleryName,
                images
            );

        }
    );


    /* =====================================================
       TESTIMONIALS
    ===================================================== */

    const testimonialTrack =
        document.getElementById("testimonialTrack");

    let testimonialIndex = 0;
    let testimonialTimer = null;
    let testimonialPaused = false;

    function createTestimonials() {

        if (!testimonialTrack) return;

        testimonialTrack.innerHTML = "";

        CONFIG.testimonials.forEach(
            (item, index) => {

                const card =
                    document.createElement("article");

                card.className =
                    "testimonial-card";

                const stars =
                    document.createElement("div");

                stars.className =
                    "testimonial-stars";

                stars.textContent =
                    "★★★★★";

                const text =
                    document.createElement("p");

                text.className =
                    "testimonial-text";

                const author =
                    document.createElement("div");

                author.className =
                    "testimonial-author";

                author.textContent =
                    "— " + item.author;

                text.textContent =
                    item.text;

                card.appendChild(stars);
                card.appendChild(text);
                card.appendChild(author);

                /*
                 * Only add See More when the text is actually
                 * larger than the normal card area.
                 */

                requestAnimationFrame(() => {

                    if (
                        text.scrollHeight >
                        text.clientHeight + 5
                    ) {

                        const button =
                            document.createElement("button");

                        button.className =
                            "testimonial-more";

                        button.type = "button";

                        button.textContent =
                            "SEE MORE";

                        button.addEventListener(
                            "click",
                            () => {

                                card.classList.toggle(
                                    "expanded"
                                );

                                button.textContent =
                                    card.classList.contains(
                                        "expanded"
                                    )
                                        ? "SEE LESS"
                                        : "SEE MORE";

                            }
                        );

                        card.appendChild(button);

                    }

                });

                testimonialTrack.appendChild(card);

            }
        );

    }

    createTestimonials();


    /* =====================================================
       TESTIMONIAL RESPONSIVE POSITION
    ===================================================== */

    function testimonialVisibleCount() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 4;

    }


    function moveTestimonials(direction = 1) {

        if (!testimonialTrack) return;

        const cards =
            testimonialTrack.querySelectorAll(
                ".testimonial-card"
            );

        if (!cards.length) return;

        const visible =
            testimonialVisibleCount();

        const maxIndex =
            Math.max(
                0,
                cards.length - visible
            );

        testimonialIndex += direction;

        if (testimonialIndex > maxIndex) {
            testimonialIndex = 0;
        }

        if (testimonialIndex < 0) {
            testimonialIndex = maxIndex;
        }

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const gap =
            parseFloat(
                getComputedStyle(
                    testimonialTrack
                ).gap
            ) || 0;

        testimonialTrack.style.transform =
            `translateX(-${
                testimonialIndex *
                (cardWidth + gap)
            }px)`;

    }


    /* =====================================================
       TESTIMONIAL AUTO SLIDE
    ===================================================== */

    function startTestimonials() {

        stopTestimonials();

        testimonialTimer =
            setInterval(() => {

                if (!testimonialPaused) {
                    moveTestimonials(1);
                }

            }, 4200);

    }

    function stopTestimonials() {

        if (testimonialTimer) {

            clearInterval(testimonialTimer);

            testimonialTimer = null;

        }

    }

    const testimonialSlider =
        document.querySelector(".testimonial-slider");

    if (testimonialSlider) {

        testimonialSlider.addEventListener(
            "mouseenter",
            () => {
                testimonialPaused = true;
            }
        );

        testimonialSlider.addEventListener(
            "mouseleave",
            () => {
                testimonialPaused = false;
            }
        );

    }

    startTestimonials();


    /* =====================================================
       ACTIVE PLATFORM LOGOS
       No links.
       No arrows.
       No numbers.
       Pure automatic marquee.
    ===================================================== */

    const activeTrack =
        document.getElementById("activeTrack");

    function createActiveProfiles() {

        if (!activeTrack) return;

        activeTrack.innerHTML = "";

        /*
         * Duplicate the list to make the marquee seamless.
         */

        const profiles =
            [
                ...CONFIG.activeProfiles,
                ...CONFIG.activeProfiles
            ];

        profiles.forEach(profile => {

            const logo =
                document.createElement("div");

            logo.className =
                "active-logo";

            const image =
                document.createElement("img");

            image.src =
                profile.image;

            image.alt =
                profile.name;

            image.loading =
                "lazy";

            /*
             * If a logo doesn't exist,
             * remove only that logo.
             */

            image.addEventListener(
                "error",
                () => logo.remove()
            );

            logo.appendChild(image);

            /*
             * IMPORTANT:
             * no href
             * no click
             * no external website
             */

            activeTrack.appendChild(logo);

        });

    }

    createActiveProfiles();


    /* =====================================================
       BACK TO TOP
       Fixed position.
       Does not move with section.
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    }

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();

    if (backToTop) {

        backToTop.addEventListener(
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
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                if (formStatus) {

                    formStatus.textContent =
                        "Thank you. Your enquiry is ready to be sent.";

                }

                /*
                 * Keep the existing form behavior safe.
                 * If you already have a Google Apps Script endpoint,
                 * connect it here.
                 */

            }
        );

    }


    /* =====================================================
       PREVENT IMAGE CLICK OPENING
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const image =
                event.target.closest(
                    ".portfolio-card img"
                );

            if (!image) return;

            /*
             * Images are display-only.
             * They do NOT open another page/window.
             */

            event.preventDefault();

        }
    );


    /* =====================================================
       REMOVE UNWANTED OLD SERIAL LABELS
       ONLY IF THEY EXIST.
    ===================================================== */

    function removeOldSerialLabels() {

        const selectors = [

            ".section-number",
            ".section-index",
            ".portfolio-number",
            ".work-number",
            ".category-number",
            ".section-counter"

        ];

        selectors.forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.remove();

                });

        });

    }

    removeOldSerialLabels();


    /* =====================================================
       REMOVE OLD INSTRUCTION TEXT
       ONLY KNOWN OLD LABELS.
    ===================================================== */

    function removeOldInstructionText() {

        const unwanted = [

            "YOUR MESSAGE GOES DIRECTLY TO THE PROJECT ENQUIRY SHEET.",
            "CLICK TO VIEW ORIGINAL",
            "VIEW ORIGINAL"

        ];

        document
            .querySelectorAll("body *")
            .forEach(element => {

                if (
                    element.children.length === 0 &&
                    unwanted.includes(
                        element.textContent.trim()
                    )
                ) {

                    element.remove();

                }

            });

    }

    removeOldInstructionText();


    /* =====================================================
       KEEP INTERNAL HASH NAVIGATION FROM ADDING
       /home OR OTHER PATHS.
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
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

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    /*
                     * URL stays:
                     *
                     * https://shakilistic.github.io/
                     *
                     * instead of:
                     *
                     * /home
                     */

                    history.replaceState(
                        null,
                        "",
                        window.location.pathname
                    );

                }
            );

        });


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            document
                .querySelectorAll(
                    ".portfolio-slider"
                )
                .forEach(
                    updateSliderNavigation
                );

            testimonialIndex = 0;

            if (testimonialTrack) {

                testimonialTrack.style.transform =
                    "translateX(0)";

            }

        }
    );


    /* =====================================================
       FINAL INITIALIZATION
    ===================================================== */

    setTimeout(() => {

        document
            .querySelectorAll(
                ".portfolio-slider"
            )
            .forEach(
                updateSliderNavigation
            );

        updateBackToTop();

    }, 300);


});
