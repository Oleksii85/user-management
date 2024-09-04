import { User } from "../../types/userTypes";

const UserRow: React.FC<{ user: User; onClick: (user: User) => void }> = ({ user, onClick }) => {
  return (
    <tr onClick={() => onClick(user)}>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
    </tr>
  );
};

export default UserRow;
