import React, { useContext } from "react";
import { Context } from "../store/appContext";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const handleClick = (e) => {
    e.preventDefault();
    actions.login(email, password);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button></button>
        <button onClick={(e) => handleClick(e)}></button>
      </form>
    </div>
  );
};

export default login;
