const axios = require('axios');

// Replace with your AviationStack API access key
const apiKey = 'YOUR_API_KEY';

async function getFlightPrices(source, destination, date) {
  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: apiKey,
        dep_iata: source,
        arr_iata: destination,
        flight_date: date,
      }
    });

    const { data } = response.data;
    const flights = {};

    data.forEach(flight => {
      const { airline: { name }, flight_date, price } = flight;
      flights[name] = `₹${price}`;
    });

    return flights;
  } catch (error) {
    console.error('Error fetching flight prices:', error);
    throw error;
  }
}

// Example usage
const source = 'DEL';
const destination = 'JAI';
const date = '2023-04-15';

getFlightPrices(source, destination, date)
  .then(flights => {
    console.log(flights);
  })
  .catch(error => {
    console.error(error);
  });
