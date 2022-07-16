import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [userData, setUserData] = useState([]);
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const body = await response.json();

        setUserData(body);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApi();
  }, []);

  const onChangeInputText = (text) => {
    setInputText(text);
  };

  const debounce = (func, time = 300) => {
    let interval; // closure (data hiding)
    return (...args) => {
      clearTimeout(interval);
      interval = setTimeout(() => func(...args), time);
    };
  };

  const debouncedFunc = debounce(onChangeInputText, 600);

  const displayData = () => {
    const filterData = userData.filter((user) =>
      user?.name.toLowerCase()?.includes(inputText.toLowerCase())
    );

    if (!filterData?.length) {
      return <li className="dropdown-list-item">No Data</li>;
    }
    return filterData.map((user) => {
      return (
        <li className="dropdown-list-item" key={user?.id}>
          {user?.name}
        </li>
      );
    });
  };
  return (
    <div className="App">
      <div className="searchable-input-container">
        <div className="input-container">
          <input
            placeholder="Type name"
            className="input"
            onChange={(e) => debouncedFunc(e?.target?.value)}
          />
        </div>
        {inputText && (
          <div className="dropdown">
            <ul className="dropdown-list">{displayData()}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
