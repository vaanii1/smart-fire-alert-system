import Footer from "../components/Footer/Footer";
import PageNav from "../components/mainNav/PageNav";
import styles from "./About.module.css";

function About() {
  return (
    <>
      <PageNav />
      <main className={styles.main}>
        <div className={styles.introDiv2}>
          <h1>About Our Fire Alarm System</h1>
          <p>
            We build low-cost IoT devices and a cloud platform to dramatically
            reduce response time to home fires.
          </p>
          <div className={styles.subDivsContainer}>
            <div>
              <h2>Mission</h2>
              <p>
                Save lives through early detection, community awareness and
                effective analytics.
              </p>
            </div>
            <div>
              <h2>Vision</h2>
              <p>
                Every community protected by affordable, maintainable devices
                and trained local teams.
              </p>
            </div>
            <div>
              <h2>Values</h2>
              <p>Trust, accessibility, reliability and community ownership.</p>
            </div>
          </div>
        </div>
        {/* intro 2  */}
        <div className={styles.introDiv2}>
          <h1>What we do</h1>
          <p>
            From device design to data insights, we provide end-to-end
            solutions: device firmware, connectivity, analytics, and community
            training.
          </p>
          <div className={styles.subDivsContainer}>
            <div>
              <h2>An Alert System</h2>
              <p>
                Devices send prioritized alerts to households and responders.
              </p>
            </div>
            <div>
              <h2>Protect Homes</h2>
              <p>
                Networked awareness helps neighbors assist earlier and reduce
                damage.
              </p>
            </div>
          </div>
        </div>
        {/* intro 3  */}
        <div className={styles.introDiv2}>
          <h1>Milestones</h1>
          <p>
            Prototype → Pilot (Monrovia) → Wider rollout. We focus on
            partnerships for scaling.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default About;
