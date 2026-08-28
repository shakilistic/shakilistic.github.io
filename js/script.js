/* ==========================================================
   SHAKILSTIC PORTFOLIO
========================================================== */


/*
    GOOGLE SHEETS URL
*/

const GOOGLE_SCRIPT_URL =
    "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";



/* ==========================================================
   CATEGORIES
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
   WHERE I'M ACTIVE

   NOTE:
   Logos are NOT clickable.
========================================================== */

const activePlatforms = [

    {
        name: "Adobe",
        icon:
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/adobe.svg",
        fallback: "A"
    },

    {
        name: "Figma",
        icon:
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg",
        fallback: "F"
    },

    {
        name: "Behance",
        icon:
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/behance.svg",
        fallback: "Bē"
    },

    {
        name: "LinkedIn",
        icon:
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg",
        fallback: "in"
    },

    {
        name: "X",
        icon:
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/x.svg",
        fallback: "X"
    },

    {
        name: "Pinterest",
        icon:
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/pinterest.svg",
        fallback: "P"
    },

    {
        name: "GitHub",
        icon:
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg",
        fallback: "GH"
    },

    {
        name: "Dribbble",
        icon:
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/dribbble.svg",
        fallback: "D"
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
        icon: "behance"
    },

    {
        name: "X",
        url:
        "https://x.com/shakilistic",
        icon: "x"
    },

    {
        name: "Pinterest",
        url:
        "https://www.pinterest.com/shakilistic/",
        icon: "pinterest"
    },

    {
        name: "LinkedIn",
        url:
        "https://www.linkedin.com/in/shakilistic/",
        icon: "linkedin"
    },

    {
        name: "GitHub",
        url:
        "https://github.com/shakilistic",
        icon: "github"
    },

    {
        name: "Dribbble",
        url:
        "https://dribbble.com/shakilistic",
        icon: "dribbble"
    }

];



/* ==========================================================
   TESTIMONIAL DATA
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
   SOCIAL ICONS
========================================================== */

const socialIcons = {


behance:

`
<svg viewBox="0 0 24 24">

<path d="
M6.5 11.1H3.2V7.4h3.1
c1.4 0 2.2.5 2.2 1.8
0 1.2-.8 1.9-2 1.9Zm.2 5.4
H3.2v-4.1h3.6
c1.6 0 2.5.7 2.5 2.1
0 1.5-1 2-2.6 2ZM9.8 11.7
c1.3-.7 2-1.7 2-3.2
0-2.8-2.1-4.2-5-4.2H0v15.2h7.1
c3.4 0 5.5-1.6 5.5-4.7
0-1.9-.9-3.2-2.8-4.1Zm9-3.8
c-3.6 0-5.9 2.5-5.9 6s2.2 6 6 6
c2.8 0 4.7-1.2 5.4-3.8h-2.8
c-.2.8-1.2 1.3-2.5 1.3
-1.8 0-2.8-.9-2.9-2.9h8.4
c.2-3.5-1.8-6.6-5.7-6.6Z
"/>

</svg>
`,


x:

`
<svg viewBox="0 0 24 24">

<path d="
M18.244 2.25h3.308
l-7.227 8.26
8.502 11.24h-6.657
l-5.214-6.817
-5.967 6.817H1.68
l7.73-8.835
L1.254 2.25H8.08
l4.713 6.231
5.45-6.231Z
"/>

</svg>
`,


pinterest:

`
<svg viewBox="0 0 24 24">

<path d="
M12 0a12 12 0 0 0-4.37 23.17
c-.1-1.87-.02-4.12.47-6.18
l1.54-6.52s-.39-.78-.39-1.94
c0-1.82 1.05-3.18 2.36-3.18
1.11 0 1.65.84 1.65 1.84
0 1.12-.71 2.8-1.08 4.36
-.31 1.3.65 2.36 1.93 2.36
2.32 0 4.1-2.45 4.1-5.98
0-3.13-2.25-5.31-5.46-5.31
-3.72 0-5.9 2.79-5.9 5.68
0 1.12.43 2.33.97 2.99
.11.13.12.24.09.37
l-.36 1.48
c-.06.24-.19.29-.44.17
-1.64-.76-2.66-3.15-2.66-5.07
0-4.13 3-7.92 8.65-7.92
4.54 0 8.07 3.24 8.07 7.56
0 4.51-2.84 8.14-6.79 8.14
-1.33 0-2.57-.69-3-1.5Z
"/>

</svg>
`,


linkedin:

`
<svg viewBox="0 0 24 24">

<path d="
M20.45 20.45h-3.56v-5.57
c0-1.33-.03-3.04-1.85-3.04
-1.86 0-2.14 1.45-2.14 2.94v5.67
H9.34V8.98h3.41v1.57h.05
c.48-.9 1.64-1.85 3.37-1.85
3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41
A2.06 2.06 0 1 1 5.32 3.3
a2.06 2.06 0 0 1 0 4.12ZM7.1 20.45
H3.54V8.98H7.1v11.47Z
"/>

</svg>
`,


github:

`
<svg viewBox="0 0 24 24">

<path d="
M12 .3a12 12 0 0 0-3.79 23.39
c.6.11.82-.26.82-.58v-2.24
c-3.34.73-4.04-1.42-4.04-1.42
-.55-1.39-1.33-1.76-1.33-1.76
-1.09-.74.08-.73.08-.73
1.2.09 1.84 1.24 1.84 1.24
1.07 1.84 2.81 1.31 3.5 1
.11-.78.42-1.31.76-1.61
-2.67-.3-5.47-1.33-5.47-5.93
0-1.31.47-2.38 1.23-3.22
-.12-.3-.53-1.53.12-3.18
0 0 1.01-.32 3.3 1.23
a11.5 11.5 0 0 1 6 0
c2.29-1.55 3.3-1.23 3.3-1.23
.65 1.65.24 2.88.12 3.18
.76.84 1.23 1.91 1.23 3.22
0 4.61-2.81 5.62-5.48 5.92
.43.37.81 1.1.81 2.22v3.29
c0 .32.22.7.83.58
A12 12 0 0 0 12 .3Z
"/>

</svg>
`,


dribbble:

`
<svg viewBox="0 0 24 24">

<path d="
M12 0a12 12 0 1 0 0 24
12 12 0 0 0 0-24Zm7.94 5.54
a10 10 0 0 1 2.01 6.15
c-.29-.06-3.18-.65-6.1-.28
-.24-.58-.5-1.16-.78-1.73
3.22-1.32 4.69-3.25 4.87-4.14ZM12 2
c2.54 0 4.87.95 6.64 2.52
-.15.2-1.46 1.94-4.46 3.07
A50.6 50.6 0 0 0 11.01 2.1
c.33-.05.66-.08.99-.08Z
"/>

</svg>
`

};



