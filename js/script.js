/* =========================================================
   SHAKILSTIC PORTFOLIO
========================================================= */


/* =========================================================
   GOOGLE SHEET URL
========================================================= */

/*
Apps Script deploy করার পর URL এখানে বসাবে।

Example:

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";
*/

const GOOGLE_SCRIPT_URL =
    "Phttps://script.google.com/macros/s/AKfycbw7_durhcn8Hy7BHhZwXTy3Alvm-1C11ywErq3rt5C-I323l2pa3lsf4x8Up6UBC29o/exec";



/* =========================================================
   PROJECT DATA
========================================================= */

const categories = [

    {
        key: "book",
        orange: "Book Cover",
        normal: "Design",
        description:
            "Your cover gets one chance to make a first impression. I design bold, genre-aware covers that spark curiosity, communicate value instantly, and make the right reader want to pick up your book."
    },

    {
        key: "web",
        orange: "Web Design",
        normal: "& Development",
        description:
            "A good website should look impressive and quietly do the selling for you. I build clean, responsive experiences that guide visitors naturally, strengthen trust, and turn attention into action."
    },

    {
        key: "social",
        orange: "Social Media",
        normal: "Design",
        description:
            "In a crowded feed, you have seconds to be noticed. I create sharp, brand-focused social visuals that stop the scroll, deliver the message fast, and make your business look instantly more credible."
    },

    {
        key: "logo",
        orange: "Logo",
        normal: "Design",
        description:
            "A memorable identity starts with a mark that feels unmistakably yours. I create distinctive, versatile logos built to give brands a confident and recognizable visual presence."
    },

    {
        key: "print",
        orange: "Print",
        normal: "Media",
        description:
            "From T-shirts and food packaging to menus, banners, and promotional materials, I create print-ready designs that carry your brand confidently from the screen into the real world."
    }

];



/* =========================================================
   INLINE SVG LOGOS
========================================================= */

