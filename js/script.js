function prepareProjectImage(
    card,
    image
) {

    if (
        !card ||
        !image ||
        !image.naturalWidth ||
        !image.naturalHeight
    ) {

        return;
    }


    const naturalWidth =
        image.naturalWidth;


    const naturalHeight =
        image.naturalHeight;


    const ratio =
        naturalWidth /
        naturalHeight;


    /* =============================================
       APPROXIMATELY SQUARE
    ============================================= */

    if (
        Math.abs(
            ratio - 1
        ) <= 0.04
    ) {

        image.classList.add(
            "project-square-image"
        );


        return;
    }


    /* =============================================
       HORIZONTAL / LANDSCAPE IMAGE

       Keep square card.

       Image height fits card height.

       Extra width stays hidden.

       Hover:
       left side → right side.
    ============================================= */

    if (
        naturalWidth >
        naturalHeight
    ) {

        image.classList.add(
            "project-horizontal-scroll-image"
        );


        let horizontalDistance =
            0;


        let horizontalDuration =
            18;


        let horizontalTouchScrolled =
            false;


        function calculateHorizontalScroll() {

            image.style.transition =
                "none";


            image.style.transform =
                "translate3d(0,0,0)";


            const cardWidth =
                card.clientWidth;


            const cardHeight =
                card.clientHeight;


            if (
                !cardWidth ||
                !cardHeight
            ) {

                return;
            }


            /*
            Image is fitted by HEIGHT.

            Then calculate how wide
            the image becomes.
            */

            const displayedWidth =
                cardHeight *
                (
                    naturalWidth /
                    naturalHeight
                );


            /*
            Extra horizontal width
            that must travel.
            */

            horizontalDistance =
                Math.max(

                    0,

                    displayedWidth -
                    cardWidth

                );


            /*
            Slow smooth horizontal movement.

            Around 18 px / second.
            */

            horizontalDuration =
                Math.max(

                    12,

                    Math.min(

                        55,

                        horizontalDistance /
                        18

                    )

                );

        }


        function scrollHorizontalToRight() {

            calculateHorizontalScroll();


            if (
                horizontalDistance <=
                1
            ) {

                return;
            }


            image.style.transition =
                `transform ${horizontalDuration}s linear`;


            requestAnimationFrame(

                function () {

                    /*
                    Image moves LEFT,
                    which reveals its RIGHT side.

                    Visitor visually sees:
                    LEFT → RIGHT.
                    */

                    image.style.transform =
                        `translate3d(-${horizontalDistance}px,0,0)`;

                }

            );

        }


        function returnHorizontalToLeft() {

            image.style.transition =
                "transform 1.3s cubic-bezier(.22,.8,.3,1)";


            image.style.transform =
                "translate3d(0,0,0)";


            horizontalTouchScrolled =
                false;

        }


        /*
        DESKTOP HOVER
        */

        card.addEventListener(

            "mouseenter",

            function () {

                if (
                    window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {

                    scrollHorizontalToRight();

                }

            }

        );


        card.addEventListener(

            "mouseleave",

            function () {

                if (
                    window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {

                    returnHorizontalToLeft();

                }

            }

        );


        /*
        MOBILE TAP

        Tap 1:
        left → right

        Tap 2:
        return left
        */

        card.addEventListener(

            "click",

            function () {

                if (
                    !window.matchMedia(
                        "(hover: none)"
                    ).matches
                ) {

                    return;
                }


                if (
                    horizontalTouchScrolled
                ) {

                    returnHorizontalToLeft();

                } else {

                    scrollHorizontalToRight();


                    horizontalTouchScrolled =
                        true;

                }

            }

        );


        calculateHorizontalScroll();


        return;

    }


    /* =============================================
       VERTICAL / PORTRAIT IMAGE

       Existing behaviour:
       top → bottom.
    ============================================= */

    image.classList.add(
        "project-scroll-image"
    );


    let scrollDistance =
        0;


    let scrollDuration =
        18;


    let touchScrolled =
        false;


    function calculateScroll() {

        image.style.transition =
            "none";


        image.style.transform =
            "translate3d(0,0,0)";


        const cardWidth =
            card.clientWidth;


        const cardHeight =
            card.clientHeight;


        if (
            !cardWidth ||
            !cardHeight
        ) {

            return;
        }


        const displayedHeight =
            cardWidth *
            (
                naturalHeight /
                naturalWidth
            );


        scrollDistance =
            Math.max(

                0,

                displayedHeight -
                cardHeight

            );


        scrollDuration =
            Math.max(

                12,

                Math.min(

                    55,

                    scrollDistance /
                    18

                )

            );

    }


    function scrollToBottom() {

        calculateScroll();


        if (
            scrollDistance <=
            1
        ) {

            return;
        }


        image.style.transition =
            `transform ${scrollDuration}s linear`;


        requestAnimationFrame(

            function () {

                image.style.transform =
                    `translate3d(0,-${scrollDistance}px,0)`;

            }

        );

    }


    function returnToTop() {

        image.style.transition =
            "transform 1.3s cubic-bezier(.22,.8,.3,1)";


        image.style.transform =
            "translate3d(0,0,0)";


        touchScrolled =
            false;

    }


    /*
    DESKTOP
    */

    card.addEventListener(

        "mouseenter",

        function () {

            if (
                window.matchMedia(
                    "(hover: hover)"
                ).matches
            ) {

                scrollToBottom();

            }

        }

    );


    card.addEventListener(

        "mouseleave",

        function () {

            if (
                window.matchMedia(
                    "(hover: hover)"
                ).matches
            ) {

                returnToTop();

            }

        }

    );


    /*
    MOBILE
    */

    card.addEventListener(

        "click",

        function () {

            if (
                !window.matchMedia(
                    "(hover: none)"
                ).matches
            ) {

                return;
            }


            if (
                touchScrolled
            ) {

                returnToTop();

            } else {

                scrollToBottom();


                touchScrolled =
                    true;

            }

        }

    );


    calculateScroll();

}
