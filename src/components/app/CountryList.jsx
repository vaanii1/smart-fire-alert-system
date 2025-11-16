import { useHouses } from "../../contexts/HousesContext";
import Message from "../message/Message";
import Spinner from "../Spinner/Spinner";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import HouseItem from "./HouseItem";

function CountryList() {
  //data from the context
  const { houses, isLoading } = useHouses();
  //when the data is loading
  if (isLoading) return <Spinner />;
  //when there's no data
  if (!houses.length) return <Message message="Add Houses via the map." />;

  //   the countries
  //check if the country of the house is in the array. if not, add it
  const countries = houses.reduce((arr, house) => {
    if (!arr.map((el) => el.country).includes(house.country))
      return [...arr, { country: house.country, emoji: house.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
