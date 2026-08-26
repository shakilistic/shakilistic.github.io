const root = document.documentElement;

const saved = localStorage.getItem("shakilstic-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

root.classList.toggle(
  "dark",
  saved ? saved === "dark" : prefersDark
);


/* =========================
   THEME SWITCH
========================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function updateIcon() {
  if (!themeIcon) return;

  themeIcon.textContent =
    root.classList.contains("dark") ? "☀" : "☾";
}

updateIcon();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    root.classList.toggle("dark");

    localStorage.setItem(
      "shakilstic-theme",
      root.classList.contains("dark")
        ? "dark"
        : "light"
    );

    updateIcon();
  });
}


/* =========================
   MOBILE MENU
========================= */

const menuToggle =
  document.getElementById("menuToggle");

const mobileMenu =
  document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });

    });
}


/* =========================
   PORTFOLIO CATEGORIES
========================= */

const categories = [

  {
    key: "B",
    title: "BOOK COVER DESIGN",
    desc:
      "Book covers, editorial concepts and visual systems designed to make the first impression count."
  },

  {
    key: "W",
    title: "WEB DESIGN & DEVELOPMENT",
    desc:
      "Responsive digital experiences with clear hierarchy, personality and useful interactions."
  },

  {
    key: "S",
    title: "SOCIAL MEDIA POSTER",
    desc:
      "Campaign visuals and social graphics built for attention, clarity and platform performance."
  },

  {
    key: "L",
    title: "LOGO DESIGN",
    desc:
      "Identity marks and visual directions created to be recognizable, flexible and memorable."
  },

  {
    key: "P",
    title: "PRINT MEDIA DESIGN",
    desc:
      "Print-ready creative work across posters, brochures, packaging and promotional materials."
  }

];


const portfolio =
  document.getElementById("portfolio");


/* =========================
   IMAGE CHECK
========================= */

const imageExists = src =>
  new Promise(resolve => {

    const img = new Image();

    img.onload = () => resolve(true);

    img.onerror = () => resolve(false);

    img.src = src;

  });


/* =========================
   BUILD PORTFOLIO
========================= */

async function buildPortfolio() {

  if (!portfolio) return;

  let html = "";

  for (const category of categories) {

    const found = [];

    /*
      Checks:

      B1.jpg
      B2.jpg
      B3.jpg
      ...

      W1.jpg
      L1.jpg
      etc.
    */

    for (let i = 1; i <= 30; i++) {

      const src =
        `assets/images/${category.key}${i}.jpg`;

      if (await imageExists(src)) {

        found.push({
          src: src,
          number: i
        });

      }

    }


    /*
      If no images exist,
      completely hide the section.
    */

    if (!found.length) continue;


    html += `

      <section
        class="portfolio-section reveal"
        id="${category.key.toLowerCase()}-work"
      >

        <div class="container">

          <div class="section-head">

            <div>

              <p class="eyebrow">
                ${category.title}
              </p>

              <h2>
                ${category.title}
              </h2>

            </div>

            <p class="section-description">
              ${category.desc}
            </p>

          </div>


          <div class="projects">

    `;


    found.forEach((item, index) => {

      html += `

        <article
          class="project ${index < 4 ? "visible" : ""}"
        >

          <div class="project-media">

            <img
              src="${item.src}"
              alt="${category.title} ${item.number}"
              loading="lazy"
            >

          </div>


          <div class="project-info">

            <small>
              ${String(item.number).padStart(2, "0")}
            </small>

            <h3>
              ${category.title}
            </h3>

          </div>

        </article>

      `;

    });


    html += `

          </div>

          ${
            found.length > 4
              ? `
                <button
                  class="show-more active"
                  type="button"
                >
                  Show More
                </button>
              `
              : ""
          }

        </div>

      </section>

    `;

  }


  /*
    If absolutely no portfolio images exist.
  */

  portfolio.innerHTML =
    html ||
    `

      <section class="portfolio-section">

        <div class="container">

          <p class="body-copy">

            Add portfolio images to
            <b>assets/images</b>

            using names such as:

            B1.jpg,
            L1.jpg,
            W1.jpg,
            S1.jpg,
            P1.jpg

          </p>

        </div>

      </section>

    `;


  /* =========================
     SHOW MORE / LESS
  ========================= */

  document
    .querySelectorAll(".show-more")
    .forEach(button => {

      button.addEventListener("click", () => {

        const projects =
          button.parentElement
            .querySelectorAll(".project");


        const expanded =
          button.dataset.open === "1";


        projects.forEach((project, index) => {

          if (index >= 4) {

            project.classList.toggle(
              "visible",
              !expanded
            );

          }

        });


        button.dataset.open =
          expanded ? "0" : "1";


        button.textContent =
          expanded
            ? "Show More"
            : "Show Less";

      });

    });


  observeReveals();

}


/* =========================
   SCROLL ANIMATION
========================= */

function observeReveals() {

  const elements =
    document.querySelectorAll(
      ".reveal:not(.observer-ready)"
    );


  if (!("IntersectionObserver" in window)) {

    elements.forEach(element => {
      element.classList.add("in");
    });

    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("in");

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(element => {

    element.classList.add(
      "observer-ready"
    );

    observer.observe(element);

  });

}


buildPortfolio();


/* =========================
   YEAR
========================= */

const year =
  document.getElementById("year");

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =========================
   BUTTON RIPPLE EFFECT
========================= */

document
  .querySelectorAll(".button")
  .forEach(button => {

    button.addEventListener(
      "pointerdown",
      event => {

        const rect =
          button.getBoundingClientRect();


        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;


        const ripple =
          document.createElement("i");


        ripple.style.cssText = `

          position:absolute;

          width:10px;
          height:10px;

          border-radius:50%;

          background:#fff;

          opacity:.35;

          left:${x}px;
          top:${y}px;

          transform:
            translate(-50%,-50%)
            scale(1);

          transition:
            transform .55s,
            opacity .55s;

          pointer-events:none;

        `;


        button.appendChild(ripple);


        requestAnimationFrame(() => {

          ripple.style.transform =
            "translate(-50%,-50%) scale(30)";

          ripple.style.opacity = "0";

        });


        setTimeout(() => {

          ripple.remove();

        }, 600);

      }

    );

  });


/* =========================
   CONTACT FORM
========================= */

const FORM_ENDPOINT = "";


const contactForm =
  document.getElementById("contactForm");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const status =
        document.getElementById(
          "formStatus"
        );


      /*
        Google Apps Script URL
        will be added later.
      */

      if (!FORM_ENDPOINT) {

        if (status) {

          status.textContent =
            "Form is ready. Google Sheet connection will be activated next.";

        }

        return;

      }


      if (status) {

        status.textContent =
          "Sending...";

      }


      try {

        const data =
          Object.fromEntries(
            new FormData(
              contactForm
            ).entries()
          );


        await fetch(
          FORM_ENDPOINT,
          {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(data)
          }
        );


        contactForm.reset();


        if (status) {

          status.textContent =
            "Thanks — your inquiry has been sent.";

        }

      }

      catch (error) {

        console.error(error);


        if (status) {

          status.textContent =
            "Could not send right now. Please try again.";

        }

      }

    }
  );

}
