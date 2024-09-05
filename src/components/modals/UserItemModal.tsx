import React from "react";
import avatar from "../../images/avatar.png";
import avatar2 from "../../images/avatar2.png";
import styles from "./UserItemModal.module.scss";
import { UserItemModalProps } from "../../types/userItemModal";

const UserItemModal: React.FC<UserItemModalProps> = ({ user, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modal_container}>
          {user.id % 2 === 0 ? <img src={avatar2} alt="user avatar" /> : <img src={avatar} alt="user avatar" />}
          <div>
            <h2>{user.name}</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
        </div>
        <button className={styles.modal_button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserItemModal;
