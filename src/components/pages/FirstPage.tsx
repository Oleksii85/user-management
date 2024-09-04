import { Link } from "react-router-dom";
import users_img from "../../images/employee.png";
import Footer from "../layout/Footer";
import styles from "./FirstPage.module.scss";
import React from "react";

const FirstPage: React.FC = () => {
  return (
    <div className={styles.first}>
      <header className={styles.header}>
        <h1 className={styles.title}>USER MANAGMENT</h1>
      </header>
      <main className={styles.main}>
        <img src={users_img} alt="users" />
        <h2 className={styles.enter_text}>
          download the user management table <br /> ↓↓↓
        </h2>
        <Link to="/users" className={styles.link}>
          open table
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default FirstPage;
