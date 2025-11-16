import Footer from "../components/Footer/Footer";
import PageNav from "../components/mainNav/PageNav";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <>
      <PageNav />
      <main>
        <form className={styles.form}>
          <fieldset className={styles.fieldset}>
            <h2>Inquire From Us</h2>
            <p>
              Reach out for partnerships, deployments or technical questions.
            </p>
            <label htmlFor="first-name">First Name*</label>
            <input type="text" name="first-name" id="first-name" required />
            <label htmlFor="last-name">Last Name*</label>
            <input type="text" name="last-name" id="last-name" required />
            <label htmlFor="county-region">County/Region*</label>
            <input
              type="text"
              name="county-region"
              id="county-region"
              required
            />
            <label htmlFor="email">Email*</label>
            <input type="email" name="email" id="email" required />
            <label htmlFor="phone-number">Phone Number</label>
            <input
              type="text"
              name="phone-number"
              id="phone-number"
              required
            ></input>
            <h3>Preferred Contact Method</h3>
            <div>
              <input
                type="radio"
                name="contact-method"
                id="phone-method"
                value="phone-method"
              />
              <label htmlFor="phone-method">Phone</label>
            </div>
            <div>
              <input
                type="radio"
                name="contact-method"
                id="email-method"
                value="email-method"
              />
              <label htmlFor="email-method">Email</label>
            </div>

            <label htmlFor="financial-needs">How can we help you?</label>
            <textarea
              name="financial-needs"
              id="financial-needs"
              cols="30"
              rows="5"
            ></textarea>
            <button>Submit</button>
          </fieldset>
        </form>
      </main>
      {/* <FooterNav /> */}
      <Footer />
    </>
  );
}

export default Contact;