/* ==========================================================
   RENDER ACTIVE LOGO GROUP
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
                "active-logo";


            item.title =
                platform.name;


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                platform.icon;


            image.alt =
                platform.name;


            image.loading =
                "eager";



            const fallback =
                document.createElement(
                    "span"
                );


            fallback.className =
                "logo-fallback";


            fallback.textContent =
                platform.fallback;



            image.addEventListener(

                "error",

                function () {


                    item.classList.add(
                        "logo-error"
                    );


                }

            );



            item.appendChild(
                image
            );


            item.appendChild(
                fallback
            );


            group.appendChild(
                item
            );


        }

    );


    return group;

}



/* ==========================================================
   ENDLESS LOGOS
========================================================== */

function renderActiveLogos() {


    const track =
        document.getElementById(
            "activeLogoTrack"
        );


    track.innerHTML =
        "";


    /*
        TWO EXACT GROUPS.

        This allows seamless:
        1 → 2 → 1 → 2 forever.
    */


    track.appendChild(
        createLogoGroup()
    );


    track.appendChild(
        createLogoGroup()
    );


}



/* ==========================================================
   SOCIAL LINKS
========================================================== */

function renderSocialLinks() {


    const container =
        document.getElementById(
            "socialLinks"
        );


    container.innerHTML =

        socialProfiles

        .map(

            social => `

                <a
                    class="social-link"
                    href="${social.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="${social.name}"
                    aria-label="${social.name}"
                >

                    ${socialIcons[social.icon]}

                </a>

            `

        )

        .join("");


}



/* ==========================================================
   PROJECT SECTION
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
            class="more-wrap"
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


    const moreButton =
        section.querySelector(
            ".more-btn"
        );



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


        if (i > 8) {

            card.hidden = true;

        }


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


        image.onerror =
            function () {

                card.remove();

            };


        card.appendChild(
            image
        );


        grid.appendChild(
            card
        );


    }



    let expanded =
        false;



    moreButton.addEventListener(

        "click",

        function () {


            expanded =
                !expanded;


            Array.from(
                grid.children
            )

            .forEach(

                function (
                    card,
                    index
                ) {


                    if (
                        index >= 8
                    ) {

                        card.hidden =
                            !expanded;

                    }


                }

            );


            moreButton.textContent =

                expanded

                ? "SHOW LESS"

                : "SEE MORE";


        }

    );



    setTimeout(

        function () {


            if (
                grid.children.length <= 8
            ) {

                moreButton
                .parentElement
                .style
                .display =
                "none";

            }


        },

        1500

    );


}



/* ==========================================================
   PROJECTS
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
   ENDLESS TESTIMONIAL
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
   NAVIGATION WITHOUT #HOME/#WORK ETC
========================================================== */

function initializeCleanNavigation() {


    /*
        Remove any existing hash
        when page opens.
    */

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


                    /*
                        KEEP CLEAN URL
                    */

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


            if (button) {

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


    if (!menu) {

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


            if (!valid) {


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
   SCROLL REVEAL
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



/* ==========================================================
   PROFILE FALLBACK
========================================================== */

const profileImage =
    document.getElementById(
        "profileImage"
    );


if (profileImage) {


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
   START EVERYTHING
========================================================== */

renderActiveLogos();

renderSocialLinks();

renderProjects();

renderTestimonials();

initializeCleanNavigation();

initializeTheme();

initializeMenu();

initializeForm();

initializeReveal();

initializeBackToTop();
