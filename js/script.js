/* =========================================================
   SHAKIL R. PORTFOLIO
   COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   PORTFOLIO CONFIGURATION
   ========================================================= */

const portfolioSections = [

    {
        id: "book-cover",
        title: "BOOK COVER",
        orange: "DESIGN.",
        description:
            "Your cover gives one chance to make a first impression. I design bold, genre-aware covers that speak clearly, communicate value instantly, and make the book impossible to ignore.",
        prefix: "B",
        maxImages: 50
    },

    {
        id: "static-web",
        title: "STATIC WEB",
        orange: "DESIGN & DEVELOP.",
        description:
            "A good website should look impressive and guide the visitor naturally. I build clean, responsive experiences that communicate clearly and turn attention into action.",
        prefix: "W",
        maxImages: 50
    },

    {
        id: "social-media",
        title: "SOCIAL MEDIA",
        orange: "POSTER.",
        description:
            "In a crowded feed, you have seconds to be noticed. I create sharp, brand-focused social visuals that stop the scroll, deliver the message fast, and make your business look instantly more credible.",
        prefix: "S",
        maxImages: 50
    },

    {
        id: "logo-design",
        title: "LOGO",
        orange: "DESIGN.",
        description:
            "A memorable identity starts with a mark that feels unmistakably yours. I create distinctive, versatile logos built to give brands confidence and recognizable visual presence.",
        prefix: "L",
        maxImages: 50
    },

    {
        id: "print-media",
        title: "PRINT MEDIA",
        orange: "DESIGN.",
        description:
            "From T-shirts and food packaging to menus, banners and promotional materials, I create print-ready designs that carry your brand confidently from the screen into the real world.",
        prefix: "P",
        maxImages: 50
    }

];


/* =========================================================
   CLIENT FEEDBACK
   ========================================================= */

const clientFeedback = [

    {
        text:
            "Hi Shakil, I just wanted to take a moment to sincerely thank you for the outstanding work you've done on the cover and design for my Balance Exercise for Seniors Simplified. The attention to detail, creativity, and professionalism you brought to this project truly exceeded my expectations. I've received many compliments on how beautiful and appealing the design is. It has made a big difference in the presentation of the book, and I couldn't be happier with the result. I also want you to know that I will definitely be working with you again on my upcoming projects. Your talent and reliability have made this an easy decision. Thank you once again for helping bring my vision to life. I look forward to collaborating with you on future books!",
        author: "Linda Sabili"
    },

    {
        text:
            "Shakil is so easy to work with, responsive, and has a fantastic eye. This is our second project together, and it's getting better and better.",
        author: "Client"
    },

    {
        text:
            "I am so pleased with my designer. They had creative ideas that were not quite like the rest in my niche. I look forward to working with this designer in the future.",
        author: "Julie"
    },

    {
        text:
            "The best of the best - I've worked with Shakil for around a year now, give or take. He is one of the most helpful, responsive, and creatively quick freelancers I've ever worked with.",
        author: "Anonymous Client"
    },

    {
        text:
            "I have worked with Shakil for around a year now. He is one of the most helpful, responsive, and creatively quick freelancers I've ever worked with.",
        author: "Long-term Client"
    },

    {
        text:
            "Shakil is the best designer! He has an amazing eye for detail and is very responsive. I would highly recommend him to anyone looking for a professional designer.",
        author: "Client"
    },

    {
        text:
            "Shakil is always great to work with, delivering quickly, creatively and always going above and beyond. He has created many designs for our business and has become an essential part of our team.",
        author: "Client"
    },

    {
        text:
            "Shakil was amazing to work with in a very detailed, responsive, and professional way. I would recommend his services to anyone looking for a creative designer.",
        author: "Client"
    },

    {
        text:
            "The best of the best when I cover design, don't go with anyone other than Shakil and I've been in this business since 2017.",
        author: "Business Client"
    },

    {
        text:
            "I am more than satisfied with Shakil's design and highly recommend him to anybody that requires creative and professional design work.",
        author: "Client"
    },

    {
        text:
            "Shakil is an excellent designer. He is very responsive and always understands exactly what I need. The quality of his work is consistently excellent.",
        author: "Client"
    },

    {
        text:
            "I had an exceptional experience working with Shakil on the cover design for my book. His communication, creativity, and attention to detail were outstanding.",
        author: "Author Client"
    }

];


