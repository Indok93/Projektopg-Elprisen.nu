

const buttonSettings = document.getElementById('settingsWheel');
// console.log(buttonSettings);

// Event listeners
buttonSettings.addEventListener('click', () => {
    window.location.href = './indstillinger.html';
});

const apiEndpoint = "https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json";

fetch(apiEndpoint)
.then((response) => {
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
    }

    return response.json();
})
.then((data) => {
    // console.log(data);
    getCurrentHourData(data);
    getCurrentPriceData(data);
})
.catch((error) => {
    console.error(error);
});

function getCurrentHourData(data) {
    // console.log(data);
    // Get the current hour
    const currentHour = new Date().getHours();

    // Find the data for the current hour
    const currentHourData = data[currentHour];
    // console.log(currentHourData);

    const timeStart = new Date(currentHourData.time_start);
    const timeEnd = new Date(currentHourData.time_end);
    /* console.log(timeStart);
    console.log(timeEnd); */

    const startTime = new Date(timeStart);
    const endTime = new Date(timeEnd);

    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();
    const endHour = endTime.getHours();
    const endMinute = endTime.getMinutes();
    // console.log(`${startHour}:${startMinute}${startMinute} - ${endHour}:${endMinute}${endMinute}`);
    

    // Target element for displaying the data
    const targetElementId = document.getElementById('tidNu');

    // Make a variable for the data
    let timeHtml = "";
    timeHtml = `${startHour}:${startMinute}${startMinute} - ${endHour}:${endMinute}${endMinute}`;

    // display
    targetElementId.innerHTML = timeHtml;

    overview(data);
}

function getCurrentPriceData(data) {
    // console.log(data);
    const currentHour = new Date().getHours();

    const currentHourData = data[currentHour];
    // console.log(currentHourData);
    // console.log(currentHourData.DKK_per_kWh);

    // Target element for displaying the data
    const targetElementId = document.getElementById('ElprisNu');

    // Make a variable for the data
    let priceNowDkk = "";
    priceNowDkk = `${currentHourData.DKK_per_kWh} KR`;

    // console.log(priceNowDkk);
    targetElementId.innerHTML = priceNowDkk;

}

function overview(dataArray) {
    const allData = dataArray;
    // console.log(currentDataHour);
    // console.log(allData);

    const allDataDkk = allData.map(item => item.DKK_per_kWh);
    // console.log(allDataDkk);

    const lowestNumber = Math.min(...allDataDkk);
    const highestNumber = Math.max(...allDataDkk);
    
    // console.log("Lowest number:", lowestNumber);
    // console.log("Highest number:", highestNumber);


    const targetElementLowest = document.getElementById('ElPriceLow');
    const targetElementIdHighest = document.getElementById('ElPriceHigh');

    let lowestPriceHtml = "";
    let highestPriceHtml = "";
    lowestPriceHtml = `${lowestNumber} KR`;
    highestPriceHtml = `${highestNumber} KR`;

    targetElementLowest.innerHTML = lowestPriceHtml;
    targetElementIdHighest.innerHTML = highestPriceHtml;

    const currentHour = new Date().getHours(); // Get the current hour
    const hoursToExtract = 8; // Number of hours to extract, including the current hour

    const currentHourData = allData[currentHour];
    const extractedData = allData.slice(currentHour, currentHour + hoursToExtract);

    // console.log("Current Hour Data:", currentHourData);
    // console.log("Extracted Data for the Next 7 Hours:", extractedData);

    overviewList(extractedData);
}

function overviewList(extractedData) {
    // console.log(extractedData);
    
    const timeSlots = extractedData.map(item => item.time_start);
    const priceSlots = extractedData.map(item => item.DKK_per_kWh);
    // console.log(timeSlots);
    // console.log(priceSlots);

    const formattedPriceSlots = priceSlots.map((items) => items.toFixed(3));
    console.log(formattedPriceSlots);
    
    const formattedTimeSlots = timeSlots.map((timeSlots) => {
        const date = new Date (timeSlots);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}`
    })
    // console.log(formattedTimeSlots);

    const timeSlotOne = document.getElementById('slotOne');
    const timeSlotTwo = document.getElementById('slotTwo');
    const timeSlotThree = document.getElementById('slotThree');
    const timeSlotFour = document.getElementById('slotFour');
    const timeSlotFive = document.getElementById('slotFive');
    const timeSlotSix = document.getElementById('slotSix');
    const timeSlotSeven = document.getElementById('slotSeven');
    const timeSlotEight = document.getElementById('slotEight');

    let slotOneHtml = `kl. ${formattedTimeSlots[0]}`
    // console.log(slotOneHtml);
    let slotTwoHtml = `kl. ${formattedTimeSlots[1]}`
    let slotThreeHtml = `kl. ${formattedTimeSlots[2]}`
    let slotFourHtml = `kl. ${formattedTimeSlots[3]}`
    let slotFiveHtml = `kl. ${formattedTimeSlots[4]}`
    let slotSixHtml = `kl. ${formattedTimeSlots[5]}`
    let slotSevenHtml = `kl. ${formattedTimeSlots[6]}`
    let slotEightHtml = `kl. ${formattedTimeSlots[7]}`

    timeSlotOne.innerHTML = slotOneHtml;
    timeSlotTwo.innerHTML = slotTwoHtml;
    timeSlotThree.innerHTML = slotThreeHtml;
    timeSlotFour.innerHTML = slotFourHtml;
    timeSlotFive.innerHTML = slotFiveHtml;
    timeSlotSix.innerHTML = slotSixHtml;
    timeSlotSeven.innerHTML = slotSevenHtml;
    timeSlotEight.innerHTML = slotEightHtml;

    const priceSlotOne = document.getElementById('slotOnePrice');
    const priceSlotTwo = document.getElementById('slotTwoPrice');
    const priceSlotThree = document.getElementById('slotThreePrice');
    const priceSlotFour = document.getElementById('slotFourPrice');
    const priceSlotFive = document.getElementById('slotFivePrice');
    const priceSlotSix = document.getElementById('slotSixPrice');
    const priceSlotSeven = document.getElementById('slotSevenPrice');
    const priceSlotEight = document.getElementById('slotEightPrice');

    let slotOnePriceHtml = `${formattedPriceSlots[0]} kr`
    // console.log(slotOnePriceHtml);
    let slotTwoPriceHtml = `${formattedPriceSlots[1]} kr`
    let slotThreePriceHtml = `${formattedPriceSlots[2]} kr`
    let slotFourPriceHtml = `${formattedPriceSlots[3]} kr`
    let slotFivePriceHtml = `${formattedPriceSlots[4]} kr`
    let slotSixPriceHtml = `${formattedPriceSlots[5]} kr`
    let slotSevenPriceHtml = `${formattedPriceSlots[6]} kr`
    let slotEightPriceHtml = `${formattedPriceSlots[7]} kr`


    priceSlotOne.innerHTML = slotOnePriceHtml;
    priceSlotTwo.innerHTML = slotTwoPriceHtml;
    priceSlotThree.innerHTML = slotThreePriceHtml;
    priceSlotFour.innerHTML = slotFourPriceHtml;
    priceSlotFive.innerHTML = slotFivePriceHtml;
    priceSlotSix.innerHTML = slotSixPriceHtml;
    priceSlotSeven.innerHTML = slotSevenPriceHtml;
    priceSlotEight.innerHTML = slotEightPriceHtml;


}