/* ==========================================================
   SHAKIL R.
   VISUAL DESIGN EXPERT
========================================================== */


/*
==========================================================
GOOGLE SHEET CONNECTION
==========================================================

Google Apps Script deploy করার পর
যে URL পাবে সেটা এখানে বসাবে।

Example:

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/XXXXX/exec";

*/

const GOOGLE_SCRIPT_URL =
    "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";



/* ==========================================================
   PORTFOLIO CATEGORIES
========================================================== */

const categories = [

    {

        key: "book",

        title: "Book Cover Design"

    },


    {

        key: "web",

        title: "Web Design & Development"

    },


    {

        key: "social",

        title: "Social Media Design"

    },


    {

        key: "logo",

        title: "Logo Design"

    },


    {

        key: "print",

        title: "Print Media"

    }

];



/* ==========================================================
   WHERE I'M ACTIVE

   IMPORTANT:
   These logos are intentionally NOT clickable.
========================================================== */

const activePlatforms = [

    {

        name: "Behance",

        icon:
        "https://cdn.simpleicons.org/behance"

    },


    {

        name: "LinkedIn",

        icon:
        "https://cdn.simpleicons.org/linkedin"

    },


    {

        name: "X",

        icon:
        "https://cdn.simpleicons.org/x"

    },


    {

        name: "Pinterest",

        icon:
        "https://cdn.simpleicons.org/pinterest"

    },


    {

        name: "GitHub",

        icon:
        "https://cdn.simpleicons.org/github"

    },


    {

        name: "Dribbble",

        icon:
        "https://cdn.simpleicons.org/dribbble"

    },


    {

        name: "Adobe",

        icon:
        "https://cdn.simpleicons.org/adobe"

    },


    {

        name: "Figma",

        icon:
        "https://cdn.simpleicons.org/figma"

    }

];



/* ==========================================================
   YOUR EXACT SOCIAL LINKS
========================================================== */

const socialProfiles = [

    {

        name: "Behance",

        url:
        "https://www.behance.net/shakilistic",

        icon:
        "behance"

    },


    {

        name: "X",

        url:
        "https://x.com/shakilistic",

        icon:
        "x"

    },


    {

        name: "Pinterest",

        url:
        "https://www.pinterest.com/shakilistic/",

        icon:
        "pinterest"

    },


    {

        name: "LinkedIn",

        url:
        "https://www.linkedin.com/in/shakilistic/",

        icon:
        "linkedin"

    },


    {

        name: "GitHub",

        url:
        "https://github.com/shakilistic",

        icon:
        "github"

    },


    {

        name: "Dribbble",

        url:
        "https://dribbble.com/shakilistic",

        icon:
        "dribbble"

    }

];



/* ==========================================================
   TESTIMONIALS

   Change these texts later with your real client reviews.
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
   SOCIAL SVG ICONS
========================================================== */

const icons = {



behance:

`
<svg viewBox="0 0 24 24">

<path d="
M6.5 11.1H3.2V7.4h3.1
c1.4 0 2.2.5 2.2 1.8
0 1.2-.8 1.9-2 1.9Zm.2 5.4H3.2v-4.1h3.6
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
c.2-3.5-1.8-6.6-5.7-6.6Zm-2.7 4.6
c.2-1.5 1-2.3 2.6-2.3
1.4 0 2.4.8 2.5 2.3h-5.1ZM15.8 4.8
h5.8v1.7h-5.8V4.8Z
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
5.45-6.231Zm-1.161 17.52h1.833
L7.084 4.126H5.117
L17.083 19.77Z
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
-1.33 0-2.57-.69-3-1.5
l-.82 3.1
c-.29 1.14-1.09 2.57-1.62 3.44
A12 12 0 1 0 12 0Z
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
c.33-.05.66-.08.99-.08ZM8.86 2.5
a42.8 42.8 0 0 1 3.21 5.4
c-3.95 1.05-7.44 1.03-7.82 1.02
A10.05 10.05 0 0 1 8.86 2.5ZM2 12v-.3
c.2.01 4.3.08 9.02-1.24
.25.5.49 1 .71 1.51
-4.25 1.2-6.49 4.49-6.72 4.84
A9.95 9.95 0 0 1 2 12Zm10 10
a9.96 9.96 0 0 1-5.5-1.65
c.18-.3 1.84-2.93 5.99-4.05
1.12 2.91 1.58 5.35 1.69 6
A10.3 10.3 0 0 1 12 22Zm4.12-1.5
c-.08-.48-.5-2.8-1.54-5.59
2.75-.44 5.16.28 5.45.37
a10.03 10.03 0 0 1-3.91 5.22Z
"/>

</svg>
`

};



/* ==========================================================
   ACTIVE LOGOS
========================================================== */

function renderActiveLogos() {


    const track =
        document.getElementById(
            "activeLogoTrack"
        );


    /*
        Duplicate items so animation
        becomes continuous.
    */

    const repeatedPlatforms = [

        ...activePlatforms,

        ...activePlatforms

    ];


    track.innerHTML =

        repeatedPlatforms

        .map(

            platform => `

                <div
                    class="active-logo"
                    title="${platform.name}"
                    aria-label="${platform.name}"
                >

                    <img
                        src="${platform.icon}"
                        alt="${platform.name}"
                        loading="lazy"
                    >

                </div>

            `

        )

        .join("");


}