const platformLogos = {

    adobe: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M15.1 2H24v20L15.1 2ZM8.9 2H0v20L8.9 2Zm3.1 7.4
                5.7 12.6h-3.8l-1.7-4.2H8.1L12 9.4Z"
            />
        </svg>
    `,

    behance: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M6.5 11.1H3.2V7.4h3.1c1.4 0 2.2.5 2.2 1.8
                0 1.2-.8 1.9-2 1.9Zm.2 5.4H3.2v-4.1h3.6
                c1.6 0 2.5.7 2.5 2.1 0 1.5-1 2-2.6 2ZM9.8
                11.7c1.3-.7 2-1.7 2-3.2 0-2.8-2.1-4.2-5-4.2
                H0v15.2h7.1c3.4 0 5.5-1.6 5.5-4.7
                0-1.9-.9-3.2-2.8-4.1Zm9-3.8c-3.6 0-5.9
                2.5-5.9 6s2.2 6 6 6c2.8 0 4.7-1.2 5.4-3.8
                h-2.8c-.2.8-1.2 1.3-2.5 1.3-1.8
                0-2.8-.9-2.9-2.9h8.4c.2-3.5-1.8-6.6-5.7-6.6Zm-2.7
                4.6c.2-1.5 1-2.3 2.6-2.3 1.4 0 2.4.8
                2.5 2.3h-5.1ZM15.8 4.8h5.8v1.7h-5.8V4.8Z"
            />
        </svg>
    `,

    linkedin: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04
                -1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.41
                v1.57h.05c.48-.9 1.64-1.85 3.37-1.85
                3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41
                A2.06 2.06 0 1 1 5.32 3.3a2.06 2.06 0 0 1
                0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z"
            />
        </svg>
    `,

    x: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M18.244 2.25h3.308l-7.227 8.26
                8.502 11.24h-6.657l-5.214-6.817
                -5.967 6.817H1.68l7.73-8.835L1.254
                2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161
                17.52h1.833L7.084 4.126H5.117L17.083
                19.77Z"
            />
        </svg>
    `,

    pinterest: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M12 0a12 12 0 0 0-4.37 23.17c-.1-1.87-.02-4.12
                .47-6.18l1.54-6.52s-.39-.78-.39-1.94
                c0-1.82 1.05-3.18 2.36-3.18 1.11 0
                1.65.84 1.65 1.84 0 1.12-.71 2.8-1.08
                4.36-.31 1.3.65 2.36 1.93 2.36
                2.32 0 4.1-2.45 4.1-5.98 0-3.13-2.25-5.31-5.46-5.31
                -3.72 0-5.9 2.79-5.9 5.68 0 1.12.43
                2.33.97 2.99.11.13.12.24.09.37l-.36
                1.48c-.06.24-.19.29-.44.17-1.64-.76-2.66-3.15-2.66-5.07
                0-4.13 3-7.92 8.65-7.92 4.54 0 8.07
                3.24 8.07 7.56 0 4.51-2.84 8.14-6.79
                8.14-1.33 0-2.57-.69-3-1.5l-.82 3.1
                c-.29 1.14-1.09 2.57-1.62 3.44A12 12
                0 1 0 12 0Z"
            />
        </svg>
    `,

    github: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58
                v-2.24c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39
                -1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73
                1.2.09 1.84 1.24 1.84 1.24 1.07 1.84
                2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61
                -2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38
                1.23-3.22-.12-.3-.53-1.53.12-3.18
                0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6
                0c2.29-1.55 3.3-1.23 3.3-1.23.65
                1.65.24 2.88.12 3.18.76.84 1.23
                1.91 1.23 3.22 0 4.61-2.81 5.62-5.48
                5.92.43.37.81 1.1.81 2.22v3.29c0
                .32.22.7.83.58A12 12 0 0 0 12 .3Z"
            />
        </svg>
    `,

    dribbble: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M12 0a12 12 0 1 0 0 24 12 12
                0 0 0 0-24Zm7.94 5.54a10 10
                0 0 1 2.01 6.15c-.29-.06-3.18-.65-6.1-.28
                -.24-.58-.5-1.16-.78-1.73 3.22-1.32
                4.69-3.25 4.87-4.14ZM12 2c2.54 0
                4.87.95 6.64 2.52-.15.2-1.46
                1.94-4.46 3.07A50.6 50.6 0 0
                0 11.01 2.1c.33-.05.66-.08.99-.08ZM8.86
                2.5a42.8 42.8 0 0 1 3.21
                5.4c-3.95 1.05-7.44 1.03-7.82
                1.02A10.05 10.05 0 0 1 8.86
                2.5ZM2 12v-.3c.2.01 4.3.08
                9.02-1.24.25.5.49 1 .71
                1.51-4.25 1.2-6.49 4.49-6.72
                4.84A9.95 9.95 0 0 1 2 12Zm10
                10a9.96 9.96 0 0 1-5.5-1.65
                c.18-.3 1.84-2.93 5.99-4.05
                1.12 2.91 1.58 5.35 1.69
                6A10.3 10.3 0 0 1 12 22Zm4.12-1.5
                c-.08-.48-.5-2.8-1.54-5.59
                2.75-.44 5.16.28 5.45.37
                a10.03 10.03 0 0 1-3.91 5.22Z"
            />
        </svg>
    `

};



/* =========================================================
   ACTIVE PLATFORMS
========================================================= */

const activePlatforms = [

    {
        name: "Adobe",
        key: "adobe"
    },

    {
        name: "Behance",
        key: "behance"
    },

    {
        name: "LinkedIn",
        key: "linkedin"
    },

    {
        name: "X",
        key: "x"
    },

    {
        name: "Pinterest",
        key: "pinterest"
    },

    {
        name: "GitHub",
        key: "github"
    },

    {
        name: "Dribbble",
        key: "dribbble"
    }

];



/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialProfiles = [

    {
        name: "Behance",
        url: "https://www.behance.net/shakilistic",
        key: "behance"
    },

    {
        name: "X",
        url: "https://x.com/shakilistic",
        key: "x"
    },

    {
        name: "Pinterest",
        url: "https://www.pinterest.com/shakilistic/",
        key: "pinterest"
    },

    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/shakilistic/",
        key: "linkedin"
    },

    {
        name: "GitHub",
        url: "https://github.com/shakilistic",
        key: "github"
    },

    {
        name: "Dribbble",
        url: "https://dribbble.com/shakilistic",
        key: "dribbble"
    }

];



/* =========================================================
   TESTIMONIALS
========================================================= */

const testimonials = [

    [
        "★★★★★",
        "Very clean, thoughtful and professional execution. The design feels polished and easy to understand.",
        "ANONYMOUS CLIENT"
    ],

    [
        "★★★★★",
        "Excellent communication and attention to detail. Revisions were handled carefully and quickly.",
        "ANONYMOUS CLIENT"
    ],

    [
        "★★★★★",
        "A strong visual direction with a premium finish. Exactly the kind of designer I wanted to work with.",
        "ANONYMOUS CLIENT"
    ],

    [
        "★★★★★",
        "The final result felt distinctive without being over-designed. Great balance and hierarchy.",
        "ANONYMOUS CLIENT"
    ],

    [
        "★★★★★",
        "Reliable, responsive and creative from beginning to end. I would gladly collaborate again.",
        "ANONYMOUS CLIENT"
    ],

    [
        "★★★★★",
        "The work immediately looked more professional. Strong taste, typography and presentation.",
        "ANONYMOUS CLIENT"
    ]

];



/* =========================================================
   FORCE PAGE TO TOP
========================================================= */

function forcePageToTop() {

    if ("scrollRestoration" in history) {

        history.scrollRestoration =
            "manual";

    }


    if (window.location.hash) {

        history.replaceState(
            null,
            "",
            window.location.pathname
            +
            window.location.search
        );

    }


    window.scrollTo(
        0,
        0
    );

}



/* =========================================================
   LOGO GROUP
========================================================= */

function createLogoGroup() {

    const group =
        document.createElement(
            "div"
        );


    group.className =
        "logo-group";


    activePlatforms.forEach(

        platform => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "active-logo logo-"
                +
                platform.key;


            item.title =
                platform.name;


            item.setAttribute(
                "aria-label",
                platform.name
            );


            item.innerHTML =
                platformLogos[
                    platform.key
                ];


            group.appendChild(
                item
            );

        }

    );


    return group;

}



/* =========================================================
   RENDER ACTIVE LOGOS
========================================================= */

function renderActiveLogos() {

    const track =
        document.getElementById(
            "activeLogoTrack"
        );


    if (!track) {

        return;

    }


    track.innerHTML =
        "";


    track.appendChild(
        createLogoGroup()
    );


    track.appendChild(
        createLogoGroup()
    );


    track.appendChild(
        createLogoGroup()
    );

}



/* =========================================================
   ENDLESS LOGO LOOP
========================================================= */

let logoLoopOffset =
    0;


let logoLoopPaused =
    false;



function startLogoLoop() {

    const track =
        document.getElementById(
            "activeLogoTrack"
        );


    const marquee =
        document.getElementById(
            "logoMarquee"
        );


    if (
        !track
        ||
        !marquee
    ) {

        return;

    }



    marquee.addEventListener(

        "mouseenter",

        function () {

            logoLoopPaused =
                true;

        }

    );



    marquee.addEventListener(

        "mouseleave",

        function () {

            logoLoopPaused =
                false;

        }

    );



    function animate() {

        const firstGroup =
            track.querySelector(
                ".logo-group"
            );


        if (
            firstGroup
            &&
            !logoLoopPaused
        ) {

            const groupWidth =
                firstGroup.offsetWidth;


            if (
                groupWidth > 0
            ) {

                logoLoopOffset +=
                    0.55;


                if (
                    logoLoopOffset >=
                    groupWidth
                ) {

                    logoLoopOffset -=
                        groupWidth;

                }


                track.style.transform =
                    `translate3d(-${logoLoopOffset}px,0,0)`;

            }

        }


        requestAnimationFrame(
            animate
        );

    }


    animate();

}



/* =========================================================
   SOCIAL LINKS
========================================================= */

function createSocialLinks(
    container
) {

    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    socialProfiles.forEach(

        social => {

            const link =
                document.createElement(
                    "a"
                );


            link.className =
                "social-link social-"
                +
                social.key;


            link.href =
                social.url;


            link.target =
                "_blank";


            link.rel =
                "noopener noreferrer";


            link.title =
                social.name;


            link.setAttribute(
                "aria-label",
                social.name
            );


            link.innerHTML =
                platformLogos[
                    social.key
                ];


            container.appendChild(
                link
            );

        }

    );

}



function renderSocialLinks() {

    createSocialLinks(
        document.getElementById(
            "socialLinks"
        )
    );


    createSocialLinks(
        document.getElementById(
            "mobileSocialLinks"
        )
    );

}



/* =========================================================
   PROJECT SECTION
========================================================= */

function createProjectSection(
    category
) {

    const wrapper =
        document.getElementById(
            "projectSections"
        );


    if (!wrapper) {

        return;

    }


    const section =
        document.createElement(
            "section"
        );


    section.className =
        "project-section";


    section.innerHTML = `

        <div class="project-header">

            <h3>

                <span class="accent-text">
                    ${category.orange}
                </span>

                <span class="normal-text">
                    ${category.normal}
                </span>

            </h3>


            <p class="project-note">

                ${category.description}

            </p>

        </div>


        <div class="project-grid"></div>


        <div class="more-wrap is-hidden">

            <button
                class="more-btn"
                type="button"
            >
                SEE MORE
            </button>

        </div>

    `;


    wrapper.appendChild(
        section
    );


    const grid =
        section.querySelector(
            ".project-grid"
        );


    const moreWrap =
        section.querySelector(
            ".more-wrap"
        );


    const moreButton =
        section.querySelector(
            ".more-btn"
        );


    let loadedCount =
        0;


    let finishedCount =
        0;


    let expanded =
        false;



    for (
        let i = 1;
        i <= 20;
        i++
    ) {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "project-card";


        card.hidden =
            true;


        const image =
            document.createElement(
                "img"
            );


        image.src =
            `./assets/images/${category.key}${i}.jpg`;


        image.alt =
            `${category.orange} ${category.normal} ${i}`;


        image.loading =
            "lazy";



        image.addEventListener(

            "load",

            function () {

                loadedCount++;

                finishedCount++;

                card.dataset.loaded =
                    "true";

                updateVisibility();

            }

        );



        image.addEventListener(

            "error",

            function () {

                finishedCount++;

                card.remove();

                updateVisibility();

            }

        );


        card.appendChild(
            image
        );


        grid.appendChild(
            card
        );

    }



    function getLoadedCards() {

        return Array
            .from(
                grid.children
            )
            .filter(

                card =>
                    card.dataset.loaded
                    ===
                    "true"

            );

    }



    function updateVisibility() {

        const cards =
            getLoadedCards();


        cards.forEach(

            (
                card,
                index
            ) => {

                card.hidden =
                    expanded
                    ?
                    false
                    :
                    index >= 3;

            }

        );


        if (
            loadedCount > 3
        ) {

            moreWrap.classList.remove(
                "is-hidden"
            );

        }

        else {

            moreWrap.classList.add(
                "is-hidden"
            );

        }


        if (
            finishedCount >= 20
            &&
            loadedCount <= 3
        ) {

            moreWrap.classList.add(
                "is-hidden"
            );

        }

    }



    moreButton.addEventListener(

        "click",

        function () {

            expanded =
                !expanded;


            moreButton.textContent =
                expanded
                    ?
                    "SHOW LESS"
                    :
                    "SEE MORE";


            updateVisibility();

        }

    );

}



/* =========================================================
   RENDER PROJECTS
========================================================= */

function renderProjects() {

    categories.forEach(
        createProjectSection
    );

}



/* =========================================================
   TESTIMONIAL GROUP
========================================================= */

function createTestimonialGroup() {

    const group =
        document.createElement(
            "div"
        );


    group.className =
        "testimonial-group";


    testimonials.forEach(

        testimonial => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "review-card";


            card.innerHTML = `

                <div class="stars">

                    ${testimonial[0]}

                </div>


                <p>

                    “${testimonial[1]}”

                </p>


                <strong>

                    ${testimonial[2]}

                </strong>

            `;


            group.appendChild(
                card
            );

        }

    );


    return group;

}



/* =========================================================
   RENDER TESTIMONIALS
========================================================= */

function renderTestimonials() {

    const track =
        document.getElementById(
            "testimonialTrack"
        );


    if (!track) {

        return;

    }


    track.innerHTML =
        "";


    track.appendChild(
        createTestimonialGroup()
    );


    track.appendChild(
        createTestimonialGroup()
    );


    track.appendChild(
        createTestimonialGroup()
    );

}



/* =========================================================
   TESTIMONIAL CONTROL
   AUTO LOOP + HOVER PAUSE + DRAG + SWIPE
========================================================= */

function initializeTestimonialControl() {

    const marquee =
        document.getElementById(
            "testimonialMarquee"
        );


    const track =
        document.getElementById(
            "testimonialTrack"
        );


    if (
        !marquee
        ||
        !track
    ) {

        return;

    }


    let offset =
        0;


    let paused =
        false;


    let dragging =
        false;


    let startX =
        0;


    let startOffset =
        0;



    function getGroupWidth() {

        const group =
            track.querySelector(
                ".testimonial-group"
            );


        return group
            ?
            group.offsetWidth
            :
            0;

    }



    function normalizeOffset() {

        const groupWidth =
            getGroupWidth();


        if (!groupWidth) {

            return;

        }


        while (
            offset >= groupWidth
        ) {

            offset -=
                groupWidth;

        }


        while (
            offset < 0
        ) {

            offset +=
                groupWidth;

        }

    }



    function draw() {

        normalizeOffset();


        track.style.transform =
            `translate3d(-${offset}px,0,0)`;

    }



    marquee.addEventListener(

        "mouseenter",

        function () {

            paused =
                true;

        }

    );



    marquee.addEventListener(

        "mouseleave",

        function () {

            if (!dragging) {

                paused =
                    false;

            }

        }

    );



    marquee.addEventListener(

        "pointerdown",

        function (event) {

            dragging =
                true;


            paused =
                true;


            startX =
                event.clientX;


            startOffset =
                offset;


            marquee.classList.add(
                "dragging"
            );


            try {

                marquee.setPointerCapture(
                    event.pointerId
                );

            }

            catch (
                error
            ) {}

        }

    );



    marquee.addEventListener(

        "pointermove",

        function (event) {

            if (!dragging) {

                return;

            }


            const movement =
                event.clientX
                -
                startX;


            offset =
                startOffset
                -
                movement;


            draw();

        }

    );



    function stopDrag(
        event
    ) {

        if (!dragging) {

            return;

        }


        dragging =
            false;


        marquee.classList.remove(
            "dragging"
        );


        try {

            marquee.releasePointerCapture(
                event.pointerId
            );

        }

        catch (
            error
        ) {}


        if (
            event.pointerType
            ===
            "touch"
        ) {

            paused =
                false;

        }

    }



    marquee.addEventListener(
        "pointerup",
        stopDrag
    );


    marquee.addEventListener(
        "pointercancel",
        stopDrag
    );



    marquee.addEventListener(

        "wheel",

        function (event) {

            let movement =
                0;


            if (
                Math.abs(
                    event.deltaX
                )
                >
                Math.abs(
                    event.deltaY
                )
            ) {

                movement =
                    event.deltaX;

            }

            else if (
                event.shiftKey
            ) {

                movement =
                    event.deltaY;

            }


            if (
                movement === 0
            ) {

                return;

            }


            event.preventDefault();


            offset +=
                movement;


            draw();

        },

        {
            passive:
                false
        }

    );



    function animate() {

        if (
            !paused
            &&
            !dragging
        ) {

            offset +=
                0.45;


            draw();

        }


        requestAnimationFrame(
            animate
        );

    }


    draw();

    animate();

}



/* =========================================================
   CLEAN NAVIGATION
   NO #HOME / #WORK / ETC
========================================================= */

function initializeCleanNavigation() {

    document
        .querySelectorAll(
            "[data-scroll]"
        )
        .forEach(

            button => {

                button.addEventListener(

                    "click",

                    function () {

                        const target =
                            document.getElementById(
                                button.dataset.scroll
                            );


                        if (!target) {

                            return;

                        }


                        target.scrollIntoView(

                            {
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            }

                        );


                        history.replaceState(

                            null,

                            "",

                            window.location.pathname
                            +
                            window.location.search

                        );


                        closeMobileMenu();

                    }

                );

            }

        );

}



/* =========================================================
   THEME
========================================================= */

function initializeTheme() {

    const buttons = [

        document.getElementById(
            "themeSwitch"
        ),

        document.getElementById(
            "mobileThemeSwitch"
        )

    ];



    function toggleTheme() {

        const current =
            document.documentElement
                .dataset
                .theme;


        const next =
            current === "dark"
                ?
                "light"
                :
                "dark";


        document.documentElement
            .dataset
            .theme =
            next;


        localStorage.setItem(
            "portfolio-theme",
            next
        );

    }



    buttons.forEach(

        button => {

            if (!button) {

                return;

            }


            button.addEventListener(

                "click",

                function (event) {

                    event.stopPropagation();

                    toggleTheme();

                }

            );

        }

    );



    const systemTheme =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );


    if (
        systemTheme.addEventListener
    ) {

        systemTheme.addEventListener(

            "change",

            function (event) {

                if (
                    !localStorage.getItem(
                        "portfolio-theme"
                    )
                ) {

                    document.documentElement
                        .dataset
                        .theme =
                        event.matches
                            ?
                            "dark"
                            :
                            "light";

                }

            }

        );

    }

}



/* =========================================================
   MOBILE MENU
========================================================= */

function initializeMenu() {

    const button =
        document.getElementById(
            "menuBtn"
        );


    const menu =
        document.getElementById(
            "mobileMenu"
        );


    if (
        !button
        ||
        !menu
    ) {

        return;

    }



    button.addEventListener(

        "click",

        function (event) {

            event.stopPropagation();


            const open =
                menu.classList.toggle(
                    "open"
                );


            button.setAttribute(
                "aria-expanded",
                String(open)
            );


            menu.setAttribute(
                "aria-hidden",
                String(!open)
            );

        }

    );



    /*
    Click/touch anywhere outside
    the menu = close it.
    */

    document.addEventListener(

        "pointerdown",

        function (event) {

            if (
                !menu.classList.contains(
                    "open"
                )
            ) {

                return;

            }


            const clickedInsideMenu =
                menu.contains(
                    event.target
                );


            const clickedMenuButton =
                button.contains(
                    event.target
                );


            if (
                !clickedInsideMenu
                &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }

    );



    /*
    ESC key
    */

    document.addEventListener(

        "keydown",

        function (event) {

            if (
                event.key
                ===
                "Escape"
            ) {

                closeMobileMenu();

            }

        }

    );


    /*
    Resize back to desktop
    */

    window.addEventListener(

        "resize",

        function () {

            if (
                window.innerWidth
                >
                1050
            ) {

                closeMobileMenu();

            }

        }

    );

}



function closeMobileMenu() {

    const button =
        document.getElementById(
            "menuBtn"
        );


    const menu =
        document.getElementById(
            "mobileMenu"
        );


    if (
        !button
        ||
        !menu
    ) {

        return;

    }


    menu.classList.remove(
        "open"
    );


    button.setAttribute(
        "aria-expanded",
        "false"
    );


    menu.setAttribute(
        "aria-hidden",
        "true"
    );

}



/* =========================================================
   EMAIL FORMAT CHECK
========================================================= */

function emailFormatLooksValid(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        .test(
            email
        );

}



/* =========================================================
   EMAIL DOMAIN / MX CHECK
========================================================= */

async function emailDomainLooksValid(
    email
) {

    const domain =
        email
            .split("@")[1]
            ?.trim()
            .toLowerCase();


    if (!domain) {

        return false;

    }


    try {

        const response =
            await fetch(

                "https://dns.google/resolve?name="
                +
                encodeURIComponent(
                    domain
                )
                +
                "&type=MX",

                {
                    cache:
                        "no-store"
                }

            );


        if (!response.ok) {

            return true;

        }


        const result =
            await response.json();


        return (

            Array.isArray(
                result.Answer
            )

            &&

            result.Answer.length > 0

        );

    }

    catch (
        error
    ) {

        /*
        DNS service failure should not
        block a genuine visitor.
        */

        return true;

    }

}



/* =========================================================
   CONTACT FORM
========================================================= */

function initializeForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    const status =
        document.getElementById(
            "formStatus"
        );


    const button =
        document.getElementById(
            "submitBtn"
        );


    if (
        !form
        ||
        !status
        ||
        !button
    ) {

        return;

    }



    form.addEventListener(

        "submit",

        async function (event) {

            event.preventDefault();


            status.className =
                "form-status";


            status.textContent =
                "";


            if (
                !form.checkValidity()
            ) {

                form.reportValidity();

                return;

            }


            const formData =
                new FormData(
                    form
                );


            /*
            Honeypot
            */

            if (
                formData.get(
                    "website"
                )
            ) {

                return;

            }


            const email =
                String(
                    formData.get(
                        "email"
                    )
                    ||
                    ""
                )
                .trim()
                .toLowerCase();


            if (
                !emailFormatLooksValid(
                    email
                )
            ) {

                status.className =
                    "form-status error";


                status.textContent =
                    "Please enter a valid email address.";


                return;

            }


            button.disabled =
                true;


            status.textContent =
                "Checking email...";


            const emailDomainValid =
                await emailDomainLooksValid(
                    email
                );


            if (
                !emailDomainValid
            ) {

                status.className =
                    "form-status error";


                status.textContent =
                    "That email domain does not appear to accept email.";


                button.disabled =
                    false;


                return;

            }


            if (
                !GOOGLE_SCRIPT_URL
                ||
                GOOGLE_SCRIPT_URL.includes(
                    "PASTE_YOUR"
                )
            ) {

                status.className =
                    "form-status error";


                status.textContent =
                    "Google Sheet connection is not configured yet.";


                button.disabled =
                    false;


                return;

            }


            status.textContent =
                "Sending...";


            const payload =
                new URLSearchParams();


            payload.append(
                "name",
                String(
                    formData.get(
                        "name"
                    )
                    ||
                    ""
                ).trim()
            );


            payload.append(
                "email",
                email
            );


            payload.append(
                "projectType",
                String(
                    formData.get(
                        "projectType"
                    )
                    ||
                    ""
                )
            );


            payload.append(
                "budget",
                String(
                    formData.get(
                        "budget"
                    )
                    ||
                    ""
                )
            );


            payload.append(
                "message",
                String(
                    formData.get(
                        "message"
                    )
                    ||
                    ""
                ).trim()
            );


            payload.append(
                "website",
                ""
            );


            payload.append(
                "page",
                window.location.href
            );


            try {

                await fetch(

                    GOOGLE_SCRIPT_URL,

                    {
                        method:
                            "POST",

                        mode:
                            "no-cors",

                        headers: {

                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8"

                        },

                        body:
                            payload.toString()
                    }

                );


                form.reset();


                status.className =
                    "form-status success";


                status.textContent =
                    "Thanks — your inquiry has been sent.";

            }

            catch (
                error
            ) {

                status.className =
                    "form-status error";


                status.textContent =
                    "Could not send your message. Please try again.";

            }

            finally {

                button.disabled =
                    false;

            }

        }

    );

}



/* =========================================================
   SAFE REVEAL
   IMPORTANT:
   THIS DOES NOT HIDE THE WEBSITE.
========================================================= */

function initializeReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(

            element => {

                element.classList.add(
                    "visible"
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
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }

                );

            },

            {
                threshold:
                    0.05
            }

        );


    elements.forEach(

        element => {

            /*
            Never add a class that
            makes content disappear.

            CSS remains visible by default.
            */

            observer.observe(
                element
            );

        }

    );

}



/* =========================================================
   SAFE SECTION JUMP
   NO OPACITY HIDE
========================================================= */

function initializeSectionJump() {

    const sections =
        document.querySelectorAll(
            ".scroll-jump, .project-section"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        sections.forEach(

            section => {

                section.classList.add(
                    "section-visible"
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
                                "section-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }

                );

            },

            {
                threshold:
                    0.04,

                rootMargin:
                    "0px 0px -15px 0px"
            }

        );


    sections.forEach(

        section => {

            observer.observe(
                section
            );

        }

    );

}



/* =========================================================
   BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) {

        return;

    }


    function updateButton() {

        button.classList.toggle(

            "show",

            window.scrollY > 700

        );

    }


    window.addEventListener(

        "scroll",

        updateButton,

        {
            passive:
                true
        }

    );


    updateButton();


    button.addEventListener(

        "click",

        function () {

            window.scrollTo(

                {
                    top:
                        0,

                    behavior:
                        "smooth"
                }

            );


            history.replaceState(

                null,

                "",

                window.location.pathname
                +
                window.location.search

            );

        }

    );

}



/* =========================================================
   PROFILE IMAGE FALLBACK
========================================================= */

function initializeProfileImage() {

    const image =
        document.getElementById(
            "profileImage"
        );


    if (!image) {

        return;

    }


    image.addEventListener(

        "error",

        function () {

            image.style.display =
                "none";

        }

    );

}



/* =========================================================
   YEAR
========================================================= */

function setYear() {

    const element =
        document.getElementById(
            "year"
        );


    if (!element) {

        return;

    }


    element.textContent =
        new Date()
            .getFullYear();

}



/* =========================================================
   EXTRA VISIBILITY SAFETY
========================================================= */

function enforceContentVisibility() {

    const elements =
        document.querySelectorAll(

            "main, main section, .hero, .hero-grid, .hero-copy, .profile-column, .active-section, .work-intro, .project-section, .testimonial-section, .beyond-section, .contact-section"

        );


    elements.forEach(

        element => {

            element.style.visibility =
                "visible";

        }

    );

}



/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

function initializeWebsite() {

    forcePageToTop();


    /*
    Dynamic content first
    */

    renderActiveLogos();

    renderSocialLinks();

    renderProjects();

    renderTestimonials();


    /*
    Behaviours
    */

    startLogoLoop();

    initializeTestimonialControl();

    initializeCleanNavigation();

    initializeTheme();

    initializeMenu();

    initializeForm();

    initializeProfileImage();

    setYear();


    /*
    Visibility protection
    */

    enforceContentVisibility();


    /*
    Safe animations
    */

    initializeReveal();

    initializeSectionJump();


    initializeBackToTop();

}



/* =========================================================
   DOM READY
========================================================= */

if (
    document.readyState
    ===
    "loading"
) {

    document.addEventListener(

        "DOMContentLoaded",

        initializeWebsite

    );

}

else {

    initializeWebsite();

}



/* =========================================================
   AFTER PAGE LOAD
========================================================= */

window.addEventListener(

    "load",

    function () {

        /*
        Refresh করলে browser যেন
        previous scroll position restore না করে.
        */

        setTimeout(

            function () {

                window.scrollTo(
                    0,
                    0
                );

            },

            30

        );


        /*
        Extra safety
        */

        enforceContentVisibility();

    }

);
