import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from "./BackButton";
import Button from "./Button";
import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../message/Message";
import Spinner from "../Spinner/Spinner";
import { useHouses } from "../../contexts/HousesContext";
import { useNavigate } from "react-router-dom";

//convert country code to emaji
function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

//base url to get location when the form is displayed
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  //use the url position
  const [lat, lng] = useUrlPosition();
  //to create House, edit house, get isLoadingState, get current house and detect if edit button is clicked
  const {
    createHouse,
    editHouse,
    isLoading,
    currentHouse,
    isEditButtonClicked,
  } = useHouses();
  //navigate
  const navigate = useNavigate();

  //the geolocation position
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const [location, setLocation] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [alertLevel, setAlertLevel] = useState("");
  const [editAlertLevel, setEditAlertLevel] = useState("");
  const [ipAddress, setIPAddress] = useState("");
  const [editIpAddress, setEditIPAddress] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [editDate, setEditDate] = useState(new Date());
  const [report, setReport] = useState("");
  const [editReport, setEditReport] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  //set edit form fields
  useEffect(
    function () {
      setEditLocation(currentHouse.location);
      setEditAlertLevel(currentHouse.alertLevel);
      setEditIPAddress(currentHouse.ipAddress);
      setEditDate(currentHouse.date);
      setEditReport(currentHouse.report);
    },
    [
      currentHouse.location,
      currentHouse.alertLevel,
      currentHouse.ipAddress,
      currentHouse.date,
      currentHouse.report,
    ]
  );
  //fetch the data on mount
  useEffect(
    function () {
      //lat and lng
      if (!lat && !lng) return;
      async function fetchHouseData() {
        try {
          //when the data is loading
          setIsLoadingGeocoding(true);
          //the error if a city or country isn't clicked
          setGeocodingError("");
          //fetch the data
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          //the data
          const data = await res.json();
          //data to the console
          console.log(data);
          //if you don't click a country
          if (!data.countryCode)
            throw new Error("You didn't click a house location.");
          //set the location
          setLocation(data.city || data.lacality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchHouseData();
    },
    //anytime the lat and lng changes, it should get the data
    [lat, lng]
  );

  //to add a house
  async function handleSubmit(e) {
    // to prevert a hard reload
    e.preventDefault();
    //edit house
    const editedHouse = {
      location: editLocation,
      country,
      emoji,
      date: editDate,
      alertLevel: editAlertLevel,
      ipAddress: editIpAddress,
      report: editReport,
      position: { lat, lng },
    };

    //   //new house
    const newHouse = {
      location,
      country,
      emoji,
      date,
      alertLevel,
      ipAddress,
      report,
      position: { lat, lng },
    };
    //the value
    // e.nativeEvent.submitter.value === "Edit"
    if (isEditButtonClicked) {
      await editHouse(currentHouse.id, editedHouse);
    } else {
      await createHouse(newHouse);
    }

    //navigate to the app
    navigate("/app/houses");
  }

  //if the location is loading
  if (isLoadingGeocoding) return <Spinner />;
  //if there is no lat and lng
  if (!lat && !lng)
    return <Message message="Click the house location on the Map." />;
  //message for error
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.main} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <fieldset className={styles.fieldset}>
        <h2 className={styles.eHeading}>
          {isEditButtonClicked ? "Edit House" : "Add House"}
        </h2>
        {/* To Edit or Add Location*/}
        <div className={styles.row}>
          <label htmlFor="city-name">Location: </label>
          <input
            type="text"
            name="city-name"
            id="city-name"
            placeholder="City Name"
            value={isEditButtonClicked ? editLocation : location}
            onChange={
              isEditButtonClicked
                ? (e) => setEditLocation(e.target.value)
                : (e) => setLocation(e.target.value)
            }
          />
          <span className={styles.flag}>{emoji}</span>
        </div>
        {/* To Edit or Add Alert Level*/}
        <div className={styles.row}>
          <label htmlFor="alert-level">Alert Level: </label>
          <input
            type="text"
            name="alert-level"
            id="alert-level"
            placeholder="Alert Level"
            value={isEditButtonClicked ? editAlertLevel : alertLevel}
            onChange={
              isEditButtonClicked
                ? (e) => setEditAlertLevel(e.target.value)
                : (e) => setAlertLevel(e.target.value)
            }
          />
          <span className={styles.flag}>{emoji}</span>
        </div>
        {/* Device IP Address  */}
        <div className={styles.row}>
          <label htmlFor="alert-level">IP Address: </label>
          <input
            type="text"
            name="ip-address"
            id="ip-address"
            placeholder="IP Address"
            value={isEditButtonClicked ? editIpAddress : ipAddress}
            onChange={
              isEditButtonClicked
                ? (e) => setEditIPAddress(e.target.value)
                : (e) => setIPAddress(e.target.value)
            }
          />
          <span className={styles.flag}>{emoji}</span>
        </div>
        {/* To Edit or Add Alert Level*/}
        <label htmlFor="date">Date Of Registration:</label>
        <DatePicker
          id="date"
          selected={isEditButtonClicked ? editDate : date}
          onChange={
            isEditButtonClicked
              ? (ed) => setEditDate(ed)
              : (date) => setDate(date)
          }
          dateFormat="dd/MM/yyyy"
        />

        {/* To Edit or Add House Report*/}
        <label htmlFor="notes">House Report: </label>

        <textarea
          id="notes"
          value={isEditButtonClicked ? editReport : report}
          onChange={
            isEditButtonClicked
              ? (e) => setEditReport(e.target.value)
              : (e) => setReport(e.target.value)
          }
        />

        <div className={styles.controlBtnDiv}>
          {isEditButtonClicked ? (
            <Button type="primary" value="Edit">
              Edit
            </Button>
          ) : (
            <Button type="primary" value="Add">
              Add
            </Button>
          )}
          <BackButton></BackButton>
        </div>
      </fieldset>
    </form>
  );
}

export default Form;
