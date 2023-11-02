import { getCurrentDate, getElData, dataConversion, getCustomDate } from "./modules/controller.js";
// import {  } from "./modules/view.js";

let elData;

initApp();

function initApp() {
    getCurrentDate()

    .then((date) => {
        return getElData(date);
    })
    .then((data) => {
        elData = data;
        // console.log(elData);
        const allData = dataConversion(elData);
        console.log(allData);
        // console.log(getCustomDate(2023, 10, 14));

        // Display Navigation Menu

        // Display Content

        // Display Footer
    })
    .catch((error) => {
        console.error("Error getting date:", error);
    })
    
}



/* Events */
