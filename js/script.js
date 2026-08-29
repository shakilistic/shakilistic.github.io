/* =========================================================
   PROJECT IMAGE AUTO SCROLL
   NON-SQUARE / TALL IMAGE
   SQUARE CARD + SLOW TOP TO BOTTOM PREVIEW
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       SETTINGS
    ===================================================== */

    const SCROLL_SPEED_PX_PER_SECOND = 18;

    const RETURN_DURATION_MS = 900;

    const SQUARE_TOLERANCE = 0.04;



    /* =====================================================
       ADD REQUIRED STYLE AUTOMATICALLY

       NO CSS FILE CHANGE REQUIRED
    ===================================================== */

    function installProjectScrollStyles() {

        if (
            document.getElementById(
                "project-auto-scroll-styles"
            )
        ) {

            return;
        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "project-auto-scroll-styles";


        style.textContent = `

            /* =============================================
               KEEP EVERY PROJECT BOX PERFECTLY SQUARE
            ============================================= */

            .project-card {

                position: relative !important;

                aspect-ratio: 1 / 1 !important;

                width: 100% !important;

                overflow: hidden !important;

                padding: 0 !important;

            }


            /* =============================================
               PROJECT IMAGE BASE
            ============================================= */

            .project-card > img {

                position: absolute !important;

                top: 0 !important;

                left: 0 !important;

                width: 100% !important;

                max-width: none !important;

                display: block !important;

                transform: translate3d(0, 0, 0);

                transform-origin: top center;

                will-change: transform;

                backface-visibility: hidden;

            }


            /* =============================================
               SQUARE IMAGE

               Existing square-card appearance remains.
            ============================================= */

            .project-card.project-image-square > img {

                width: 100% !important;

                height: 100% !important;

                object-fit: cover !important;

                object-position: center center !important;

                transition:
                    transform 450ms ease !important;

            }


            /* =============================================
               TALL / NON-SQUARE IMAGE

               Show actual full-width image starting
               from the very top.
            ============================================= */

            .project-card.project-image-scrollable > img {

                width: 100% !important;

                height: auto !important;

                max-height: none !important;

                object-fit: initial !important;

                object-position: initial !important;

            }


            /* =============================================
               NORMAL NON-SCROLLABLE LANDSCAPE IMAGE
            ============================================= */

            .project-card.project-image-landscape > img {

                width: 100% !important;

                height: 100% !important;

                object-fit: cover !important;

                object-position: center center !important;

                transition:
                    transform 450ms ease !important;

            }


            /* =============================================
               MOBILE / TOUCH
            ============================================= */

            @media (hover: none) {

                .project-card.project-image-scrollable {

                    cursor: pointer;

                }

            }

        `;


        document.head.appendChild(
            style
        );
    }



    /* =====================================================
       CHECK WHETHER IMAGE IS BASICALLY SQUARE
    ===================================================== */

    function imageIsSquare(
        image
    ) {

        const width =
            image.naturalWidth;


        const height =
            image.naturalHeight;


        if (
            !width ||
            !height
        ) {

            return false;
        }


        const ratio =
            width /
            height;


        return (
            Math.abs(
                ratio - 1
            ) <=
            SQUARE_TOLERANCE
        );
    }



    /* =====================================================
       REMOVE OLD ANIMATION
    ===================================================== */

    function stopAnimation(
        card
    ) {

        if (
            card._projectScrollAnimation
        ) {

            cancelAnimationFrame(
                card._projectScrollAnimation
            );


            card._projectScrollAnimation =
                null;
        }
    }



    /* =====================================================
       GET MAXIMUM VERTICAL MOVEMENT
    ===================================================== */

    function getScrollDistance(
        card,
        image
    ) {

        const cardHeight =
            card.clientHeight;


        const imageHeight =
            image.getBoundingClientRect()
                .height;


        return Math.max(
            0,
            imageHeight -
            cardHeight
        );
    }



    /* =====================================================
       RETURN IMAGE TO TOP
    ===================================================== */

    function returnImageToTop(
        card,
        image
    ) {

        stopAnimation(
            card
        );


        const currentY =
            Number(
                card.dataset.projectCurrentY ||
                0
            );


        const startTime =
            performance.now();


        function animateBack(
            now
        ) {

            const elapsed =
                now -
                startTime;


            const progress =
                Math.min(
                    elapsed /
                    RETURN_DURATION_MS,
                    1
                );


            /*
            Smooth ease-out
            */

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const y =
                currentY *
                (
                    1 -
                    eased
                );


            card.dataset.projectCurrentY =
                String(
                    y
                );


            image.style.transform =
                `translate3d(0, -${y}px, 0)`;


            if (
                progress <
                1
            ) {

                card._projectScrollAnimation =
                    requestAnimationFrame(
                        animateBack
                    );

            } else {

                card.dataset.projectCurrentY =
                    "0";


                image.style.transform =
                    "translate3d(0, 0, 0)";


                card._projectScrollAnimation =
                    null;
            }
        }


        card._projectScrollAnimation =
            requestAnimationFrame(
                animateBack
            );
    }



    /* =====================================================
       SCROLL TOP -> BOTTOM VERY SLOWLY
    ===================================================== */

    function scrollImageDown(
        card,
        image
    ) {

        stopAnimation(
            card
        );


        const distance =
            getScrollDistance(
                card,
                image
            );


        if (
            distance <=
            1
        ) {

            return;
        }


        let currentY =
            Number(
                card.dataset.projectCurrentY ||
                0
            );


        let previousTime =
            performance.now();


        function animateScroll(
            now
        ) {

            const delta =
                (
                    now -
                    previousTime
                ) /
                1000;


            previousTime =
                now;


            currentY +=
                SCROLL_SPEED_PX_PER_SECOND *
                delta;


            if (
                currentY >
                distance
            ) {

                currentY =
                    distance;
            }


            card.dataset.projectCurrentY =
                String(
                    currentY
                );


            image.style.transform =
                `translate3d(0, -${currentY}px, 0)`;


            if (
                currentY <
                distance
            ) {

                card._projectScrollAnimation =
                    requestAnimationFrame(
                        animateScroll
                    );

            } else {

                card._projectScrollAnimation =
                    null;
            }
        }


        card._projectScrollAnimation =
            requestAnimationFrame(
                animateScroll
            );
    }



    /* =====================================================
       PREPARE ONE PROJECT CARD
    ===================================================== */

    function prepareProjectCard(
        card
    ) {

        if (
            !card ||
            card.dataset.autoScrollReady ===
            "true"
        ) {

            return;
        }


        const image =
            card.querySelector(
                ":scope > img"
            );


        if (
            !image
        ) {

            return;
        }


        function setup() {

            if (
                !image.naturalWidth ||
                !image.naturalHeight
            ) {

                return;
            }


            card.dataset.autoScrollReady =
                "true";


            card.dataset.projectCurrentY =
                "0";


            card.classList.remove(

                "project-image-square",

                "project-image-scrollable",

                "project-image-landscape"

            );


            /*
            ==============================================
            PERFECT / NEAR SQUARE
            ==============================================
            */

            if (
                imageIsSquare(
                    image
                )
            ) {

                card.classList.add(
                    "project-image-square"
                );


                image.style.transform =
                    "translate3d(0,0,0)";


                return;
            }



            /*
            ==============================================
            PORTRAIT / TALL IMAGE

            This gets slow vertical scrolling.
            ==============================================
            */

            if (
                image.naturalHeight >
                image.naturalWidth
            ) {

                card.classList.add(
                    "project-image-scrollable"
                );


                image.style.transform =
                    "translate3d(0,0,0)";



                /* ---------------------------------------
                   DESKTOP:
                   Hover = scroll down
                   Leave = return top
                --------------------------------------- */

                card.addEventListener(
                    "mouseenter",
                    function () {

                        scrollImageDown(
                            card,
                            image
                        );
                    }
                );


                card.addEventListener(
                    "mouseleave",
                    function () {

                        returnImageToTop(
                            card,
                            image
                        );
                    }
                );



                /* ---------------------------------------
                   TOUCH / MOBILE

                   First tap = scroll
                   Second tap = return top
                --------------------------------------- */

                card.addEventListener(
                    "click",
                    function () {

                        if (
                            window.matchMedia(
                                "(hover: none)"
                            ).matches
                        ) {

                            const currentY =
                                Number(
                                    card.dataset.projectCurrentY ||
                                    0
                                );


                            if (
                                currentY >
                                5
                            ) {

                                returnImageToTop(
                                    card,
                                    image
                                );

                            } else {

                                scrollImageDown(
                                    card,
                                    image
                                );
                            }
                        }
                    }
                );


                return;
            }



            /*
            ==============================================
            LANDSCAPE IMAGE

            Card stays square.
            Landscape gets normal centered crop because
            vertical top-bottom scroll is not applicable.
            ==============================================
            */

            card.classList.add(
                "project-image-landscape"
            );


            image.style.transform =
                "translate3d(0,0,0)";
        }



        if (
            image.complete &&
            image.naturalWidth
        ) {

            setup();

        } else {

            image.addEventListener(
                "load",
                setup,
                {
                    once:
                        true
                }
            );
        }
    }



    /* =====================================================
       PREPARE ALL EXISTING CARDS
    ===================================================== */

    function prepareAllProjectCards() {

        document
            .querySelectorAll(
                ".project-card"
            )
            .forEach(
                prepareProjectCard
            );
    }



    /* =====================================================
       WATCH FOR PROJECT CARDS CREATED BY YOUR EXISTING JS
    ===================================================== */

    function watchProjectCards() {

        const observer =
            new MutationObserver(
                function (
                    mutations
                ) {

                    let shouldCheck =
                        false;


                    mutations.forEach(
                        mutation => {

                            if (
                                mutation.addedNodes.length >
                                0
                            ) {

                                shouldCheck =
                                    true;
                            }
                        }
                    );


                    if (
                        shouldCheck
                    ) {

                        prepareAllProjectCards();
                    }
                }
            );


        observer.observe(
            document.body,
            {
                childList:
                    true,

                subtree:
                    true
            }
        );
    }



    /* =====================================================
       RECALCULATE AFTER RESIZE
    ===================================================== */

    function handleResize() {

        document
            .querySelectorAll(
                ".project-card.project-image-scrollable"
            )
            .forEach(
                card => {

                    const image =
                        card.querySelector(
                            ":scope > img"
                        );


                    if (!image) {
                        return;
                    }


                    stopAnimation(
                        card
                    );


                    card.dataset.projectCurrentY =
                        "0";


                    image.style.transform =
                        "translate3d(0,0,0)";
                }
            );
    }



    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initializeProjectAutoScroll() {

        installProjectScrollStyles();

        prepareAllProjectCards();

        watchProjectCards();


        window.addEventListener(
            "resize",
            handleResize
        );
    }



    /* =====================================================
       START
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeProjectAutoScroll
        );

    } else {

        initializeProjectAutoScroll();
    }

})();
