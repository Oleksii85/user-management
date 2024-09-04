import users_img from "../../images/employee.png";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div>
      <header className={styles.header}>
        <img src={users_img} alt="users" />
        <h1>USER MANAGMENT</h1>
      </header>
    </div>
  );
};

export default Header;