/* =========================================================
   SOCIAL / ACTIVE PROFILE LINKS
   ========================================================= */

const socialProfiles = [

    {
        name: "Behance",
        url: "https://www.behance.net/shakilistic",
        icon: "https://cdn.simpleicons.org/behance"
    },

    {
        name: "X",
        url: "https://x.com/shakilistic",
        icon: "https://cdn.simpleicons.org/x"
    },

    {
        name: "Pinterest",
        url: "https://www.pinterest.com/shakilistic/",
        icon: "https://cdn.simpleicons.org/pinterest"
    },

    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/shakilistic/",
        icon: "https://cdn.simpleicons.org/linkedin"
    },

    {
        name: "GitHub",
        url: "https://github.com/shakilistic",
        icon: "https://cdn.simpleicons.org/github"
    },

    {
        name: "Dribbble",
        url: "https://dribbble.com/shakilistic",
        icon: "https://cdn.simpleicons.org/dribbble"
    }

];


/* =========================================================
   FIND IMAGE FILE
   ========================================================= */

function imageExists(url) {

    return new Promise(resolve => {

        const image = new Image();

        image.onload = () => resolve(true);

        image.onerror = () => resolve(false);

        image.src = url;

    });

}


/* =========================================================
   FIND ALL SECTION IMAGES
   ========================================================= */

async function findSectionImages(prefix, maxImages = 50) {

    const extensions = [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "JPG",
        "JPEG",
        "PNG",
        "WEBP"
    ];

    const found = [];

    for (let number = 1; number <= maxImages; number++) {

        let foundThisNumber = false;

        for (const extension of extensions) {

            const path =
                `assets/images/${prefix}${number}.${extension}`;

            const exists = await imageExists(path);

            if (exists) {

                found.push(path);

                foundThisNumber = true;

                break;
            }

        }

        /*
           Continue searching even if one number is missing.
           This means B1, B3, B7 can still work.
        */

        if (foundThisNumber) {
            continue;
        }
    }

    return found;
}


/* =========================================================
   CREATE PORTFOLIO SECTION
   ========================================================= */

async function createPortfolioSection(config) {

    const images =
        await findSectionImages(
            config.prefix,
            config.maxImages
        );

    /*
       If there are no images, automatically hide section.
    */

    if (!images.length) {
        return null;
    }

    const section =
        document.createElement("section");

    section.className = "portfolio-section section";

    section.id = config.id;

    section.innerHTML = `

        <div class="portfolio-heading">

            <div>

                <h2 class="portfolio-title">
                    ${config.title}<br>
                    <span>${config.orange}</span>
                </h2>

            </div>

            <p class="portfolio-description">
                ${config.description}
            </p>

        </div>


        <div class="portfolio-carousel">

            <button
                class="carousel-button portfolio-prev hidden"
                type="button"
                aria-label="Previous"
            >
                ←
            </button>


            <div class="portfolio-window">

                <div class="portfolio-track">

                </div>

            </div>


            <button
                class="carousel-button portfolio-next hidden"
                type="button"
                aria-label="Next"
            >
                →
            </button>

        </div>

    `;


    const track =
        section.querySelector(".portfolio-track");

    const previous =
        section.querySelector(".portfolio-prev");

    const next =
        section.querySelector(".portfolio-next");


    images.forEach(imagePath => {

        const card =
            document.createElement("div");

        card.className = "portfolio-card";

        card.innerHTML = `

            <div class="portfolio-card-inner">

                <img
                    src="${imagePath}"
                    alt="Portfolio project"
                    loading="lazy"
                    draggable="false"
                >

            </div>

        `;

        /*
           IMPORTANT:
           Images are NOT clickable.
           No new tab.
           No full-page image.
        */

        card.addEventListener("click", event => {
            event.preventDefault();
        });

        track.appendChild(card);

    });


    setupPortfolioCarousel(
        section,
        images.length
    );


    return section;
}


