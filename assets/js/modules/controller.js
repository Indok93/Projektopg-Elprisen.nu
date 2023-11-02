
let rawData;

export async function getCurrentDate() {
    return new Promise((resolve, reject) => {
        // Getting current date
        const currentDate = new Date();

        // Format the date as YYYY/MM-DD
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}/${month}-${day}`;
        // console.log(formattedDate);
        
        if (formattedDate) {
            resolve(formattedDate); // Resolve the Promise with the formatted date
          } else {
            reject(new Error('Error formatting date'));
          }
    });
}
/* Remember to put year, month, day in correct order when calling */
export function getCustomDate(year, month, day) {
    return new Promise((resolve, reject) => {
      const formattedYear = year.toString();
      const formattedMonth = month.toString().padStart(2, '0');
      const formattedDay = day.toString().padStart(2, '0');
  
      const formattedDate = `${formattedYear}/${formattedMonth}-${formattedDay}`;
  
      if (formattedDate) {
        resolve(formattedDate); // Resolve the Promise with the formatted date
      } else {
        reject(new Error('Error formatting date'));
      }
    });
  }

/* getElData fetches el prices according to the date input */
export function getElData(date) {
    const apiEndpoint = `https://www.elprisenligenu.dk/api/v1/prices/${date}_DK2.json`;

    return fetch(apiEndpoint)
    .then((response) => {
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
    } else {
        return response.json();
    }
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.error(error);
    });
}

export function dataConversion(data) {
    rawData = data;

    const convertedData = {
        current_el_price: getCurrentPriceData(rawData),
        current_time: getCurrentHourData(rawData),
        lowest_price: getLowestElPrice(rawData),
        highest_price: getHighestElPrice(rawData),
        daily_List: getCurrentDateData(rawData)
    }
    return convertedData;
}

function getCurrentPriceData(data) {
    // console.log(rawData);
    const currentHour = new Date().getHours();
    // console.log(currentHour);

    const currentHourData = data[currentHour];
    // console.log(currentHourData);

    const currentPrice = currentHourData.DKK_per_kWh;
    // console.log(currentPrice);

    const currentPriceDecimal = currentPrice.toFixed(3);
    // console.log(currentPriceDecimal);

    return currentPriceDecimal;
}

function getCurrentHourData(data) {
    // console.log(data);
    // Get the current hour
    const currentHour = new Date().getHours();

    // Find the data for the current hour
    const currentHourData = data[currentHour];
    // console.log(currentHourData);

    const timeStart = new Date(currentHourData.time_start);
    const timeEnd = new Date(currentHourData.time_end);
    // console.log(timeStart);
    // console.log(timeEnd);

    const startTime = new Date(timeStart);
    const endTime = new Date(timeEnd);

    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();
    const endHour = endTime.getHours();
    const endMinute = endTime.getMinutes();
    return `${startHour}:${startMinute}${startMinute} - ${endHour}:${endMinute}${endMinute}`;
}

function getLowestElPrice(data) {
    // console.log(data);
    const allData = data.map(item => item.DKK_per_kWh);
    // console.log(allData);

    const allDataDecimals = allData.map((items) => items.toFixed(3));
    // console.log(allDataDecimals);

    const lowestNumber = Math.min(...allDataDecimals);
    // console.log(lowestNumber);
    return lowestNumber;
}

function getHighestElPrice(data) {
    // console.log(data);
    const allData = data.map(item => item.DKK_per_kWh);
    // console.log(allData);

    const allDataDecimals = allData.map((items) => items.toFixed(3));
    // console.log(allDataDecimals);

    const highestNumber = Math.max(...allDataDecimals);
    // console.log(lowestNumber);
    return highestNumber;
}

function getCurrentDateData(data) {
    const currentHour = new Date().getHours();
    const hoursToExtract = 8; // Number of hours to extract, including the current hour

    const extractedData = data.slice(currentHour, currentHour + hoursToExtract);
    // console.log(extractedData);

    const timeSlots = extractedData.map(item => item.time_start);
    // console.log(timeSlots);

    const formattedTimeSlots = timeSlots.map((timeSlots) => {
        const date = new Date (timeSlots);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        // console.log(`${formattedHours}:${formattedMinutes}`);
        return `${formattedHours}:${formattedMinutes}`;
    })

    const priceSlots = extractedData.map(item => item.DKK_per_kWh);
    // console.log(priceSlots);
    const formattedPriceSlots = priceSlots.map((items) => items.toFixed(3));
    // console.log(formattedPriceSlots);

    return {
        formattedTimeSlots,
        formattedPriceSlots
    }
}