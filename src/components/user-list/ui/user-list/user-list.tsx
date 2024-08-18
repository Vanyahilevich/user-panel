import React from "react";
import { User } from "../../../../api";
import "./list.css";
type UserListProps = {
  users: User[];
  loading: boolean;
  error: string | null;
};
const UserList: React.FC<UserListProps> = ({ users, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (users.length === 0) return <p>Users not found</p>;

  return (
    <ul className="user-list">
      {users.map((user) => (
        <ListItem key={user.id} id={user.id} name={user.name} age={user.age} />
      ))}
    </ul>
  );
};

const ListItem: React.FC<User> = React.memo(({ id, name, age }) => {
  return (
    <li>
      {name}, {age}
    </li>
  );
});

export default UserList;
