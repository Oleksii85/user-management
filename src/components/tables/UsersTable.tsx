import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { selectFilteredUsers } from "../../store/selectors";
import { fetchUsers } from "../../store/userSlice";
import { User } from "../../types/userTypes";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import UserItem from "../modals/UserItemModal";
import Filters from "../forms/Filters";
import UserRow from "./UserRow";
import styles from "./UsersTable.module.scss";

const UsersTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.users.status);
  const error = useAppSelector(state => state.users.error);
  const filteredUsers = useAppSelector(selectFilteredUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Filters />
        <div className={styles.table}>
          {status === "loading" && <p> Loading... </p>}
          {status === "failed" && <p> Error: {error} </p>}
          {status === "resolved" && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => <UserRow key={user.id} user={user} onClick={handleUserClick} />)
                ) : (
                  <tr>
                    <td className={styles.no_found} colSpan={4}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        {selectedUser && <UserItem user={selectedUser} onClose={handleCloseModal} />}
      </main>
      <Footer />
    </div>
  );
};

export default UsersTable;
