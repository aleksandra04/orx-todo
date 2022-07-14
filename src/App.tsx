import "./App.css";
import { getUsers } from "./dataApis";
import { Users } from "./Users";

export const App = () => {
  const getUsersData = async () => {
    const [users] = await Promise.all([getUsers()]);

    return users;
  };

  return (
    <div className="App">
      <Users getUsers={getUsersData} />
    </div>
  );
};
