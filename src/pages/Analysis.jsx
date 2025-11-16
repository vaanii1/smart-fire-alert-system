import styles from "./Analysis.module.css";

import Footer from "../components/Footer/Footer";
import PageNav from "../components/mainNav/PageNav";
import AnalysisOverview from "../components/analysis/AnalysisOverView";
import AnalysisCharts from "../components/analysis/AnalysisCharts";

function Analysis() {
  return (
    <>
      <PageNav />
      <main className={styles.main}>
        <h1>Our System Analysis</h1>
        <AnalysisOverview />
        <AnalysisCharts />
      </main>
      <Footer />
    </>
  );
}

export default Analysis;
