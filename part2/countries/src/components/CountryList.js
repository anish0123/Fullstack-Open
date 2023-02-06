
const CountryList = ({country, showDetails}) => (
    <li>
        {country.name.common}
        <button onClick={showDetails}>show</button>
    </li>
);

export default CountryList;