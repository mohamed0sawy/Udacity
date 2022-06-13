// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
//port 3000
const server = app.listen(3000, function () {
	console.log("server is listening");
});

//GET route that returns the projectData
app.get("/getProject", (req, res) => {
	res.send(projectData);
});

//POST route that updates the projectData
app.post("/postProject", (req, res) => {
	projectData = {
		temp: req.body.temp,
		maxtemp: req.body.maxtemp,
		mintemp: req.body.mintemp,
		date: req.body.date,
		user: req.body.user,
		name: req.body.name,
	};
	res.sendStatus(200);
});
