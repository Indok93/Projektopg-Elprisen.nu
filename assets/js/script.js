
const apiEndpoint = " https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json";

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