/* ==========================================================
   SOCIAL LINKS
========================================================== */

function renderSocialLinks() {


    const socialContainer =

        document.getElementById(
            "socialLinks"
        );


    socialContainer.innerHTML =

        socialProfiles

        .map(

            social => `

                <a
                    class="social-link"
                    href="${social.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="${social.name}"
                    title="${social.name}"
                >

                    ${icons[social.icon]}

                </a>

            `

        )

        .join("");


}



/* ==========================================================
   CREATE PROJECT SECTION
========================================================== */

function createProjectSection(category) {


    const projectContainer =

        document.getElementById(
            "projectSections"
        );


    const section =

        document.createElement(
            "section"
        );


    section.className =
        "project-section";


    section.id =
        category.key;


    section.innerHTML = `


        <div class="project-header">


            <h3>

                ${category.title}

            </h3>


            <p>

                01 — 20

            </p>


        </div>



        <div
            class="project-grid"
            id="${category.key}Grid"
        ></div>



        <div class="more-wrap">

            <button
                class="more-btn"
                type="button"
            >

                SEE MORE

            </button>

        </div>


    `;


    projectContainer.appendChild(
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



    /*
    ======================================================
    AUTOMATIC IMAGE GENERATION
    ======================================================

    book1.jpg → book20.jpg

    web1.jpg → web20.jpg

    social1.jpg → social20.jpg

    logo1.jpg → logo20.jpg

    print1.jpg → print20.jpg

    */


    for (

        let imageNumber = 1;

        imageNumber <= 20;

        imageNumber++

    ) {


        const card =

            document.createElement(
                "article"
            );


        card.className =
            "project-card";



        /*
            Initial display:
            only 8 images
        */

        if (imageNumber > 8) {

            card.hidden = true;

        }



        const image =

            document.createElement(
                "img"
            );



        image.src =

            `assets/images/${category.key}${imageNumber}.jpg`;



        image.alt =

            `${category.title} project ${imageNumber}`;



        image.loading =
            "lazy";



        /*
            If image file does not exist,
            automatically remove card.
        */

        image.onerror = function () {

            card.remove();

        };



        card.appendChild(
            image
        );


        grid.appendChild(
            card
        );


    }



    /* ======================================================
       SEE MORE
    ====================================================== */

    let expanded =
        false;



    moreButton.addEventListener(

        "click",

        function () {


            expanded =
                !expanded;



            const cards =

                grid.children;



            Array.from(cards)

            .forEach(

                function (
                    card,
                    index
                ) {


                    if (index >= 8) {

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



    /*
        If there are <= 8 images
        hide SEE MORE button.
    */

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

        1300

    );


}



/* ==========================================================
   RENDER ALL PROJECTS
========================================================== */

function renderProjects() {


    categories.forEach(

        createProjectSection

    );


}



/* ==========================================================
   TESTIMONIALS
========================================================== */

function renderTestimonials() {


    const testimonialTrack =

        document.getElementById(
            "testimonialTrack"
        );



    /*
        Duplicate testimonials
        for endless continuous movement.
    */

    const repeatedTestimonials = [

        ...testimonials,

        ...testimonials

    ];



    testimonialTrack.innerHTML =

        repeatedTestimonials

        .map(

            testimonial => `


                <article
                    class="review-card"
                >


                    <div
                        class="stars"
                    >

                        ${testimonial[0]}

                    </div>



                    <p>

                        “${testimonial[1]}”

                    </p>



                    <strong>

                        ${testimonial[2]}

                    </strong>


                </article>


            `

        )

        .join("");


}



/* ==========================================================
   THEME SYSTEM
========================================================== */

function initializeTheme() {


    const themeButton =
        document.getElementById(
            "themeSwitch"
        );


    const mobileThemeButton =
        document.getElementById(
            "mobileThemeSwitch"
        );


    const systemTheme =

        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );



    function toggleTheme() {


        const currentTheme =

            document
            .documentElement
            .dataset
            .theme;



        const newTheme =

            currentTheme === "dark"

            ? "light"

            : "dark";



        document
        .documentElement
        .dataset
        .theme =
        newTheme;



        localStorage.setItem(

            "portfolio-theme",

            newTheme

        );


    }



    themeButton.addEventListener(

        "click",

        toggleTheme

    );


    mobileThemeButton.addEventListener(

        "click",

        toggleTheme

    );



    /*
        Follow browser automatically
        unless user manually selected
        light/dark previously.
    */

    systemTheme.addEventListener(

        "change",

        function (event) {


            const savedTheme =

                localStorage.getItem(
                    "portfolio-theme"
                );


            if (!savedTheme) {


                document
                .documentElement
                .dataset
                .theme =

                event.matches

                ? "dark"

                : "light";


            }


        }

    );


}



/* ==========================================================
   MOBILE MENU
========================================================== */

function initializeMenu() {


    const menuButton =

        document.getElementById(
            "menuBtn"
        );


    const mobileMenu =

        document.getElementById(
            "mobileMenu"
        );



    menuButton.addEventListener(

        "click",

        function () {


            const open =

                mobileMenu
                .classList
                .toggle(
                    "open"
                );



            menuButton.setAttribute(

                "aria-expanded",

                open

            );


            mobileMenu.setAttribute(

                "aria-hidden",

                !open

            );


        }

    );



    const mobileLinks =

        mobileMenu
        .querySelectorAll(
            "a"
        );



    mobileLinks.forEach(

        function (link) {


            link.addEventListener(

                "click",

                function () {


                    mobileMenu
                    .classList
                    .remove(
                        "open"
                    );


                    menuButton
                    .setAttribute(

                        "aria-expanded",

                        "false"

                    );


                    mobileMenu
                    .setAttribute(

                        "aria-hidden",

                        "true"

                    );


                }

            );


        }

    );


}



/* ==========================================================
   EMAIL VALIDATION
========================================================== */


/*
    This checks whether the email DOMAIN
    has MX records.

    Example:

    someone@gmail.com

    gmail.com → mail server exists.

    IMPORTANT:

    Browser-based static GitHub Pages
    cannot reliably know whether the exact
    mailbox "someone@gmail.com" exists.

    For exact mailbox verification,
    OTP / verification email API is required.
*/

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

                "&type=MX"

            );



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

    catch (error) {


        /*
            DNS service unavailable হলে
            legitimate user-কে block করবো না.
        */

        return true;


    }


}



/* ==========================================================
   CONTACT FORM
========================================================== */

function initializeContactForm() {


    const form =

        document.getElementById(
            "contactForm"
        );


    const formStatus =

        document.getElementById(
            "formStatus"
        );


    const submitButton =

        document.getElementById(
            "submitBtn"
        );



    form.addEventListener(

        "submit",

        async function (event) {


            event.preventDefault();



            formStatus.className =
                "form-status";


            formStatus.textContent =
                "";



            /* Browser validation */

            if (!form.checkValidity()) {


                form.reportValidity();


                return;


            }



            const formData =

                new FormData(
                    form
                );



            /*
                Honeypot spam protection
            */

            if (
                formData.get("website")
            ) {

                return;

            }



            const email =

                String(
                    formData.get(
                        "email"
                    )
                    || ""
                )

                .trim();



            submitButton.disabled =
                true;



            formStatus.textContent =

                "Checking email...";



            /* Validate MX */

            const emailOkay =

                await emailDomainLooksValid(
                    email
                );



            if (!emailOkay) {


                formStatus.className =

                    "form-status error";


                formStatus.textContent =

                    "This email domain does not appear able to receive email.";



                submitButton.disabled =
                    false;


                return;


            }



            /*
                Script URL missing
            */

            if (

                !GOOGLE_SCRIPT_URL

                ||

                GOOGLE_SCRIPT_URL.includes(
                    "PASTE_YOUR"
                )

            ) {


                formStatus.className =

                    "form-status error";


                formStatus.textContent =

                    "Google Sheet connection has not been configured yet.";


                submitButton.disabled =

                    false;


                return;


            }



            formStatus.textContent =

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
                    ),


                page:

                    window.location.href,


                submittedAt:

                    new Date()
                    .toISOString()


            };



            try {


                /*
                    no-cors is used because
                    Google Apps Script
                    redirects requests.
                */

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



                formStatus.className =

                    "form-status success";



                formStatus.textContent =

                    "Thanks — your inquiry has been sent successfully.";


            }


            catch (error) {


                formStatus.className =

                    "form-status error";


                formStatus.textContent =

                    "Could not send your inquiry. Please try again.";


            }


            finally {


                submitButton.disabled =

                    false;


            }


        }

    );


}



/* ==========================================================
   SCROLL REVEAL
========================================================== */

function initializeRevealAnimation() {


    const revealElements =

        document.querySelectorAll(
            ".reveal"
        );



    const observer =

        new IntersectionObserver(

            function (entries) {


                entries.forEach(

                    function (entry) {


                        if (
                            entry.isIntersecting
                        ) {


                            entry.target
                            .classList
                            .add(
                                "visible"
                            );


                            observer
                            .unobserve(
                                entry.target
                            );


                        }


                    }

                );


            },

            {

                threshold: 0.12

            }

        );



    revealElements.forEach(

        function (element) {


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



profileImage.addEventListener(

    "error",

    function () {


        profileImage.style.display =
            "none";


    }

);



/* ==========================================================
   FOOTER YEAR
========================================================== */

document.getElementById(
    "year"
).textContent =

new Date().getFullYear();



/* ==========================================================
   INITIALIZE EVERYTHING
========================================================== */

renderActiveLogos();


renderSocialLinks();


renderProjects();


renderTestimonials();


initializeTheme();


initializeMenu();


initializeContactForm();


initializeRevealAnimation();


initializeBackToTop();
