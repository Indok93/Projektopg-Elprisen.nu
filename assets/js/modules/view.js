// navbar
export function DisplayNavigationBar(data, displayElement) {
    // Target element
    const myNavBar = document.getElementById(displayElement);

    // clear html

    myNavBar.innerHTML = "";

    let myNavHtml = "";

    myNavHtml = `<nav id="navigation">
    <img src="./assets/AppImages/windows11/SmallTile.scale-100.png" alt="logo">
    <ul>
        <li><a onclick="window._viewCallbacks.overviewClick('Oversigt')">oversigt</a></li>
        <li><a onclick="window._viewCallbacks.homeClick('Home')" class="green-text">lige nu</a></li>
        <li><a onclick="window._viewCallbacks.historyClick('History')">historik</a></li>
    </ul>
    </nav>`;

    myNavBar.innerHTML = myNavHtml;

}

// content area
export function DisplayContentArea(data, displayElement) {
    const contentArea = document.getElementById(displayElement)


    let myContentAreaHtml = `
        <section id="mainContents"></section>`;

    contentArea.innerHTML += myContentAreaHtml;

}

// footer background
export function DisplayFooterArea(data, displayElement) {
    const footerArea = document.getElementById(displayElement);

    let myFooterAreaHtml = `<footer></footer>`;

    footerArea.innerHTML += myFooterAreaHtml;
}

// settings wheel (iknl modal)
export function DisplaySettingWheel(data, displayElement) {
    const mySettingWheel = document.getElementById(displayElement);

    let mySettingWheelHtml = `
    <i class="fa-solid fa-gear gearPosition" id="settingsWheel" onclick="window._viewCallbacks.settingClick('setting')"></i>
    `;
    
    mySettingWheel.innerHTML = mySettingWheelHtml;
}

// heading
export function DisplayHeading(data, displayElement) {
    const myHeading = document.getElementById(displayElement);

    
    let myHeadingHtml = `
    <h1>elprisen lige nu</h1>
    `;

    myHeading.innerHTML += myHeadingHtml;
}

// price now and time hour
export function DisplayElPrice(data, displayElement) {
    const myElPrice = document.getElementById(displayElement);
    // console.log(data.current_time);
    const currentElPrice = data.current_el_price;
    const currentTime = data.current_time;

    let myElPriceHtml = `
    <p id="ElprisNu">${currentElPrice}</p>
    <p>pr. kwh</p>`;

    myElPrice.innerHTML += `<div class="ElprisBackground">${myElPriceHtml}</div><p id="tidNu">${currentTime}</p>`;
}

// footer content
export function DisplayFooterContent(data, displayElement) {
    const myFooterContent = document.querySelector(displayElement);

    let myFooterContentHtml = `
    <p>Priserne er <span class="green-text"> ex. moms </span> og afgrifter</p>
    <p>Du vises lige nu priserne for <span class="green-text"> Øst Danmark </span></p>
    `;

    myFooterContent.innerHTML = myFooterContentHtml;
}

export function DisplayLowHighPrice(data, displayElement) {
    const myLowHighPrice = document.getElementById(displayElement);
    // console.log(data.lowest_price);
    // console.log(data.highest_price);
    const lowestNumber = data.lowest_price;
    const highestNumber = data.highest_price;

    let myLowHighPriceHtml = `
    <div class="Low-price">
        <p id="ElPriceLow">${lowestNumber}</p>
        <p class="kwh-Text">pr. kwh</p>
        <p class="bottomText">laveste pris</p>
    </div>
    <div class="High-price">
        <p id="ElPriceHigh">${highestNumber}</p>
        <p class="kwh-Text">pr. kwh</p>
        <p class="bottomText">højeste pris</p>
    </div>`;

    myLowHighPrice.innerHTML += `<div class="Price-Content">${myLowHighPriceHtml}</div>`;
}

export function DisplayPriceOverview(data, displayElement) {
    const myPriceList = document.getElementById(displayElement);
    // console.log(data.daily_List.formattedTimeSlots);
    // console.log(data.daily_List.formattedPriceSlots);
    const timeSlots = data.daily_List.formattedTimeSlots;
    const priceSlots = data.daily_List.formattedPriceSlots;

    let myPriceListHtml = `
    <div class="price-box">
        <p id="slotOne">${timeSlots[0]}</p>
        <p id="slotOnePrice">${priceSlots[0]}</p>
    </div>
    <div class="price-box">
        <p id="slotTwo">${timeSlots[1]}</p>
        <p id="slotTwoPrice">${priceSlots[1]}</p>
    </div>
    <div class="price-box">
        <p id="slotThree">${timeSlots[2]}</p>
        <p id="slotThreePrice">${priceSlots[2]}</p>
    </div>
    <div class="price-box">
        <p id="slotFour">${timeSlots[3]}</p>
        <p id="slotFourPrice">${priceSlots[3]}</p>
    </div>
    <div class="price-box">
        <p id="slotFive">${timeSlots[4]}</p>
        <p id="slotFivePrice">${priceSlots[4]}</p>
    </div>
    <div class="price-box">
        <p id="slotSix">${timeSlots[5]}</p>
        <p id="slotSixPrice">${priceSlots[5]}</p>
    </div>
    <div class="price-box">
        <p id="slotSeven">${timeSlots[6]}</p>
        <p id="slotSevenPrice">${priceSlots[6]}</p>
    </div>
    <div class="price-box">
        <p id="slotEight">${timeSlots[7]}</p>
        <p id="slotEightPrice">${priceSlots[7]}</p>
    </div>`;

    myPriceList.innerHTML += `<div class="Upcoming-prices">${myPriceListHtml}</div>`;
}

export function DisplayCalendar(data, displayElement) {
    const myCalendar = document.getElementById(displayElement);

    let myCalendarHtml = `
    <p>14-10-2023</p>
    <i class="fa-solid fa-calendar-days calendar-pos"></i>`;

    myCalendar.innerHTML += `<div class="Calendar-box">${myCalendarHtml}</div><p id="chosen-date">elpriserne d. 14-10-2023</p>`;
    
}

export function DisplayMoms(data, displayElement) {
    const myMoms = document.getElementById(displayElement);
    console.log(data);

    let myMomsHtml = `
    <p>priser inkl. moms</p>
    <div class="slideButtonOff"></div>`;

    myMoms.innerHTML += `<div class="momsBox">${myMomsHtml}</div>`;
    
}

export function DisplayLowestPriceAlarm(data, displayElement) {
    const myAlarm = document.getElementById(displayElement);
    
    let myAlarmHtml = `
    <p>laveste pris alarm</p>
    <div class="slideButtonOn"></div>`;

    myAlarm.innerHTML += `<div class="alarmBox">${myAlarmHtml}</div>`;
    
}

export function DisplayRegionSelect(data, displayElement) {
    const myRegion = document.getElementById(displayElement);

    let myRegionHtml = `
    <p>vælg region</p>
    <select name="regionPick" id="regionPick">
    <option value="#" selected style="display: none;">vælg region</option>
    <option value="#regionEast">region øst</option>
    <option value="#regionWest">region vest</option>
    </select>`;

    myRegion.innerHTML += `<div class="chooseRegion">${myRegionHtml}</div>`;
    
}


// lowest price of the day

// highest price of the day

// overview

// history