/* =========================================================
   PORTFOLIO CAROUSEL
   ========================================================= */

function setupPortfolioCarousel(section, totalImages) {

    const track =
        section.querySelector(".portfolio-track");

    const previous =
        section.querySelector(".portfolio-prev");

    const next =
        section.querySelector(".portfolio-next");

    let currentIndex = 0;


    function visibleCards() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }


    function update() {

        const visible =
            visibleCards();

        const maxIndex =
            Math.max(
                0,
                totalImages - visible
            );


        currentIndex =
            Math.min(
                currentIndex,
                maxIndex
            );


        /*
           No arrows if 3 or fewer designs.
        */

        if (totalImages <= visible) {

            previous.classList.add("hidden");
            next.classList.add("hidden");

        } else {

            previous.classList.toggle(
                "hidden",
                currentIndex <= 0
            );

            next.classList.toggle(
                "hidden",
                currentIndex >= maxIndex
            );

        }


        const cardWidth =
            track.children[0]
                ? track.children[0].getBoundingClientRect().width
                : 0;


        const gap =
            parseFloat(
                getComputedStyle(track).gap
            ) || 0;


        const offset =
            currentIndex *
            (cardWidth + gap);


        track.style.transform =
            `translateX(-${offset}px)`;

    }


    previous.addEventListener(
        "click",
        () => {

            if (currentIndex > 0) {

                currentIndex--;

                update();

            }

        }
    );


    next.addEventListener(
        "click",
        () => {

            const maxIndex =
                Math.max(
                    0,
                    totalImages - visibleCards()
                );

            if (currentIndex < maxIndex) {

                currentIndex++;

                update();

            }

        }
    );


    window.addEventListener(
        "resize",
        update
    );


    /*
       Wait until images/layout are ready.
    */

    setTimeout(update, 100);

}


/* =========================================================
   CREATE CLIENT FEEDBACK SECTION
   ========================================================= */

function createClientSection() {

    if (!clientFeedback.length) {
        return null;
    }

    const section =
        document.createElement("section");

    section.className =
        "client-section section";

    section.id =
        "clients";


    section.innerHTML = `

        <div class="client-heading">

            <div>

                <h2 class="portfolio-title">
                    WHAT CLIENTS<br>
                    <span>SAY.</span>
                </h2>

            </div>

            <p class="client-description">
                The strongest proof of great work is what the people
                behind the project say after they receive it.
                These are genuine client experiences collected from my work.
            </p>

        </div>


        <div class="client-carousel">

            <button
                class="carousel-button client-prev hidden"
                type="button"
                aria-label="Previous feedback"
            >
                ←
            </button>


            <div class="client-window">

                <div class="client-track">

                </div>

            </div>


            <button
                class="carousel-button client-next hidden"
                type="button"
                aria-label="Next feedback"
            >
                →
            </button>

        </div>

    `;


    const track =
        section.querySelector(".client-track");


    clientFeedback.forEach((feedback, index) => {

        const card =
            document.createElement("article");

        card.className =
            "client-card";


        const shortened =
            feedback.text.length > 430;


        card.innerHTML = `

            <div class="client-stars">
                ★★★★★
            </div>

            <p class="client-text">
                ${feedback.text}
            </p>

            <button
                class="client-see-more"
                type="button"
                ${shortened ? "" : "hidden"}
            >
                See More
            </button>

            <div class="client-author">
                — ${feedback.author}
            </div>

        `;


        /*
           Only long feedback gets See More.
        */

        const seeMore =
            card.querySelector(".client-see-more");

        const text =
            card.querySelector(".client-text");


        if (shortened) {

            const fullText =
                feedback.text;

            const shortText =
                fullText.slice(0, 430) + "...";


            text.textContent =
                shortText;


            seeMore.addEventListener(
                "click",
                () => {

                    const expanded =
                        card.classList.toggle(
                            "expanded"
                        );


                    if (expanded) {

                        text.textContent =
                            fullText;

                        seeMore.textContent =
                            "See Less";

                    } else {

                        text.textContent =
                            shortText;

                        seeMore.textContent =
                            "See More";

                    }

                }
            );

        }


        track.appendChild(card);

    });


    setupClientCarousel(section);

    return section;
}


