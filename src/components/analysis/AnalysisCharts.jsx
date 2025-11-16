import { useState } from "react";
import { useHouses } from "../../contexts/HousesContext";
import styles from "./AnalysisCharts.module.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

function AnalysisCharts() {
  //the houses data
  const { houses } = useHouses();
  console.log(houses);
  //select state
  const [locationSelected, setLocationSelected] = useState("All Homes");
  //unique location options
  const uniqueLocations = houses.reduce((arr, currHouse) => {
    //check if the location is among the selected options
    const findL = arr.find((l) => l.location === currHouse.location);
    // if it's not in the arr, add it
    if (!findL) {
      return arr.concat([currHouse]);
    } else {
      return arr;
    }
  }, []);
  //the unique options
  const uniqueOptions = [...new Set(uniqueLocations.map((ul) => ul.location))];

  //the selected location
  const selectedLocationHouses = houses.filter(
    (house) => house.location === locationSelected
  );

  return (
    <>
      <div className={styles.chartContainer}>
        <h2>Homes Chart</h2>
        {/* location as selected value  */}
        <div className={styles.locationsContainer}>
          <label htmlFor="location-select">View Data For:</label>
          <select
            id="location-select"
            value={locationSelected}
            onChange={(e) => setLocationSelected(e.target.value)}
          >
            <option value="All Homes">All Homes</option>
            {uniqueOptions.map((location, i) => (
              <option key={`location-${i}`} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        {/* the chart  */}
        <div className={styles.chartDiv}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={
                locationSelected === "All Homes"
                  ? houses
                  : selectedLocationHouses
              }
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {/* house numbers  */}
              <XAxis dataKey="id" tickFormatter={(id) => "H00" + id} />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* show the temperature color based on the temperature  */}
              <Bar dataKey="alertLevel" name="Alert Level Per House">
                {houses.map((house, i) => (
                  <Cell
                    key={`house-${i}`}
                    fill={
                      Number(house.alertLevel) === 3
                        ? "#780000"
                        : Number(house.alertLevel) === 2
                        ? "#e85d04"
                        : "#344e41"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default AnalysisCharts;
