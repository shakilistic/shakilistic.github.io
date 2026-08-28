/* ==========================================================
   SHAKILSTIC PORTFOLIO
========================================================== */


/*
    GOOGLE APPS SCRIPT URL

    তোমার existing URL এখানে রাখবে।
*/

const GOOGLE_SCRIPT_URL =
    "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";



/* ==========================================================
   PROJECT CATEGORIES
========================================================== */

const categories = [

    {
        key: "book",
        orange: "Book Cover",
        normal: "Design"
    },

    {
        key: "web",
        orange: "Web Design",
        normal: "& Development"
    },

    {
        key: "social",
        orange: "Social Media",
        normal: "Design"
    },

    {
        key: "logo",
        orange: "Logo",
        normal: "Design"
    },

    {
        key: "print",
        orange: "Print",
        normal: "Media"
    }

];



/* ==========================================================
   OFFICIAL INLINE LOGOS

   External image links নেই।
   তাই broken logo problem থাকবে না।
========================================================== */

const platformLogos = {


    adobe: `

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >

            <path
                fill="currentColor"
                d="
                M15.1 2H24v20L15.1 2ZM8.9 2H0v20L8.9 2Zm3.1 7.4
                5.7 12.6h-3.8l-1.7-4.2H8.1L12 9.4Z
                "
            />

        </svg>

    `,


    figma: `

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >

            <path
                fill="currentColor"
                d="
                M8 2a4 4 0 0 0 0 8h4V2H8Zm0 8a4 4 0 1 0 0 8h4v-8H8Zm4-8v8h4a4 4 0 1 0 0-8h-4Zm0 8v8h4a4 4 0 1 0 0-8h-4Zm-4 8a4 4 0 1 0 4 4v-4H8Z
                "
            />

        </svg>

    `,


    behance: `

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >

            <path
                fill="currentColor"
                d="
                M6.5 11.1H3.2V7.4h3.1c1.4 0 2.2.5 2.2 1.8
                0 1.2-.8 1.9-2 1.9Zm.2 5.4H3.2v-4.1h3.6
                c1.6 0 2.5.7 2.5 2.1 0 1.5-1 2-2.6 2ZM9.8
                11.7c1.3-.7 2-1.7 2-3.2 0-2.8-2.1-4.2-5-4.2
                H0v15.2h7.1c3.4 0 5.5-1.6 5.5-4.7
                0-1.9-.9-3.2-2.8-4.1Zm9-3.8c-3.6 0-5.9
                2.5-5.9 6s2.2 6 6 6c2.8 0 4.7-1.2 5.4-3.8
                h-2.8c-.2.8-1.2 1.3-2.5 1.3-1.8
                0-2.8-.9-2.9-2.9h8.4c.2-3.5-1.8-6.6-5.7-6.6Zm-2.7
                4.6c.2-1.5 1-2.3 2.6-2.3 1.4 0 2.4.8
                2.5 2.3h-5.1ZM15.8 4.8h5.8v1.7h-5.8V4.8Z
                "
            />

        </svg>

    `,


    linkedin: `

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >

            <path
                fill="currentColor"
                d="
                M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04
                -1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.41
                v1.57h.05c.48-.9 1.64-1.85 3.37-1.85
                3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41
                A2.06 2.06 0 1 1 5.32 3.3a2.06 2.06 0 0 1
                0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z
                "
            />

        </svg>

    `,


    x: `

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >

            <path
                fill="currentColor"
                d="
                M18.244 2.25h3.308l-7.227 8.26
                8.502 11.24h-6.657l-5.214-6.817
                -5.967 6.817H1.68l7.73-8.835L1.254
                2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161
                17.52h1.833L7.084 4.126H5.117L17.083
                19.77Z
                "
            />

        </svg>

    `,


    pinterest: `

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >

            <path
                fill="currentColor"
                d="
                M12 0a12 12 0 0 0-4.37 23.17c-.1-1.87-.02-4.12
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
                0 1 0 12 0Z
                "
            />

        </svg>

    `,


    github: `

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >

            <path
                fill="currentColor"
                d="
                M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58
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
                .32.22.7.83.58A12 12 0 0 0 12 .3Z
                "
            />

        </svg>

    `,


    dribbble: `

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >

            <path
                fill="currentColor"
                d="
                M12 0a12 12 0 1 0 0 24 12 12
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
                a10.03 10.03 0 0 1-3.91 5.22Z
                "
            />

        </svg>

    `

};



/* ==========================================================
   ACTIVE PLATFORM DATA
========================================================== */

