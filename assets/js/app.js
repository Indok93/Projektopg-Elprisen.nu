import { getCurrentDate, getElData, dataConversion, getCustomDate } from "./modules/controller.js";
import { DisplayNavigationBar, DisplayContentArea, DisplayFooterArea, DisplaySettingWheel, DisplayHeading, DisplayElPrice, DisplayFooterContent, DisplayLowHighPrice, DisplayPriceOverview, DisplayCalendar, DisplayMoms, DisplayLowestPriceAlarm, DisplayRegionSelect } from "./modules/view.js";

let elData;
let LData;

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
        LData = allData;
        // console.log(getCustomDate(2023, 10, 14));

        // Display Navigation Menu
        DisplayNavigationBar(allData, "myApp");
        // Display Content Area
        DisplayContentArea(allData, "myApp");
        // Display Footer Area
        DisplayFooterArea(allData, "myApp");
        // settings wheel (iknl modal)
        DisplaySettingWheel(allData, "mainContents");
        // heading
        DisplayHeading(allData, "mainContents");
        // price now and time hour
        DisplayElPrice(allData, "mainContents");
        // footer text
        DisplayFooterContent(allData, "footer");
    })
    .catch((error) => {
        console.error("Error getting date:", error);
    })
    
}



/* Callbacks*/
window._viewCallbacks = { overviewClick, historyClick, homeClick, settingClick };

/* homeClick */
function homeClick() {
    initApp();
}

/* Oversigt */
function overviewClick() {
    DisplayNavigationBar(LData, "myApp");
    DisplayContentArea(LData, "myApp");
    DisplayFooterArea(LData, "myApp");
    DisplayFooterContent(LData, "footer");
    DisplaySettingWheel(LData, "mainContents");
    DisplayHeading(LData, "mainContents");
    DisplayLowHighPrice(LData, "mainContents");
    DisplayPriceOverview(LData, "mainContents");
  }

/* Historik */
function historyClick() {
    DisplayNavigationBar(LData, "myApp");
    DisplayContentArea(LData, "myApp");
    DisplayFooterArea(LData, "myApp");
    DisplayFooterContent(LData, "footer");
    DisplaySettingWheel(LData, "mainContents");
    DisplayHeading(LData, "mainContents");
    DisplayCalendar(LData, "mainContents");
    DisplayPriceOverview(LData, "mainContents");
}
/* Settings */
function settingClick() {
    DisplayNavigationBar(LData, "myApp");
    DisplayContentArea(LData, "myApp");
    DisplayFooterArea(LData, "myApp");
    DisplayFooterContent(LData, "footer");
    DisplayHeading(LData, "mainContents");
    DisplayMoms(LData, "mainContents");
    DisplayLowestPriceAlarm(LData, "mainContents");
    DisplayRegionSelect(LData, "mainContents");
}

// Registrering af serviceworker fil
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}