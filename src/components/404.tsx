import error_404 from "../images/img_404.png";
import styles from "../App.module.scss";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <div className={styles.page_404}>
        <img src={error_404} alt="error_404" />
      </div>
    </>
  );
};
export default NotFoundPage;
