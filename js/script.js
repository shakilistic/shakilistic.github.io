/* =========================================================
   SHAKILISTIC PORTFOLIO — SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------------------------
       BASIC CONFIG
       --------------------------------------------------------- */

    const IMAGE_BASE = "assets/images/";

    const sections = {
        book: {
            id: "book-cover-design",
            prefix: "B",
            title: "BOOK COVER DESIGN."
        },

        web: {
            id: "static-web-design",
            prefix: "W",
            title: "STATIC WEB DESIGN & DEVELOP."
        },

        social: {
            id: "social-media-poster",
            prefix: "S",
            title: "SOCIAL MEDIA POSTER."
        },

        logo: {
            id: "logo-design",
            prefix: "L",
            title: "LOGO DESIGN."
        },

        print: {
            id: "print-media-design",
            prefix: "P",
            title: "PRINT MEDIA DESIGN."
        }
    };


    /* ---------------------------------------------------------
       HELPERS
       --------------------------------------------------------- */

    function getImageExtension(filename) {
        const match = filename.match(/\.(jpg|jpeg|png|webp|gif)$/i);
        return match ? match[1].toLowerCase() : "";
    }

    function naturalSort(a, b) {
        return a.localeCompare(b, undefined, {
            numeric: true,
            sensitivity: "base"
        });
    }

    function createImage(src, alt = "") {
        const img = document.createElement("img");

        img.src = src;
        img.alt = alt;
        img.loading = "lazy";
        img.decoding = "async";
        img.draggable = false;

        /*
         * Portfolio images are display-only.
         * Clicking them must NOT open another page/window.
         */
        img.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
        });

        return img;
    }


    /* ---------------------------------------------------------
       FIND IMAGES FROM GITHUB DIRECTORY
       --------------------------------------------------------- */

    async function getRepositoryFiles() {

        /*
         * GitHub API is used only once.
         * This avoids testing B1.jpg, B1.png, B1.webp,
         * B2.jpg, B2.png... etc individually.
         */

        const apiURL =
            "https://api.github.com/repos/shakilistic/shakilistic.github.io/contents/assets/images";

        try {

            const response = await fetch(apiURL, {
                headers: {
                    "Accept": "application/vnd.github+json"
                },
                cache: "force-cache"
            });

            if (!response.ok) {
                throw new Error("GitHub image directory unavailable.");
            }

            const files = await response.json();

            if (!Array.isArray(files)) {
                return [];
            }

            return files
                .filter(file => {
                    return file.type === "file" &&
                        /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name);
                })
                .sort((a, b) => naturalSort(a.name, b.name));

        } catch (error) {

            console.warn(
                "Could not load GitHub image directory:",
                error
            );

            return [];
        }
    }


    /* ---------------------------------------------------------
       MATCH SECTION IMAGES
       --------------------------------------------------------- */

    function getImagesForPrefix(files, prefix) {

        const pattern = new RegExp(
            "^" + prefix + "(\\d+)\\.(jpg|jpeg|png|webp|gif)$",
            "i"
        );

        return files
            .filter(file => pattern.test(file.name))
            .sort((a, b) => {

                const numberA =
                    parseInt(a.name.match(pattern)[1], 10);

                const numberB =
                    parseInt(b.name.match(pattern)[1], 10);

                return numberA - numberB;
            });
    }


    /* ---------------------------------------------------------
       CREATE PORTFOLIO CARD
       --------------------------------------------------------- */

    function createPortfolioCard(file, sectionTitle) {

        const card = document.createElement("article");

        card.className = "portfolio-card";

        const imageWrap = document.createElement("div");

        imageWrap.className = "portfolio-image-wrap";

        const image = createImage(
            IMAGE_BASE + file.name,
            sectionTitle
        );

        imageWrap.appendChild(image);
        card.appendChild(imageWrap);

        return card;
    }


    /* ---------------------------------------------------------
       PORTFOLIO SECTION BUILDER
       --------------------------------------------------------- */

    function buildPortfolioSection(
        sectionKey,
        files
    ) {

        const config = sections[sectionKey];

        if (!config) {
            return;
        }

        const section =
            document.getElementById(config.id);

        if (!section) {
            return;
        }

        const matchingFiles =
            getImagesForPrefix(files, config.prefix);


        /*
         * If there are no images,
         * automatically hide the whole section.
         */

        if (matchingFiles.length === 0) {

            section.style.display = "none";

            return;
        }

        section.style.display = "";


        /*
         * Find portfolio grid.
         */

        const grid =
            section.querySelector(
                ".portfolio-grid, .portfolio-items, .work-grid"
            );

        if (!grid) {
            return;
        }

        grid.innerHTML = "";


        /*
         * Initially show ONLY 3 designs.
         */

        const initialLimit = 3;

        matchingFiles.forEach((file, index) => {

            const card =
                createPortfolioCard(
                    file,
                    config.title
                );

            if (index >= initialLimit) {
                card.classList.add("portfolio-hidden");
            }

            grid.appendChild(card);
        });


        /*
         * Remove any old Show More / Show Less button.
         * Then create a fresh one only if needed.
         */

        const oldButton =
            section.querySelector(
                ".show-more-btn, .show-less-btn, .portfolio-toggle"
            );

        if (oldButton) {
            oldButton.remove();
        }


        if (matchingFiles.length > initialLimit) {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "portfolio-toggle show-more-btn";

            button.textContent =
                "SHOW MORE";


            button.addEventListener("click", () => {

                const hiddenCards =
                    grid.querySelectorAll(
                        ".portfolio-hidden"
                    );

                const isExpanded =
                    section.classList.contains(
                        "portfolio-expanded"
                    );


                if (!isExpanded) {

                    hiddenCards.forEach(card => {
                        card.classList.remove(
                            "portfolio-hidden"
                        );
                    });

                    section.classList.add(
                        "portfolio-expanded"
                    );

                    button.textContent =
                        "SHOW LESS";

                } else {

                    const cards =
                        grid.querySelectorAll(
                            ".portfolio-card"
                        );

                    cards.forEach((card, index) => {

                        if (index >= initialLimit) {
                            card.classList.add(
                                "portfolio-hidden"
                            );
                        }
                    });

                    section.classList.remove(
                        "portfolio-expanded"
                    );

                    button.textContent =
                        "SHOW MORE";

                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            });


            section.appendChild(button);
        }
    }


    /* ---------------------------------------------------------
       REMOVE UNWANTED OLD SECTION LABELS
       --------------------------------------------------------- */

    function removeOldNumberLabels() {

        const selectors = [
            ".section-number",
            ".section-index",
            ".category-number",
            ".eyebrow-number",
            ".portfolio-number"
        ];

        selectors.forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {
                    element.remove();
                });

        });


        /*
         * Remove labels such as:
         * 01 / BOOK COVERS
         * 02 / WEB DESIGN
         * 06 / CLIENT FEEDBACK
         */

        document
            .querySelectorAll("p, span, small, div")
            .forEach(element => {

                const text =
                    element.textContent.trim();

                if (
                    /^0\d\s*\/\s*/i.test(text) &&
                    (
                        text.includes("BOOK") ||
                        text.includes("WEB") ||
                        text.includes("SOCIAL") ||
                        text.includes("LOGO") ||
                        text.includes("PRINT") ||
                        text.includes("CLIENT") ||
                        text.includes("FEEDBACK")
                    )
                ) {
                    element.remove();
                }

            });
    }


    /* ---------------------------------------------------------
       DISABLE PORTFOLIO IMAGE LINKS
       --------------------------------------------------------- */

    function disablePortfolioLinks() {

        document
            .querySelectorAll(
                ".portfolio-card a, .portfolio-grid a, .work-grid a"
            )
            .forEach(link => {

                link.removeAttribute("href");
                link.removeAttribute("target");
                link.removeAttribute("rel");

                link.addEventListener(
                    "click",
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                );

            });
    }


    /* ---------------------------------------------------------
       CURRENTLY WORKING / ACTIVE LOGOS
       --------------------------------------------------------- */

    function setupActiveLogos() {

        const container =
            document.querySelector(
                ".active-logos, .profiles-slider, .platform-slider"
            );

        if (!container) {
            return;
        }


        /*
         * Remove arrows because the active-logo section
         * should be automatic only.
         */

        container
            .querySelectorAll(
                ".prev, .next, .arrow, .slider-arrow, .active-arrow"
            )
            .forEach(button => {
                button.remove();
            });


        /*
         * Disable links on active logos.
         */

        container
            .querySelectorAll("a")
            .forEach(link => {

                link.removeAttribute("href");
                link.removeAttribute("target");
                link.removeAttribute("rel");

                link.addEventListener(
                    "click",
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                );

            });


        /*
         * Automatic continuous movement.
         */

        container.classList.add(
            "active-logo-auto-slider"
        );


        let paused = false;

        container.addEventListener(
            "mouseenter",
            () => {
                paused = true;
                container.classList.add(
                    "slider-paused"
                );
            }
        );

        container.addEventListener(
            "mouseleave",
            () => {
                paused = false;
                container.classList.remove(
                    "slider-paused"
                );
            }
        );


        /*
         * Smooth continuous movement.
         */

        let position = 0;

        function animate() {

            if (!paused) {

                position -= 0.35;

                /*
                 * Reset after enough movement.
                 * CSS animation normally handles this,
                 * but this fallback keeps it moving.
                 */

                if (Math.abs(position) > 10000) {
                    position = 0;
                }

                container.style.setProperty(
                    "--active-slider-offset",
                    position + "px"
                );
            }

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }


    /* ---------------------------------------------------------
       CLIENT FEEDBACK
       --------------------------------------------------------- */

    function setupClientFeedback() {

        const section =
            document.querySelector(
                "#client-feedback, #what-clients-say, .client-feedback-section"
            );

        if (!section) {
            return;
        }


        /*
         * Remove old number/eyebrow labels.
         */

        section
            .querySelectorAll(
                ".section-number, .section-index, .eyebrow"
            )
            .forEach(element => {

                const text =
                    element.textContent.trim();

                if (
                    /^\d+\s*\/?/i.test(text) ||
                    /CLIENT FEEDBACK/i.test(text)
                ) {
                    element.remove();
                }
            });


        const cards =
            Array.from(
                section.querySelectorAll(
                    ".testimonial-card, .client-card, .feedback-card"
                )
            );


        if (cards.length === 0) {
            return;
        }


        /*
         * No arrows.
         */

        section
            .querySelectorAll(
                ".prev, .next, .arrow, .slider-arrow"
            )
            .forEach(element => {
                element.remove();
            });


        /*
         * Every feedback card is compact.
         */

        cards.forEach(card => {

            card.classList.add(
                "client-feedback-card"
            );


            /*
             * Find the actual text element.
             */

            const textElement =
                card.querySelector(
                    ".testimonial-text, .feedback-text, p"
                );

            if (!textElement) {
                return;
            }


            /*
             * Only add Show More if the review
             * actually contains more text than the
             * compact display height.
             */

            const originalText =
                textElement.textContent.trim();

            card.dataset.fullText =
                originalText;


            /*
             * Remove old buttons.
             */

            card
                .querySelectorAll(
                    ".show-more, .show-less, .feedback-toggle"
                )
                .forEach(button => {
                    button.remove();
                });


            /*
             * Temporarily limit text.
             */

            const computed =
                window.getComputedStyle(
                    textElement
                );

            const lineHeight =
                parseFloat(
                    computed.lineHeight
                ) || 20;

            const compactLines = 7;

            const compactHeight =
                lineHeight * compactLines;


            /*
             * Use actual scrollHeight after
             * temporarily applying the limit.
             */

            const previousMax =
                textElement.style.maxHeight;

            const previousOverflow =
                textElement.style.overflow;

            textElement.style.maxHeight =
                compactHeight + "px";

            textElement.style.overflow =
                "hidden";


            const needsMore =
                textElement.scrollHeight >
                compactHeight + 5;


            textElement.style.maxHeight =
                previousMax;

            textElement.style.overflow =
                previousOverflow;


            if (needsMore) {

                textElement.style.maxHeight =
                    compactHeight + "px";

                textElement.style.overflow =
                    "hidden";


                const button =
                    document.createElement(
                        "button"
                    );

                button.type = "button";

                button.className =
                    "feedback-toggle";

                button.textContent =
                    "SHOW MORE";


                button.addEventListener(
                    "click",
                    () => {

                        const expanded =
                            card.classList.contains(
                                "feedback-expanded"
                            );


                        if (!expanded) {

                            textElement.style.maxHeight =
                                "none";

                            textElement.style.overflow =
                                "visible";

                            card.classList.add(
                                "feedback-expanded"
                            );

                            button.textContent =
                                "SHOW LESS";

                        } else {

                            textElement.style.maxHeight =
                                compactHeight + "px";

                            textElement.style.overflow =
                                "hidden";

                            card.classList.remove(
                                "feedback-expanded"
                            );

                            button.textContent =
                                "SHOW MORE";
                        }

                    }
                );

                card.appendChild(button);
            }

        });


        /*
         * Automatic feedback slider.
         */

        section.classList.add(
            "feedback-auto-slider"
        );


        let paused = false;

        section.addEventListener(
            "mouseenter",
            () => {
                paused = true;
                section.classList.add(
                    "feedback-paused"
                );
            }
        );

        section.addEventListener(
            "mouseleave",
            () => {
                paused = false;
                section.classList.remove(
                    "feedback-paused"
                );
            }
        );


        /*
         * Mobile swipe support.
         */

        let startX = 0;
        let startY = 0;

        section.addEventListener(
            "touchstart",
            event => {

                if (!event.touches.length) {
                    return;
                }

                startX =
                    event.touches[0].clientX;

                startY =
                    event.touches[0].clientY;
            },
            {
                passive: true
            }
        );


        section.addEventListener(
            "touchend",
            event => {

                if (!event.changedTouches.length) {
                    return;
                }

                const endX =
                    event.changedTouches[0].clientX;

                const endY =
                    event.changedTouches[0].clientY;

                const diffX =
                    endX - startX;

                const diffY =
                    endY - startY;


                /*
                 * Only treat it as horizontal
                 * swipe when horizontal movement
                 * is stronger than vertical movement.
                 */

                if (
                    Math.abs(diffX) >
                    Math.abs(diffY) &&
                    Math.abs(diffX) > 40
                ) {

                    const track =
                        section.querySelector(
                            ".feedback-grid, .testimonials-grid, .client-feedback-grid"
                        );

                    if (!track) {
                        return;
                    }

                    const amount =
                        Math.abs(diffX);

                    track.scrollBy({
                        left:
                            diffX < 0
                                ? amount
                                : -amount,
                        behavior: "smooth"
                    });
                }

            },
            {
                passive: true
            }
        );
    }


    /* ---------------------------------------------------------
       THEME
       --------------------------------------------------------- */

    function setupSystemTheme() {

        /*
         * No manual theme button.
         * Theme follows operating system/browser.
         */

        const media =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            );


        function applyTheme() {

            document.documentElement
                .setAttribute(
                    "data-theme",
                    media.matches
                        ? "dark"
                        : "light"
                );
        }


        applyTheme();


        if (
            typeof media.addEventListener ===
            "function"
        ) {

            media.addEventListener(
                "change",
                applyTheme
            );

        } else if (
            typeof media.addListener ===
            "function"
        ) {

            media.addListener(
                applyTheme
            );
        }
    }


    /* ---------------------------------------------------------
       BACK TO TOP
       --------------------------------------------------------- */

    function setupBackToTop() {

        let button =
            document.querySelector(
                ".back-to-top"
            );


        /*
         * If an old Back To Top button exists,
         * use it.
         */

        if (!button) {
            return;
        }


        function updateVisibility() {

            if (
                window.scrollY >
                window.innerHeight * 0.35
            ) {

                button.classList.add(
                    "is-visible"
                );

            } else {

                button.classList.remove(
                    "is-visible"
                );
            }
        }


        window.addEventListener(
            "scroll",
            updateVisibility,
            {
                passive: true
            }
        );


        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


        updateVisibility();
    }


    /* ---------------------------------------------------------
       INTERNAL NAVIGATION
       --------------------------------------------------------- */

    function setupInternalNavigation() {

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(link => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#" ||
                    href === "#!"
                ) {
                    return;
                }


                link.addEventListener(
                    "click",
                    event => {

                        const target =
                            document.querySelector(
                                href
                            );

                        if (!target) {
                            return;
                        }

                        event.preventDefault();


                        /*
                         * IMPORTANT:
                         * Do NOT change browser URL.
                         *
                         * This means:
                         * shakilistic.github.io/
                         *
                         * stays exactly the same
                         * instead of becoming:
                         * /home
                         * /work
                         * /about
                         */

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            });
    }


    /* ---------------------------------------------------------
       MOBILE MENU
       --------------------------------------------------------- */

    function setupMobileMenu() {

        const menuButton =
            document.querySelector(
                ".mobile-menu-toggle, .menu-toggle"
            );

        const menu =
            document.querySelector(
                ".mobile-menu, .nav-menu"
            );


        if (!menuButton || !menu) {
            return;
        }


        menuButton.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "menu-open"
                );

                menu.classList.toggle(
                    "is-open"
                );

            }
        );


        menu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        document.body.classList.remove(
                            "menu-open"
                        );

                        menu.classList.remove(
                            "is-open"
                        );

                    }
                );

            });
    }


    /* ---------------------------------------------------------
       REMOVE OLD MANUAL THEME CONTROLS
       --------------------------------------------------------- */

    function removeManualThemeControls() {

        document
            .querySelectorAll(
                ".theme-toggle, .theme-switch, .theme-button, #themeToggle"
            )
            .forEach(button => {

                /*
                 * Only remove actual theme controls,
                 * not unrelated buttons.
                 */

                const text =
                    button.textContent.trim();

                const aria =
                    button.getAttribute(
                        "aria-label"
                    ) || "";

                if (
                    /theme|dark|light/i.test(
                        text + " " + aria
                    )
                ) {
                    button.remove();
                }
            });
    }


    /* ---------------------------------------------------------
       PREVENT BROKEN IMAGE ICONS
       --------------------------------------------------------- */

    function handleBrokenImages() {

        document
            .querySelectorAll(
                "img"
            )
            .forEach(img => {

                img.addEventListener(
                    "error",
                    () => {

                        img.classList.add(
                            "image-load-error"
                        );

                    }
                );

            });
    }


    /* ---------------------------------------------------------
       LOAD EVERYTHING
       --------------------------------------------------------- */

    async function initializePortfolio() {

        setupSystemTheme();

        removeManualThemeControls();

        removeOldNumberLabels();

        setupInternalNavigation();

        setupMobileMenu();

        setupBackToTop();

        setupActiveLogos();

        setupClientFeedback();

        handleBrokenImages();


        /*
         * Load repository file list ONCE.
         */

        const files =
            await getRepositoryFiles();


        /*
         * Build every portfolio section.
         */

        buildPortfolioSection(
            "book",
            files
        );

        buildPortfolioSection(
            "web",
            files
        );

        buildPortfolioSection(
            "social",
            files
        );

        buildPortfolioSection(
            "logo",
            files
        );

        buildPortfolioSection(
            "print",
            files
        );


        /*
         * Disable old portfolio links after
         * dynamic content is inserted.
         */

        disablePortfolioLinks();


        /*
         * Remove old labels again because
         * dynamic sections may have inserted them.
         */

        removeOldNumberLabels();


        /*
         * Make sure all dynamically inserted
         * portfolio images are non-clickable.
         */

        document
            .querySelectorAll(
                ".portfolio-card img"
            )
            .forEach(img => {

                img.addEventListener(
                    "click",
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                );

            });
    }


    /* ---------------------------------------------------------
       START
       --------------------------------------------------------- */

    initializePortfolio();

});