/* =========================================================
   CLIENT CAROUSEL
   ========================================================= */

function setupClientCarousel(section) {

    const track =
        section.querySelector(".client-track");

    const previous =
        section.querySelector(".client-prev");

    const next =
        section.querySelector(".client-next");

    let currentIndex = 0;

    let autoTimer = null;


    function visibleCards() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 4;
    }


    function maxIndex() {

        return Math.max(
            0,
            clientFeedback.length -
            visibleCards()
        );

    }


    function update() {

        currentIndex =
            Math.min(
                currentIndex,
                maxIndex()
            );


        const cards =
            track.children;


        if (!cards.length) {
            return;
        }


        const cardWidth =
            cards[0]
                .getBoundingClientRect()
                .width;


        const gap =
            parseFloat(
                getComputedStyle(track).gap
            ) || 0;


        const offset =
            currentIndex *
            (cardWidth + gap);


        track.style.transform =
            `translateX(-${offset}px)`;


        /*
           User requested arrows removed.
        */

        previous.classList.add("hidden");
        next.classList.add("hidden");

    }


    function nextSlide() {

        if (currentIndex >= maxIndex()) {

            currentIndex = 0;

        } else {

            currentIndex++;

        }

        update();

    }


    /*
       Automatic sliding.
    */

    function startAutoSlide() {

        stopAutoSlide();

        autoTimer =
            setInterval(
                nextSlide,
                4000
            );

    }


    function stopAutoSlide() {

        if (autoTimer) {

            clearInterval(autoTimer);

            autoTimer = null;

        }

    }


    /*
       Stop while mouse is over client feedback.
    */

    section.addEventListener(
        "mouseenter",
        stopAutoSlide
    );


    section.addEventListener(
        "mouseleave",
        startAutoSlide
    );


    previous.addEventListener(
        "click",
        () => {

            if (currentIndex > 0) {

                currentIndex--;

            } else {

                currentIndex =
                    maxIndex();

            }

            update();

        }
    );


    next.addEventListener(
        "click",
        nextSlide
    );


    window.addEventListener(
        "resize",
        update
    );


    setTimeout(() => {

        update();

        startAutoSlide();

    }, 300);

}


/* =========================================================
   CREATE SOCIAL LINKS
   ========================================================= */

function createSocialLinks(containerId) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }


    socialProfiles.forEach(profile => {

        const link =
            document.createElement("a");

        link.className =
            "social-link";

        link.href =
            profile.url;

        link.target =
            "_blank";

        link.rel =
            "noopener noreferrer";

        link.setAttribute(
            "aria-label",
            profile.name
        );


        link.innerHTML = `

            <img
                src="${profile.icon}"
                alt="${profile.name}"
            >

            <span
                class="social-fallback"
                style="display:none;"
            >
                ${profile.name.charAt(0)}
            </span>

        `;


        const image =
            link.querySelector("img");

        const fallback =
            link.querySelector(
                ".social-fallback"
            );


        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

                fallback.style.display =
                    "block";

            }
        );


        container.appendChild(link);

    });

}


/* =========================================================
   ACTIVE PROFILE LOGOS
   ========================================================= */

