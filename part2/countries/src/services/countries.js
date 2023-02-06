 import axios from 'axios';

 const allCountriesUrl = "https://restcountries.com/v3.1/all";
 

 const getAllCountries = () => {
   const request =  axios.get(allCountriesUrl);
    return request.then((response) => response.data);
 };

 export default {getAllCountries};
