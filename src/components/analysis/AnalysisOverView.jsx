import { FaPeopleRoof } from "react-icons/fa6";
import styles from "./AnalysisOverview.module.css";
import { useHouses } from "../../contexts/HousesContext";

function AnalysisOverview() {
  //the houses data
  const { houses } = useHouses();

  //houses
  const numOfHouses = houses.length;

  console.log(houses);

  //houses at low risk
  const lowRiskHouses = houses.filter(
    (house) => Number(house.alertLevel) === 1
  ).length;
  //houses at high risk
  const highRiskHouses = houses.filter(
    (house) => Number(house.alertLevel) === 2
  ).length;

  //houses with fire detected
  const fireDetectedHouses = houses.filter(
    (house) => Number(house.alertLevel) === 3
  ).length;

  return (
    <div className={styles.menuContainer}>
      <div>
        <span>
          <FaPeopleRoof className={styles.icon} />
        </span>
        <h2>Homes with Our System</h2>
        <span>{numOfHouses}</span>
      </div>
      <div>
        <span>
          <FaPeopleRoof className={styles.icon} />
        </span>
        <h2>Homes at Low Risk</h2>
        <span>{lowRiskHouses}</span>
      </div>
      <div>
        <span>
          <FaPeopleRoof className={styles.icon} />
        </span>
        <h2>Homes at High Risk</h2>
        <span>{highRiskHouses}</span>
      </div>
      <div>
        <span>
          <FaPeopleRoof className={styles.icon} />
        </span>
        <h2>Homes with Detected Fire</h2>
        <span>{fireDetectedHouses}</span>
      </div>
    </div>
  );
}

export default AnalysisOverview;