function createActiveProfiles() {

    const track =
        document.getElementById(
            "profiles-track"
        );

    if (!track) {
        return;
    }


    /*
       Two copies create a continuous loop.
       Clicking logos does NOTHING.
    */

    const logos =
        [
            ...socialProfiles,
            ...socialProfiles
        ];


    logos.forEach(profile => {

        const item =
            document.createElement("div");

        item.className =
            "profile-logo";


        item.innerHTML = `

            <img
                src="${profile.icon}"
                alt="${profile.name}"
            >

        `;


        /*
           No link.
           No Blogger.
           No external page.
        */

        item.addEventListener(
            "click",
            event => {
                event.preventDefault();
            }
        );


        track.appendChild(item);

    });

}


/* =========================================================
   LOAD PORTFOLIO
   ========================================================= */

async function loadPortfolio() {

    const container =
        document.getElementById(
            "portfolio-sections"
        );

    if (!container) {
        return;
    }


    for (const config of portfolioSections) {

        const section =
            await createPortfolioSection(
                config
            );


        if (section) {

            container.appendChild(
                section
            );

        }

    }


    /*
       Client feedback appears after portfolio sections.
    */

    const clientSection =
        createClientSection();


    if (clientSection) {

        /*
           Put client section before reason section.
        */

        const reason =
            document.querySelector(
                ".reason-section"
            );

        if (reason) {

            reason.parentNode.insertBefore(
                clientSection,
                reason
            );

        } else {

            container.appendChild(
                clientSection
            );

        }

    }

}


/* =========================================================
   URL-SAFE INTERNAL NAVIGATION
   ========================================================= */

function setupNavigation() {

    const links =
        document.querySelectorAll(
            "[data-scroll]"
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const targetId =
                    link.getAttribute("href");


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }


                /*
                   Keep URL exactly:
                   https://shakilistic.github.io/
                */

                history.replaceState(
                    null,
                    "",
                    "/"
                );


                const mobileMenu =
                    document.querySelector(
                        ".mobile-menu"
                    );

                if (mobileMenu) {

                    mobileMenu.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


    const home =
        document.querySelector(
            "[data-home]"
        );


    if (home) {

        home.addEventListener(
            "click",
            event => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                history.replaceState(
                    null,
                    "",
                    "/"
                );

            }
        );

    }


    const viewWork =
        document.querySelector(
            "[data-scroll-to='work']"
        );


    if (viewWork) {

        viewWork.addEventListener(
            "click",
            () => {

                const work =
                    document.getElementById(
                        "work"
                    );

                if (work) {

                    work.scrollIntoView({
                        behavior: "smooth"
                    });

                }

                history.replaceState(
                    null,
                    "",
                    "/"
                );

            }
        );

    }

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function setupBackToTop() {

    const button =
        document.getElementById(
            "back-to-top"
        );


    if (!button) {
        return;
    }


    function updateVisibility() {

        if (window.scrollY > 450) {

            button.classList.add(
                "visible"
            );

        } else {

            button.classList.remove(
                "visible"
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
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


            /*
               URL remains root.
            */

            history.replaceState(
                null,
                "",
                "/"
            );

        }
    );


    updateVisibility();

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

    const button =
        document.querySelector(
            ".mobile-menu-button"
        );

    const menu =
        document.querySelector(
            ".mobile-menu"
        );


    if (!button || !menu) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            menu.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================================================
   FORM
   ========================================================= */

function setupForm() {

    const form =
        document.getElementById(
            "contact-form"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        () => {

            /*
               FormSubmit handles submission.
               Nothing is intercepted here.
            */

        }
    );

}


/* =========================================================
   REMOVE URL HASH
   ========================================================= */

function removeHashFromUrl() {

    if (
        window.location.hash
    ) {

        history.replaceState(
            null,
            "",
            window.location.pathname
        );

    }

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        removeHashFromUrl();

        setupNavigation();

        setupMobileMenu();

        setupBackToTop();

        setupForm();

        createSocialLinks(
            "contact-socials"
        );

        createSocialLinks(
            "footer-socials"
        );

        createActiveProfiles();

        await loadPortfolio();

    }
);
