import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  // State with list of all checked item
  const [checked, setChecked] = useState([]);
  const checkList = ["Kosher", "No Celery(inc celeriac)", "No Egg"];

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Select All items in checkbox
  function selectAll() {
    checkList.forEach((item) => {
      if (document.getElementById("selectAll").checked) {
        if (!document.getElementById(item).checked) {
          document.getElementById(item).checked = true;
        }
        setChecked(checkList);
      } else {
        if (document.getElementById(item).checked) {
          document.getElementById(item).checked = false;
        }
        setChecked([]);
      }
    });
  }

  // Clear All items in checkbox
  function clearAll() {
    document.getElementById("selectAll").checked = false;
    checkList.forEach((e) => {
      document.getElementById(e).checked = false;
    });
    setChecked([]);
  }

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  return (
    <div className="app">
      <div className="checkList">
        <div className="title">{`Selected Value: ${checkedItems}`}</div>
        <div className="list-container">
          <div>
            <input
              id="selectAll"
              value="Select All"
              type="checkbox"
              onClick={selectAll}
            />
            <span>Select All</span>
          </div>
          {checkList.map((item, index) => (
            <div key={index}>
              <input
                id={item}
                value={item}
                type="checkbox"
                onChange={handleCheck}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <button className="button" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
