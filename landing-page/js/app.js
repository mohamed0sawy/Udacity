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

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

//build nav by creating li then anchor with className and text inside,then append to li
function buildNav(sectionName) {
	let li = document.createElement("li");
	let anchor = document.createElement("a");
	anchor.classList.add("menu__link");
	anchor.href = `#${sectionName}`;
	anchor.textContent = sectionName;
	li.appendChild(anchor);
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

// Add class 'active' to section when near top of viewport
function addClassActive() {
	let sections = getSections();
	if (sections[i].getBoundingClientRect().bottom < window.innerHeight / 2) {
		sections[i].classList.remove("your-active-class");
		i++;
		sections[i].classList.add("your-active-class");
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

// Set sections as active
document.addEventListener("scroll", addClassActive);
