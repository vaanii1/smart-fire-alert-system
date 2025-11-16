import Footer from "../components/Footer/Footer";
import PageNav from "../components/mainNav/PageNav";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <>
      <PageNav />
      <main className={styles.main}>
        <div className={styles.introDiv2}>
          <p>Page Not Found</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PageNotFound;
