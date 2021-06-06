/* Global Variables */
const key = "0b683d514dc6782a3878eeb495a071d5"
/*Create a new date instance dynamically with JS*/
var d = new Date();
var currentDate = d.getMonth() + 1 + '-' + d.getDate() + '-' + d.getFullYear();
/*Get the data when click the button*/
document.getElementById("generate").addEventListener('click', processing);

async function processing() {
    /* Get the values from the input */
    const feeling = document.getElementById("feelings").value;
    const zipCode = document.getElementById("zip").value;

    const fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}&units=metric`
    try {
        /* Alert if the zip feild is empty */
        if (!zipCode) alert("Please Enter zip code");
        else {
            /*Get from API */
            getInformation(fullURL)
                /* Post data to server */
                .then(function (data = {}) {
                    postinformation('/saveData',
                        {
                            date: currentDate,
                            temp: data.main.temp,
                            feelings: feeling
                        })
                        /* Edit the html */
                        .then(editHtml());
                });
        }
    }
    catch (error) {
        console.log(`Error: ${error}`)
    }
}
/* Fetch Information from API */
const getInformation = async (fullURL) => {
    try {
        /* Fetch data from API */
        const response = await fetch(fullURL);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(`error: ${error}`)
    }
}
/* Post information to server*/
const postinformation = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log(`error: ${error}`);
    }
}
/*Edit the html */
const editHtml = async () => {
    /*Get all data from server */
    const request = await fetch('/getData');
    const projectData = await request.json();
    /* Custom data to html */
    const clock = `<i class="fa fa-clock-o" aria-hidden="true"></i> ${projectData.date}`;
    const Temprature = `<i class="fa fa-thermometer-empty" aria-hidden="true"></i> ${projectData.temp}`
    const feel = `<i class="fa fa-child" aria-hidden="true"></i> ${projectData.feelings}`;
    /* Add the Information to html */
    document.getElementById('date').innerHTML = clock;
    document.getElementById('temp').innerHTML = Temprature;
    document.getElementById('content').innerHTML = feel;
}




