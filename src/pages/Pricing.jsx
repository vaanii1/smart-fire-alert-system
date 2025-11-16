import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import PageNav from "../components/mainNav/PageNav";
import styles from "./Pricing.module.css";

function Pricing() {
  return (
    <>
      <PageNav />
      <main className={styles.main}>
        <div className={styles.introDiv2}>
          <h1>Our Packages</h1>
          <p>
            We have packages available for small, medium, and large homes or
            businesses.
          </p>
          <div className={styles.subDivsContainer}>
            <div>
              <h2>Standard Package</h2>
              <p>
                2 devices to monitor your home or business. Suitable for small
                homes and businesses
              </p>
              <span>$20</span>
            </div>
            <div>
              <h2>Semi-Premium Package</h2>
              <p>
                5 devices to monitor your home or business. Suitable for medium
                homes and businesses
              </p>
              <span>$50</span>
            </div>
            <div>
              <h2>Premium Package</h2>
              <p>
                10 devices to monitor your home or business. Suitable for large
                homes and businesses
              </p>
              <span>$95</span>
            </div>
          </div>
        </div>
        {/* intro 3  */}
        <div className={styles.introDiv2}>
          <h1>Exlusive Package</h1>
          <p>For more Exclusive package, we are here to meet your demands.</p>
          <Link to="/contact">Contact us</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Pricing;
