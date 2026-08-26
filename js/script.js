document.addEventListener("DOMContentLoaded", () => {

"use strict";


/* =========================================================
   BASIC
========================================================= */

const root = document.documentElement;

const year = document.getElementById("year");

if(year){

year.textContent =
new Date().getFullYear();

}


/* =========================================================
   THEME
   Browser theme first.
   Manual button overrides it.
========================================================= */

const themeToggle =
document.getElementById("themeToggle");

const themeIcon =
document.getElementById("themeIcon");

const savedTheme =
localStorage.getItem("shakilstic-theme");


function browserTheme(){

return window.matchMedia(
"(prefers-color-scheme: dark)"
).matches
? "dark"
: "light";

}


function applyTheme(theme){

root.setAttribute(
"data-theme",
theme
);

if(themeIcon){

themeIcon.textContent =
theme === "dark"
? "☀"
: "☾";

}

}


applyTheme(
savedTheme === "dark" ||
savedTheme === "light"
? savedTheme
: browserTheme()
);


themeToggle?.addEventListener(
"click",
() => {

const current =
root.getAttribute("data-theme");

const next =
current === "dark"
? "light"
: "dark";

applyTheme(next);

localStorage.setItem(
"shakilstic-theme",
next
);

}
);


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
document.getElementById("menuToggle");

const mobileMenu =
document.getElementById("mobileMenu");


menuToggle?.addEventListener(
"click",
() => {

const open =
mobileMenu.classList.toggle("open");

menuToggle.textContent =
open ? "×" : "☰";

}
);


document.querySelectorAll(
".mobile-menu a"
).forEach(link => {

link.addEventListener(
"click",
() => {

mobileMenu.classList.remove(
"open"
);

menuToggle.textContent =
"☰";

}
);

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
document.querySelectorAll(".reveal");


if("IntersectionObserver" in window){

const revealObserver =
new IntersectionObserver(
(entries, observer) => {

entries.forEach(entry => {

if(!entry.isIntersecting)
return;

entry.target.classList.add(
"visible"
);

observer.unobserve(
entry.target
);

});

},
{
threshold:.08,
rootMargin:
"0px 0px -45px 0px"
}
);


revealElements.forEach(
element =>
revealObserver.observe(element)
);

}else{

revealElements.forEach(
element =>
element.classList.add("visible")
);

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot =
document.querySelector(".cursor-dot");

const cursorRing =
document.querySelector(".cursor-ring");


if(
cursorDot &&
cursorRing &&
window.matchMedia(
"(pointer:fine)"
).matches
){

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener(
"mousemove",
event => {

mouseX =
event.clientX;

mouseY =
event.clientY;

cursorDot.style.left =
mouseX + "px";

cursorDot.style.top =
mouseY + "px";

}
);


function animateCursor(){

ringX +=
(mouseX - ringX) * .13;

ringY +=
(mouseY - ringY) * .13;

cursorRing.style.left =
ringX + "px";

cursorRing.style.top =
ringY + "px";

requestAnimationFrame(
animateCursor
);

}

animateCursor();


document.querySelectorAll(
"a, button, input, textarea"
).forEach(element => {

element.addEventListener(
"mouseenter",
() =>
document.body.classList.add(
"cursor-hover"
)
);

element.addEventListener(
"mouseleave",
() =>
document.body.classList.remove(
"cursor-hover"
)
);

});

}


/* =========================================================
   MAGNETIC BUTTON
========================================================= */

if(
window.matchMedia(
"(pointer:fine)"
).matches
){

document.querySelectorAll(
".magnetic"
).forEach(button => {

button.addEventListener(
"mousemove",
event => {

const rect =
button.getBoundingClientRect();

const x =
event.clientX -
rect.left -
rect.width / 2;

const y =
event.clientY -
rect.top -
rect.height / 2;

button.style.transform =
`translate(
${x * .08}px,
${y * .08}px
)`;

}
);


button.addEventListener(
"mouseleave",
() => {

button.style.transform =
"";

}
);

});

}


/* =========================================================
   IMAGE SYSTEM
=========================================================

FILES:

B1.jpg
B2.jpg
B3.jpg

W1.jpg
W2.jpg

P1.jpg
P2.jpg

L1.jpg
L2.jpg

M1.jpg
M2.jpg

B = Book
W = Web
P = Poster
L = Logo
M = Print

You can use B1-B100 etc.
Missing numbers are ignored.
========================================================= */

const GITHUB_API =
"https://api.github.com/repos/shakilstic/shakilstic.github.io/contents/assets/images";


const RAW =
"https://shakilstic.github.io/assets/images/";


const categories = {

bookGrid:{
prefix:"B",
section:"book"
},

webGrid:{
prefix:"W",
section:"web"
},

posterGrid:{
prefix:"P",
section:"poster"
},

logoGrid:{
prefix:"L",
section:"logo"
},

printGrid:{
prefix:"M",
section:"print"

}

};


const categoryNames = {

B:"Book Cover Design",

W:"Web Design & Develop",

P:"Social Media Poster",

L:"Logo Design",

M:"Print Media Design"

};


function createProject(
file,
prefix,
number
){

const card =
document.createElement(
"article"
);

card.className =
"project-card";


if(number > 4){

card.classList.add(
"extra"
);

}


const image =
document.createElement("img");


image.src =
file.download_url ||
RAW +
encodeURIComponent(
file.name
);


image.alt =
`${categoryNames[prefix]} ${number}`;


image.loading =
number <= 4
? "eager"
: "lazy";


image.decoding =
"async";


const index =
document.createElement("span");

index.className =
"project-number";

index.textContent =
String(number)
.padStart(2,"0");


const label =
document.createElement("span");

label.className =
"project-label";

label.textContent =
categoryNames[prefix];


card.append(
image,
index,
label
);


return card;

}


function renderCategory(
gridId,
prefix,
files
){

const grid =
document.getElementById(
gridId
);

if(!grid)
return;


const section =
grid.closest(".category");


const found =
files

.map(file => {

const base =
file.name.replace(
/\.[^.]+$/,
""
);

const match =
base.match(
new RegExp(
`^${prefix}(\\d+)$`,
"i"
)
);

if(!match)
return null;


return {

file:file,

number:
Number(match[1])

};

})

.filter(Boolean)

.sort(
(a,b) =>
a.number -
b.number
);


grid.innerHTML = "";


/* No image = hide entire section */

if(!found.length){

section.style.display =
"none";

return;

}


section.style.display =
"";


found.forEach(item => {

grid.appendChild(
createProject(
item.file,
prefix.toUpperCase(),
item.number
)
);

});


setupShowMore(grid);

}


async function loadImages(){

try{

const response =
await fetch(
GITHUB_API,
{
headers:{
"Accept":
"application/vnd.github+json"
}
}
);


if(!response.ok){

throw new Error(
"GitHub API unavailable"
);

}


const files =
await response.json();


const images =
files.filter(
file =>
file.type === "file" &&
/\.(jpg|jpeg|png|webp|gif)$/i
.test(file.name)
);


Object.entries(
categories
).forEach(
([gridId,data]) => {

renderCategory(
gridId,
data.prefix,
images
);

}
);


}catch(error){

console.error(error);

document
.querySelectorAll(
".category"
)
.forEach(section => {

section.style.display =
"none";

});

}

}


function setupShowMore(grid){

const button =
document.querySelector(
`.show-more[data-target="${grid.id}"]`
);


if(!button)
return;


const extras =
grid.querySelectorAll(
".project-card.extra"
);


if(!extras.length){

button.hidden =
true;

return;

}


button.hidden =
false;


button.addEventListener(
"click",
() => {

const expanded =
grid.classList.toggle(
"expanded"
);


const text =
button.childNodes[0];


const icon =
button.querySelector(
"span"
);


if(expanded){

button.childNodes[0]
.textContent =
"SHOW LESS ";

icon.textContent =
"−";


extras.forEach(
(card,index) => {

card.animate(
[
{
opacity:0,
transform:
"translateY(30px) scale(.97)"
},
{
opacity:1,
transform:
"translateY(0) scale(1)"
}
],
{
duration:450,
delay:index * 60,
easing:
"cubic-bezier(.2,.8,.2,1)",
fill:"both"
}
);

}
);


}else{

button.childNodes[0]
.textContent =
"SHOW MORE ";

icon.textContent =
"+";


grid.closest(
".category"
)?.scrollIntoView(
{
behavior:"smooth",
block:"start"
}
);

}

}
);

}


loadImages();


/* =========================================================
   BLOGGER CONTENT
========================================================= */

const BLOGGER =
"https://createwithshakil.blogspot.com";


let callbackNumber = 0;


function loadBlogger(
label
){

return new Promise(resolve => {

const callback =
"portfolioCallback" +
(++callbackNumber);


const script =
document.createElement(
"script"
);


const timeout =
setTimeout(
() => {

cleanup();

resolve([]);

},
7000
);


function cleanup(){

clearTimeout(timeout);

script.remove();

try{

delete window[callback];

}catch{

window[callback] =
undefined;

}

}


window[callback] =
data => {

const entries =
data?.feed?.entry || [];

cleanup();

resolve(entries);

};


script.src =
`${BLOGGER}/feeds/posts/default/-/${encodeURIComponent(label)}?alt=json-in-script&max-results=50&callback=${callback}`;


script.async =
true;


script.onerror =
() => {

cleanup();

resolve([]);

};


document.head.appendChild(
script
);

});

}


/* =========================================================
   HTML CLEANING
========================================================= */

function cleanText(
html
){

const div =
document.createElement(
"div"
);

div.innerHTML =
html || "";


return (
div.textContent ||
""
)
.replace(
/\s+/g,
" "
)
.trim();

}


function postURL(entry){

return (
entry.link || []
).find(
link =>
link.rel === "alternate"
)?.href || "#";

}


/* =========================================================
   CLIENT FEEDBACK
========================================================= */

async function loadTestimonials(){

const section =
document.getElementById(
"clients"
);

const grid =
document.getElementById(
"testimonialGrid"
);

const button =
document.getElementById(
"testimonialMore"
);


if(!section || !grid)
return;


const entries =
await loadBlogger(
"Client Feedback"
);


if(!entries.length){

section.style.display =
"none";

return;

}


entries.forEach(
(entry,index) => {

const card =
document.createElement(
"article"
);

card.className =
"testimonial-card";


if(index >= 3){

card.classList.add(
"extra"
);

card.style.display =
"none";

}


const review =
cleanText(
entry.content?.$t ||
entry.summary?.$t ||
""
);


let stars =
"★★★★★";


const starMatch =
review.match(
/^[★☆]{3,5}/
);


if(starMatch){

stars =
starMatch[0];

}


const cleanReview =
review.replace(
/^[★☆]+\s*/,
""
);


card.innerHTML = `

<div class="quote">
“
</div>

<div class="stars">
${stars}
</div>

<p class="review collapsed">
${escapeHTML(
cleanReview
)}
</p>

<button
class="review-toggle"
type="button">

FULL REVIEW

</button>

<div class="client-name">
${escapeHTML(
entry.title?.$t ||
"Client"
)}
</div>

<a
class="review-toggle"
href="${escapeAttribute(
postURL(entry)
)}"
target="_blank"
rel="noopener">

VIEW ORIGINAL ↗

</a>

`;


const reviewElement =
card.querySelector(
".review"
);


const reviewButton =
card.querySelector(
".review-toggle"
);


if(cleanReview.length < 240){

reviewButton.style.display =
"none";

}


reviewButton.addEventListener(
"click",
() => {

const open =
reviewElement.classList.toggle(
"collapsed"
);

reviewButton.textContent =
open
? "FULL REVIEW"
: "SHOW LESS";

}
);


grid.appendChild(
card
);

}
);


const extras =
grid.querySelectorAll(
".extra"
);


if(extras.length){

button.hidden =
false;


button.addEventListener(
"click",
() => {

const open =
grid.classList.toggle(
"expanded"
);


extras.forEach(
card => {

card.style.display =
open
? "block"
: "none";

}
);


button.childNodes[0]
.textContent =
open
? "SHOW LESS "
: "SHOW MORE ";


button.querySelector(
"span"
).textContent =
open
? "−"
: "+";

}
);

}

}


loadTestimonials();


/* =========================================================
   CURRENTLY WORKING ON
========================================================= */

async function loadWorking(){

const section =
document.getElementById(
"currently-working"
);

const track =
document.getElementById(
"workingTrack"
);


if(!section || !track)
return;


const entries =
await loadBlogger(
"Currently Working"
);


if(!entries.length){

section.style.display =
"none";

return;

}


const logos =
[];


entries.forEach(
entry => {

const html =
entry.content?.$t ||
"";


const imageMatch =
html.match(
/<img[^>]+src=["']([^"']+)["']/i
);


if(!imageMatch)
return;


const image =
imageMatch[1];


const linkMatch =
html.match(
/https?:\/\/[^\s"'<>]+/i
);


const link =
linkMatch
? linkMatch[0]
: postURL(entry);


const item =
document.createElement(
"a"
);


item.className =
"logo-item";

item.href =
link;

item.target =
"_blank";

item.rel =
"noopener noreferrer";


const img =
document.createElement(
"img"
);

img.src =
image;

img.alt =
entry.title?.$t ||
"Currently working";


img.loading =
"lazy";


item.appendChild(
img
);

logos.push(item);

track.appendChild(
item
);

}
);


if(!logos.length){

section.style.display =
"none";

return;

}


/* Duplicate for seamless marquee */

logos.forEach(
item => {

const clone =
item.cloneNode(true);

clone.setAttribute(
"aria-hidden",
"true"
);

track.appendChild(
clone
);

}
);

}


loadWorking();


/* =========================================================
   SOCIAL LINKS
========================================================= */

async function loadSocials(){

const section =
document.querySelector(
".social-section"
);

const grid =
document.getElementById(
"socialGrid"
);


if(!section || !grid)
return;


const entries =
await loadBlogger(
"Currently Working"
);


const urls =
new Set();


entries.forEach(
entry => {

const html =
entry.content?.$t ||
"";


const matches =
html.match(
/https?:\/\/[^\s"'<>]+/gi
) || [];


matches.forEach(
url => {

url =
url.replace(
/[),.;]+$/,
""
);

urls.add(
url
);

}
);

}
);


if(!urls.size){

section.style.display =
"none";

return;

}


[...urls].forEach(
url => {

const item =
document.createElement(
"a"
);


item.className =
"social-link";

item.href =
url;

item.target =
"_blank";

item.rel =
"noopener noreferrer";


let name =
"PROFILE";


try{

const host =
new URL(url).hostname
.replace(
"www.",
""
);

name =
host
.split(".")[0]
.toUpperCase();

}catch{

}


const short =
name
.slice(0,2);


item.innerHTML = `

<span class="social-icon">
${escapeHTML(short)}
</span>

<span class="social-name">
${escapeHTML(name)}
</span>

<span class="social-arrow">
↗
</span>

`;


grid.appendChild(
item
);

}
);

}


loadSocials();


/* =========================================================
   NAVIGATION
========================================================= */

const navLinks =
document.querySelectorAll(
".desktop-nav a"
);


const sections =
document.querySelectorAll(
"main section[id]"
);


if(
"IntersectionObserver"
in window
){

const navObserver =
new IntersectionObserver(
entries => {

entries.forEach(
entry => {

if(!entry.isIntersecting)
return;


navLinks.forEach(
link => {

link.classList.toggle(
"active",
link.getAttribute(
"href"
) ===
"#" +
entry.target.id
);

}
);

}
);

},
{
rootMargin:
"-35% 0px -55% 0px"
}
);


sections.forEach(
section =>
navObserver.observe(section)
);

}


/* =========================================================
   CONTACT FORM
========================================================= */

/*
IMPORTANT:

After deploying your Google Apps Script,
paste the Web App URL below.

Example:

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/XXXXXXXX/exec";

*/

const GOOGLE_SCRIPT_URL = "";


const form =
document.getElementById(
"contactForm"
);

const status =
document.getElementById(
"formStatus"
);


form?.addEventListener(
"submit",
async event => {

event.preventDefault();


const honeypot =
form.querySelector(
'[name="website"]'
);


if(
honeypot &&
honeypot.value.trim()
){

return;

}


if(!form.checkValidity()){

form.reportValidity();

return;

}


if(!GOOGLE_SCRIPT_URL){

status.textContent =
"Form is ready. Add your Google Apps Script Web App URL in script.js.";

status.className =
"form-status error";

return;

}


const button =
form.querySelector(
".submit-button"
);


const original =
button.innerHTML;


button.disabled =
true;

button.textContent =
"SENDING...";


try{

await fetch(
GOOGLE_SCRIPT_URL,
{
method:"POST",
body:new FormData(form),
mode:"no-cors"
}
);


form.reset();


status.textContent =
"Thank you. Your enquiry has been sent.";

status.className =
"form-status success";


}catch(error){

console.error(error);

status.textContent =
"Something went wrong. Please try again.";

status.className =
"form-status error";


}finally{

button.disabled =
false;

button.innerHTML =
original;

}

}
);


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value){

return String(
value || ""
).replace(
/[&<>"']/g,
char => ({

"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#039;"

}[char])
);

}


function escapeAttribute(value){

return escapeHTML(
value
).replace(
/`/g,
"&#096;"
);

}

});
