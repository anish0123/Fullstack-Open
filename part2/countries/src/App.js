import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import Search from "./components/Search";
import SingleCountry from "./components/SingleCountry";
import countryService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    countryService.getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
    console.log("search", newSearch);
    const newArray = countries.filter(function (country) {
      return country.name.common
        .toLocaleLowerCase()
        .includes(newSearch.toLocaleLowerCase());
    });
    if (newArray.length > 10) {
      setFilteredCountries(newArray.slice(0, 10));
    } else if (newArray.length <= 10) {
      setFilteredCountries(newArray);
    } else if (newArray.lenght === 1) {
      setFilteredCountries(newArray);
      console.log(filteredCountries)
    }
  };

  return (
    <div>
      <Search value={newSearch} onChange={handleSearchChange} />
      {filteredCountries.length === 1 ? (
        <SingleCountry country={filteredCountries[0]} />
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <CountryList
              key={filteredCountries.indexOf(country)}
              showDetails={() => setFilteredCountries([country])}
              country={country}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
