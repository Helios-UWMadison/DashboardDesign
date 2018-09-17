/* Author: Baqar Mirza
 * This scripts handles the display of the loading screen and HTTP requests for 
 * solar energy data
 */

var QUERY_URL = "https://next.json-generator.com/api/json/get/Eyt0vhl2E";
var UPDATE_PERIOD = 5; //Update period in minutes

var loadingScreen = 1; //Load screen display

/*
 * @desc: Sets up interval for periodic HTTP requests to retrieve energy data.
 */ 
window.onload = function() {
    var updateTime = 1000 * 60 * UPDATE_PERIOD;
    ajaxRequest();
    setInterval(ajaxRequest, updateTime);
};

/*
 * @desc: Sends AJAX request to retrieve data.
 */ 
function ajaxRequest() {
    var ajax = new XMLHttpRequest(); 
    ajax.onload = updateData; 
    ajax.open("GET", QUERY_URL, true); 
    ajax.send();
}

/*
 * @desc: Uses results from AJAX request to update the metrics
 * displayed on the dashboard. Hides loading screen after first
 * data retrieval on start-up.
 */ 
function updateData() {
    var data = JSON.parse(this.responseText);
    
    /*
    updateMetric("energyMetric", data.energy);
    updateMetric("moneyMetric", data.money);
    updateMetric("percentageMetric", data.energyPercentage);
    updateMetric("gallonsMetric", data.waterMetric);
    updateMetric("iphonesMetric", data.iphonesCharged);
    updateMetric("emissionsMetric", data.emissionsSaved);
    updateMetric("showersMetric", data.showersProvided);
    */

    if (loadingScreen) {
        hideLoadingScreen();
        loadingScreen = 0;
    }
}

/*
 * @param - metricName: String representing the id attribute of the
 * HTML element which contains the metric to be updated.
 * @param - value: String representing the new value of the metric to be
 * updated.
 * @desc: Updates the given metric to the given value.
 */
function updateMetric(metricName, value) {
    var metric = document.getElementById(metricName);
    metric.innerText = value;
}

/*
 * @desc: Hides loading screen.
 */ 
function hideLoadingScreen() {
    //Fade content in
    document.getElementById("loadingScreen").style.opacity = 0;
    document.getElementById("content").style.opacity = 1;
}