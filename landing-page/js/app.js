/**
 * Define Global Variables
 *
 */

let i = 0;

let lorem1 =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
                Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. \
                Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. \
                Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. \
                Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. \
                Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. \
                Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. \
                Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod";

let lorem2 =
	"Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. \
                Cras eu tincidunt arcu, vitae rhoncus purus. \
                Vestibulum fermentum consectetur porttitor. \
                Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// store all sections in NodeList
function getSections() {
	return document.querySelectorAll("section");
}

//store all nav bar sections in NodeList
function navSections() {
	return document.querySelectorAll(".menu__link");
}

//style of activated nav bar section
function style_1(NS) {
	NS.style.cssText = "background: #333; color: #fff;";
}
function style_2(NS) {
	NS.style.cssText = "background: white; color: #000;";
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

//build nav by creating li then anchor with className and text inside,then append to li
function buildNav(sectionName) {
	let li = document.createElement("li");
	let span = document.createElement("span");
	span.classList.add("menu__link");
	span.textContent = sectionName;
	li.appendChild(span);
	return li;
}

//build the menu of existing sections
function buildMenu() {
	let ul = document.getElementById("navbar__list");
	let frag = document.createDocumentFragment();
	let sections = getSections();
	for (let i = 0; i < sections.length; i++) {
		let nav = buildNav(sections[i].id);
		frag.appendChild(nav);
	}
	ul.appendChild(frag);
}
buildMenu();

//build a new section
function buildSection() {
	let sections = getSections();
	let p1 = document.createElement("p");
	let p2 = document.createElement("p");
	let h2 = document.createElement("h2");
	let div = document.createElement("div");
	let sec = document.createElement("section");
	let footer = document.getElementById("page__footer");
	p1.textContent = lorem1;
	p2.textContent = lorem2;
	h2.textContent = `Section ${sections.length + 1}`;
	div.className = "landing__container";
	sec.id = `sections ${sections.length + 1}`;
	sec.setAttribute("data-nav", `Sections ${sections.length + 1}`);
	div.append(h2, p1, p2);
	sec.appendChild(div);
	footer.remove();
	document.body.append(sec, footer);
}

// highlight selected section of nav bar
function hightlight() {
	let activeSec = document.querySelector(".your-active-class");
	let navSec = navSections();
	for (const NS of navSec) {
		if (NS.textContent === activeSec.id) {
			style_1(NS);
		} else {
			style_2(NS);
		}
	}
}

// Add class 'active' to section when near top of viewport
let sec1 = document.getElementById("section1");
function addClassActive() {
	let sections = getSections();
	let secHeight = sections[0].clientHeight;
	let sec1Top = Math.floor(sec1.getBoundingClientRect().top);
	/*
	 *600 is the height of one section,
	 *200 is the height before sec where you want to change the class status
	 */
	let numOfSec = Math.floor(Math.abs(sec1Top - secHeight / 3) / secHeight);
	for (let i = 0, n = sections.length; i < n; i++) {
		if (i === numOfSec) {
			sections[numOfSec].classList.add("your-active-class");
			hightlight();
		} else {
			sections[i].classList.remove("your-active-class");
		}
	}
}

/**
 * End Main Functions
 * Begin Events
 *
 */

//"add-section" Button event listner
let button = document.getElementById("add__sec");
button.addEventListener("click", () => {
	let ul = document.getElementById("navbar__list");
	buildSection();
	let sections = getSections();
	let nav = buildNav(sections[sections.length - 1].id);
	ul.appendChild(nav);
});

//scroll to particular section by click sections name in nav bar
let navBar = document.querySelector("#navbar__list");
navBar.addEventListener("click", (e) => {
	document.getElementById(e.target.textContent).scrollIntoView({ behavior: "smooth", block: "start" });
});

// Set sections as active
document.addEventListener("scroll", addClassActive);