const activePlatforms = [

    {
        name: "Adobe",
        key: "adobe"
    },

    {
        name: "Figma",
        key: "figma"
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



/* ==========================================================
   SOCIAL LINKS
========================================================== */

const socialProfiles = [

    {
        name: "Behance",
        url:
            "https://www.behance.net/shakilistic",
        key:
            "behance"
    },

    {
        name: "X",
        url:
            "https://x.com/shakilistic",
        key:
            "x"
    },

    {
        name: "Pinterest",
        url:
            "https://www.pinterest.com/shakilistic/",
        key:
            "pinterest"
    },

    {
        name: "LinkedIn",
        url:
            "https://www.linkedin.com/in/shakilistic/",
        key:
            "linkedin"
    },

    {
        name: "GitHub",
        url:
            "https://github.com/shakilistic",
        key:
            "github"
    },

    {
        name: "Dribbble",
        url:
            "https://dribbble.com/shakilistic",
        key:
            "dribbble"
    }

];



/* ==========================================================
   TESTIMONIALS
========================================================== */

const testimonials = [

    [
        "★★★★★",

        "Very clean, thoughtful and professional execution. The design feels polished and easy to understand.",

        "BOOK COVER CLIENT"
    ],

    [
        "★★★★★",

        "Excellent communication and attention to detail. Revisions were handled carefully and quickly.",

        "DESIGN CLIENT"
    ],

    [
        "★★★★★",

        "A strong visual direction with a premium finish. Exactly the kind of designer I wanted to work with.",

        "BRAND CLIENT"
    ],

    [
        "★★★★★",

        "The final result felt distinctive without being over-designed. Great balance and hierarchy.",

        "CREATIVE CLIENT"
    ],

    [
        "★★★★★",

        "Reliable, responsive and creative from beginning to end. I would gladly collaborate again.",

        "RETURNING CLIENT"
    ],

    [
        "★★★★★",

        "The work immediately looked more professional. Strong taste, typography and presentation.",

        "DIGITAL CLIENT"
    ]

];



/* ==========================================================
   ACTIVE LOGO GROUP
========================================================== */

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



/* ==========================================================
   TRUE ENDLESS ACTIVE LOGO LOOP
========================================================== */

let logoLoopOffset = 0;

let logoLoopPaused = false;

let logoLoopFrame = null;



function renderActiveLogos() {


    const track =
        document.getElementById(
            "activeLogoTrack"
        );


    track.innerHTML =
        "";


    /*
        তিনটা identical group ব্যবহার করছি।

        প্রথম group screen থেকে বের হওয়ার
        সাথে সাথে offset reset হলেও
        visually কোনো jump দেখা যাবে না।
    */

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



/* ==========================================================
   START ENDLESS LOOP
========================================================== */

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
        !track ||
        !marquee
    ) {

        return;

    }



    marquee.addEventListener(

        "mouseenter",

        function () {

            logoLoopPaused = true;

        }

    );



    marquee.addEventListener(

        "mouseleave",

        function () {

            logoLoopPaused = false;

        }

    );



    /*
        Mobile touch করলে temporary pause.
    */

    marquee.addEventListener(

        "touchstart",

        function () {

            logoLoopPaused = true;

        },

        {
            passive: true
        }

    );



    marquee.addEventListener(

        "touchend",

        function () {

            logoLoopPaused = false;

        },

        {
            passive: true
        }

    );



    function animate() {


        const firstGroup =
            track.querySelector(
                ".logo-group"
            );


        if (!firstGroup) {

            logoLoopFrame =
                requestAnimationFrame(
                    animate
                );

            return;

        }



        const groupWidth =
            firstGroup.offsetWidth;



        if (
            !logoLoopPaused
        ) {


            /*
                speed

                0.55 = smooth
                slow enough to inspect
            */

            logoLoopOffset +=
                0.55;



            /*
                First complete group left
                হয়ে গেলে আমরা same visual
                position-এ reset করি।
            */

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



        logoLoopFrame =
            requestAnimationFrame(
                animate
            );


    }



    animate();


}



/* ==========================================================
   SOCIAL LINKS — ORIGINAL ICON VERSION
========================================================== */

function renderSocialLinks() {


    const container =
        document.getElementById(
            "socialLinks"
        );


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



/* ==========================================================
   PROJECT SECTION

   IMPORTANT:
   - First 3 visible
   - More than 3 = SEE MORE
   - 3 or less = button hidden
========================================================== */

function createProjectSection(
    category
) {


    const wrapper =
        document.getElementById(
            "projectSections"
        );


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

        </div>


        <div
            class="project-grid"
        ></div>


        <div
            class="more-wrap is-hidden"
        >

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



    let loadedCount = 0;

    let finishedCount = 0;

    let expanded = false;



    /*
        Detect actual existing images.

        Broken/non-existing images
        do not count.
    */

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


        card.dataset.order =
            String(i);


        /*
            Everything hidden first.

            After actual image count
            has been checked,
            first 3 will display.
        */

        card.hidden = true;



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


                updateProjectVisibility();


            }

        );



        image.addEventListener(

            "error",

            function () {


                finishedCount++;


                card.remove();


                updateProjectVisibility();


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



    function updateProjectVisibility() {


        const cards =
            getLoadedCards();



        cards.forEach(

            function (
                card,
                index
            ) {


                if (
                    expanded
                ) {


                    card.hidden =
                        false;


                }

                else {


                    /*
                        Only first 3
                    */

                    card.hidden =
                        index >= 3;


                }


            }

        );



        /*
            ONLY SHOW BUTTON
            IF MORE THAN 3
            ACTUAL IMAGES EXIST
        */

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



        /*
            Once all 20 checked,
            final state guaranteed.
        */

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


            updateProjectVisibility();


        }

    );


}



/* ==========================================================
   RENDER PROJECTS
========================================================== */

function renderProjects() {


    categories.forEach(

        createProjectSection

    );


}



/* ==========================================================
   TESTIMONIAL GROUP
========================================================== */

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



/* ==========================================================
   TESTIMONIAL LOOP
========================================================== */

function renderTestimonials() {


    const track =
        document.getElementById(
            "testimonialTrack"
        );


    track.innerHTML =
        "";


    track.appendChild(
        createTestimonialGroup()
    );


    track.appendChild(
        createTestimonialGroup()
    );


}



/* ==========================================================
   CLEAN NAVIGATION
   NO #HOME / #WORK / #ABOUT
========================================================== */

function initializeCleanNavigation() {


    if (
        window.location.hash
    ) {


        history.replaceState(

            null,

            "",

            window.location.pathname
            +
            window.location.search

        );


    }



    document
        .querySelectorAll(
            "[data-scroll]"
        )
        .forEach(

            button => {


                button.addEventListener(

                    "click",

                    function () {


                        const targetID =
                            button.dataset.scroll;


                        const target =
                            document.getElementById(
                                targetID
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



/* ==========================================================
   THEME
========================================================== */

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
            document
                .documentElement
                .dataset
                .theme;


        const next =
            current === "dark"
            ?
            "light"
            :
            "dark";


        document
            .documentElement
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


            if (
                button
            ) {


                button.addEventListener(

                    "click",

                    toggleTheme

                );


            }


        }

    );



    const systemTheme =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );


    systemTheme.addEventListener(

        "change",

        function (event) {


            if (
                !localStorage.getItem(
                    "portfolio-theme"
                )
            ) {


                document
                    .documentElement
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



/* ==========================================================
   MOBILE MENU
========================================================== */

function initializeMenu() {


    const button =
        document.getElementById(
            "menuBtn"
        );


    const menu =
        document.getElementById(
            "mobileMenu"
        );


    button.addEventListener(

        "click",

        function () {


            const open =
                menu
                    .classList
                    .toggle(
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
        !menu ||
        !button
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



/* ==========================================================
   EMAIL DOMAIN VALIDATION
========================================================== */

async function emailDomainLooksValid(
    email
) {


    const domain =
        email
            .split("@")[1]
            ?.trim();


    if (
        !domain
    ) {

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
                "&type=MX"

            );


        const data =
            await response.json();


        return (

            Array.isArray(
                data.Answer
            )

            &&

            data.Answer.length > 0

        );


    }

    catch {


        return true;

    }


}



/* ==========================================================
   CONTACT FORM
========================================================== */

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

                    || ""

                ).trim();



            button.disabled =
                true;


            status.textContent =
                "Checking email...";



            const valid =
                await emailDomainLooksValid(
                    email
                );



            if (
                !valid
            ) {


                status.className =
                    "form-status error";


                status.textContent =
                    "Please enter a valid email address.";


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



            const payload = {


                name:
                    formData.get(
                        "name"
                    ),


                email:
                    email,


                projectType:
                    formData.get(
                        "projectType"
                    ),


                budget:
                    formData.get(
                        "budget"
                    ),


                message:
                    formData.get(
                        "message"
                    )


            };



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
                                "text/plain;charset=utf-8"

                        },


                        body:
                            JSON.stringify(
                                payload
                            )


                    }

                );



                form.reset();


                status.className =
                    "form-status success";


                status.textContent =
                    "Thanks — your inquiry has been sent.";


            }

            catch {


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



/* ==========================================================
   REVEAL
========================================================== */

function initializeReveal() {


    const observer =
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


                            observer.unobserve(
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


    document
        .querySelectorAll(
            ".reveal"
        )
        .forEach(

            element => {


                observer.observe(
                    element
                );


            }

        );


}



/* ==========================================================
   BACK TO TOP
========================================================== */

function initializeBackToTop() {


    const button =
        document.getElementById(
            "backToTop"
        );


    window.addEventListener(

        "scroll",

        function () {


            button.classList.toggle(

                "show",

                window.scrollY > 700

            );


        },

        {
            passive: true
        }

    );



    button.addEventListener(

        "click",

        function () {


            window.scrollTo(

                {
                    top: 0,
                    behavior: "smooth"
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



/* ==========================================================
   PROFILE IMAGE FALLBACK
========================================================== */

const profileImage =
    document.getElementById(
        "profileImage"
    );


if (
    profileImage
) {


    profileImage.addEventListener(

        "error",

        function () {


            profileImage.style.display =
                "none";


        }

    );


}



/* ==========================================================
   YEAR
========================================================== */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();



/* ==========================================================
   START
========================================================== */

renderActiveLogos();

startLogoLoop();

renderSocialLinks();

renderProjects();

renderTestimonials();

initializeCleanNavigation();

initializeTheme();

initializeMenu();

initializeForm();

initializeReveal();

initializeBackToTop();
