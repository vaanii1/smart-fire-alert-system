import { Link } from "react-router-dom";
import PageNav from "../components/mainNav/PageNav";
import styles from "./Homepage.module.css";
import Footer from "../components/Footer/Footer";

function Homepage() {
  return (
    <>
      <PageNav />
      <main className={styles.main}>
        <div className={styles.introDiv}>
          <h1>Fire Alarm System — Real-time IoT protection for communities</h1>
          <p>
            We connect households via compact IoT devices, stream sensor data to
            our cloud, and provide instant alerts, mapping and analytics to
            reduce response time and protect lives. This is a demo interface for
            the Liberia pilot.
          </p>
          <div className="links">
            <Link to="/login">Open Map</Link>
            <Link to="/analysis">View Analysis</Link>
          </div>
        </div>
        {/* intro 2  */}
        <div className={styles.introDiv2}>
          <h1>Benefits of Using Our System</h1>
          <div className={styles.subDivsContainer}>
            <div>
              <img src="/img/alert.jpeg" alt="alert" />
              <h2>Real-time alerts</h2>
              <p>
                Instant push & SMS alerts to households and authorities when
                threshold sensors trigger.
              </p>
            </div>
            <div>
              <img src="/img/edge-cloud.jpg" alt="alert" />
              <h2>Edge + Cloud</h2>
              <p>
                Local device edge processing with secure cloud aggregation for
                analytics and visualization.
              </p>
            </div>
            <div>
              <img src="/img/community-network.jpg" alt="alert" />
              <h2>Community network</h2>
              <p>
                Local device edge processing with secure cloud aggregation for
                analytics and visualization.
              </p>
            </div>
          </div>
        </div>
        {/* intro 3  */}
        <div className={styles.introDiv2}>
          <h1>Why this project matters</h1>
          <p>
            In Liberia and similar regions, fast notification and localized
            situational awareness save lives. Our devices are low-cost,
            solar-ready, and designed for local maintenance — that means
            scalable protection across neighborhoods.
          </p>
          <div className={styles.subDivsContainer}>
            <div>
              <h2>Deploy</h2>
              <p>
                Plug-in device, connect to Wi-Fi/LoRa gateway or local mesh,
                register using the household ID.
              </p>
            </div>
            <div>
              <h2>Monitor</h2>
              <p>
                Temperature, smoke density, and battery telemetry stream
                continuously to dashboards and the mobile app.
              </p>
            </div>
            <div>
              <h2>Act</h2>
              <p>
                Automated alerts guide first responders and neighbors; system
                logs enable after-action analysis.
              </p>
            </div>
          </div>
        </div>
        {/* intro 4  */}
        <div className={styles.introDiv2}>
          <h1>Impact & deployment plan</h1>
          <p>
            Pilot neighborhoods in Monrovia → expand to counties. Our target:
            5,000 households in year-1 with priority on schools and markets.
          </p>
          <div className={styles.subDivsContainer}>
            <div>
              <h2>Community training</h2>
              <p>Local maintenance teams and awareness workshops.</p>
            </div>
            <div>
              <h2>Partnerships</h2>
              <p>Coordination with fire services and local government.</p>
            </div>
            <div>
              <h2>Sustainability</h2>
              <p>Solar-capable units and low-cost replacement parts.</p>
            </div>
          </div>
        </div>
        {/* intro 5  */}
        <div className={styles.introDiv2}>
          <h1>Ready to demo</h1>
          <p>
            Open the live demo map to see sample deployed households and jump to
            analytics to inspect monthly trends and lives impacted.
          </p>
          <Link to="/login">Open Map</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Homepage;
