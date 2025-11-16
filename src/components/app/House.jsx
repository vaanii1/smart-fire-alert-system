import { useParams } from "react-router-dom";
import styles from "./House.module.css";
import { useEffect } from "react";
import { useHouses } from "../../contexts/HousesContext";
import BackButton from "./BackButton";
import Spinner from "../Spinner/Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function House() {
  // the data from the url
  const { id } = useParams();
  //get house from the context
  const { getHouse, currentHouse, isLoading } = useHouses();

  useEffect(
    function () {
      getHouse(id);
    },
    [id, getHouse]
  );

  //the current house data
  const {
    location,
    country,
    emoji,
    date,
    id: houseNumber,
    alertLevel,
    ipAddress,
    report,
  } = currentHouse;

  //
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.house}>
      <div className={styles.row}>
        <h3>House Number</h3>
        <h4>
          <span>H00{houseNumber}</span>
        </h4>
      </div>
      <div className={styles.row}>
        <h3>Location</h3>
        <h4>
          <span>{emoji}</span> {location}
        </h4>
      </div>
      <div className={styles.row}>
        <h3>Country</h3>
        <h4>{country}</h4>
      </div>
      <div className={styles.row}>
        <h3>Date Recorded</h3>
        <h4>{formatDate(date || null)}</h4>
      </div>
      <div className={styles.row}>
        <h3>Alert Level</h3>
        <p>{alertLevel}</p>
      </div>
      <div className={styles.row}>
        <h3>IP Address</h3>
        <p>{ipAddress}</p>
      </div>
      {report && (
        <div className={styles.row}>
          <h3>House Report</h3>
          <p>{report}</p>
        </div>
      )}
      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default House;
