/* Global Variables */
let type = "";
baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
apiKey = "&units=imperial&appid=b749e9d4ae56ba23908e47b4f29f2332";

// get button element
let button = document.querySelector("#generate");

/*
 *add click event to the button element
 *  to start GET, POST routes
 */
button.addEventListener("click", () => {
	// take input values
	let zip = document.getElementById("zip").value;
	let city = document.getElementById("city").value;
	type = city !== "" ? `q=${city}` : `zip=${zip}`;

	// take textarea value
	let textarea = document.getElementById("feelings").value;

	getOpenWeather()
		.then((data) =>
			postProject("/postProject", {
				temp: data.main.temp,
				maxtemp: data.main.temp_max,
				mintemp: data.main.temp_min,
				date: newDate,
				user: textarea,
				name: data.sys.country,
			})
		)
		.then((data) => getProject("/getProject"))
		.then((data) => appendData(data))
		.then((data) => (document.querySelector("#entryHolder").style.display = "flex"));
});

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

//GET OpenWeather api
const getOpenWeather = async () => {
	const response = await fetch(baseUrl + type + apiKey);
	try {
		const data = await response.json();
		if (data.cod === "404") {
			errorMsg();
		} else {
			return data;
		}
	} catch (e) {
		console.log("error", e);
	}
};

//GET request to get projectData
const getProject = async (url) => {
	const response = await fetch(url);
	try {
		const projectData = await response.json();
		return projectData;
	} catch (e) {
		console.log("error", e);
	}
};

//POST request to update projectData
const postProject = async (url = "", data = {}) => {
	const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	// try {
	// 	const projectData = await response.json();
	// 	console.log(projectData);
	// 	return projectData;
	// } catch (e) {
	// 	console.log("error", e);
	// }
};

// append results in the page
let appendData = (data = {}) => {
	document.querySelector(".entry").scrollIntoView({ behavior: "smooth" });
	document.getElementById("name").innerHTML = data.name;
	document.getElementById("fer").innerHTML = (data.temp).toFixed(1) + `<span>F</span>`;
	document.getElementById("cel").innerHTML = ((data.temp - 32) * 0.5556).toFixed(1) + `<span>C</span>`;
	document.getElementById("maxfer").innerHTML = data.maxtemp.toFixed(1) + `<span>F</span>`;
	document.getElementById("maxcel").innerHTML = ((data.maxtemp - 32) * 0.5556).toFixed(1) + `<span>C</span>`;
	document.getElementById("minfer").innerHTML = data.mintemp.toFixed(1) + `<span>F</span>`;
	document.getElementById("mincel").innerHTML = ((data.mintemp - 32) * 0.5556).toFixed(1) + `<span>C</span>`;
	document.getElementById("date").innerHTML = data.date;
	document.getElementById("content").innerHTML = data.user;
};

// error msg if input was wrong
function errorMsg() {
	document.querySelector(".error").style.display = "block";
	document.querySelector(".back").style.display = "block";
}

//Event to hide error msg
let eButton = document.getElementById("again");
eButton.addEventListener("click", () => {
	location.reload(true);
});
