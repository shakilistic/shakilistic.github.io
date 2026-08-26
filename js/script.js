document.addEventListener("DOMContentLoaded", () => {

"use strict";


/* =====================================================
BASIC
===================================================== */

const root =
document.documentElement;


const year =
document.getElementById("year");


if(year){

year.textContent =
new Date().getFullYear();

}



/* =====================================================
THEME
===================================================== */

const themeToggle =
document.getElementById("themeToggle");


const themeIcon =
document.getElementById("themeIcon");


const savedTheme =
localStorage.getItem(
"shakilstic-theme"
);


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
root.getAttribute(
"data-theme"
);


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



/* =====================================================
MOBILE MENU
===================================================== */

const menuToggle =
document.getElementById(
"menuToggle"
);


const mobileMenu =
document.getElementById(
"mobileMenu"
);


menuToggle?.addEventListener(
"click",
() => {

const open =
mobileMenu.classList.toggle(
"open"
);


menuToggle.textContent =
open
? "×"
: "☰";

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



/* =====================================================
SCROLL REVEAL
===================================================== */

const revealElements =
document.querySelectorAll(
".reveal"
);


if(
"IntersectionObserver"
in window
){

const observer =
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
"0px 0px -40px 0px"
}
);


revealElements.forEach(
element =>
observer.observe(element)
);

}else{

revealElements.forEach(
element =>
element.classList.add(
"visible"
)
);

}



/* =====================================================
CUSTOM CURSOR
===================================================== */

const cursorDot =
document.querySelector(
".cursor-dot"
);


const cursorRing =
document.querySelector(
".cursor-ring"
);


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



/* =====================================================
MAGNETIC BUTTON
===================================================== */

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



/* =====================================================
PORTFOLIO IMAGE SYSTEM

B = Book
W = Web
P = Poster
L = Logo
M = Print

Examples:

B1.jpg
B2.jpg
B3.jpg

W1.jpg

P1.jpg

L1.jpg

M1.jpg

Missing numbers stay blank.
Empty category hides automatically.
===================================================== */

const GITHUB_API =
"https://api.github.com/repos/shakilstic/shakilstic.github.io/contents/assets/images";


const RAW =
"https://shakilstic.github.io/assets/images/";


const categories = {

bookGrid:{
prefix:"B"
},

webGrid:{
prefix:"W"
},

posterGrid:{
prefix:"P"
},

logoGrid:{
prefix:"L"
},

printGrid:{
prefix:"M"
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
document.createElement(
"img"
);


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
document.createElement(
"span"
);


index.className =
"project-number";


index.textContent =
String(number)
.padStart(2,"0");


const label =
document.createElement(
"span"
);


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


button.childNodes[0]
.textContent =
expanded
? "SHOW LESS "
: "SHOW MORE ";


button.querySelector(
"span"
).textContent =
expanded
? "−"
: "+";

}
);

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
grid.closest(
".category"
);


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


grid.innerHTML =
"";


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
prefix,
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
GITHUB_API
);


if(!response.ok){

throw new Error(
"GitHub image request failed"
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

console.error(
"Image loader:",
error
);

}

}


loadImages();



/* =====================================================
BLOGGER CONTENT
===================================================== */

const BLOGGER =
"https://createwithshakil.blogspot.com";


let callbackNumber =
0;



function loadBlogger(label){

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



/* =====================================================
TEXT CLEANING
===================================================== */

function cleanText(html){

const div =
document.createElement(
"div"
);


div.innerHTML =
html || "";


return (
div.textContent || ""
)
.replace(
/\s+/g,
" "
)
.trim();

}



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



/* =====================================================
CLIENT TESTIMONIALS

IMPORTANT:
No VIEW ORIGINAL button.
No external Blogger link.
===================================================== */

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
★★★★★
</div>

<p class="review collapsed">
${escapeHTML(cleanReview)}
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

const collapsed =
reviewElement.classList.toggle(
"collapsed"
);


reviewButton.textContent =
collapsed
? "FULL REVIEW"
: "SHOW LESS";

}
);


grid.appendChild(
card
);

});


const extras =
grid.querySelectorAll(
".testimonial-card.extra"
);


if(extras.length){

button.hidden =
false;


button.addEventListener(
"click",
() => {

const expanded =
grid.classList.toggle(
"expanded"
);


extras.forEach(
card => {

card.style.display =
expanded
? "block"
: "none";

}
);


button.childNodes[0]
.textContent =
expanded
? "SHOW LESS "
: "SHOW MORE ";


button.querySelector(
"span"
).textContent =
expanded
? "−"
: "+";

}
);

}

}


loadTestimonials();



/* =====================================================
CURRENTLY WORKING

NO MARQUEE.
NO AUTO SLIDE.

Only:
← logo →
===================================================== */

let workingProfiles =
[];

let workingIndex =
0;


const workingDisplay =
document.getElementById(
"workingDisplay"
);


const workingPrev =
document.getElementById(
"workingPrev"
);


const workingNext =
document.getElementById(
"workingNext"
);


const workingCounter =
document.getElementById(
"workingCounter"
);



function showWorking(index){

if(!workingDisplay)
return;


if(!workingProfiles.length){

workingDisplay.innerHTML = `

<div class="working-empty">

CURRENTLY UPDATING

</div>

`;

workingCounter.textContent =
"01 / 01";

return;

}


workingIndex =
(index +
workingProfiles.length)
%
workingProfiles.length;


const item =
workingProfiles[
workingIndex
];


workingDisplay.innerHTML =
"";


const card =
document.createElement(
"a"
);


card.className =
"working-card";


card.href =
"#";


card.target =
"_blank";


card.rel =
"noopener";


const image =
document.createElement(
"img"
);


image.src =
item.image;


image.alt =
item.name;


card.appendChild(
image
);


workingDisplay.appendChild(
card
);


workingCounter.textContent =
`${String(
workingIndex + 1
).padStart(2,"0")} / ${String(
workingProfiles.length
).padStart(2,"0")}`;

}



async function loadWorking(){

const section =
document.getElementById(
"currently-working"
);


if(!section)
return;


const entries =
await loadBlogger(
"Currently Working"
);


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


workingProfiles.push({

image:
imageMatch[1],

name:
entry.title?.$t ||
"Client"

});

});


/*
If Blogger currently has no valid logos,
we keep the section but show updating state.
*/

showWorking(0);

}



workingPrev?.addEventListener(
"click",
() => {

showWorking(
workingIndex - 1
);

}
);


workingNext?.addEventListener(
"click",
() => {

showWorking(
workingIndex + 1
);

}
);


loadWorking();



/* =====================================================
NAVIGATION ACTIVE STATE
===================================================== */

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
navObserver.observe(
section
)
);

}



/* =====================================================
GO TO TOP
===================================================== */

const goTop =
document.getElementById(
"goTop"
);


goTop?.addEventListener(
"click",
() => {

window.scrollTo({

top:0,

behavior:"smooth"

});

}
);



/* =====================================================
CONTACT FORM
===================================================== */

const GOOGLE_SCRIPT_URL =
"";


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
"Contact form is ready. Google Sheet connection will be added next.";


status.className =
"form-status error";


return;

}


const submitButton =
form.querySelector(
".submit-button"
);


const original =
submitButton.innerHTML;


submitButton.disabled =
true;

submitButton.textContent =
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


submitButton.disabled =
false;

submitButton.innerHTML =
original;


}

}
);

});
