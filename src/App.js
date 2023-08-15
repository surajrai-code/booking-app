import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [input, setInput] = useState([]);

  useEffect(() => {
    fetchAndDisplayData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/insert", { name, email, number })
      .then((response) => {
        if (response.status === 200) {
          setInput([...input, { name, email, number }]);
          setName("");
          setEmail("");
          setNumber("");
        } else {
          console.error("Error adding data");
        }
      })
      .catch((error) => {
        console.error("Error adding data", error);
      });
  };

  const deleteHandler = (index) => {
    const newInput = [...input];
    newInput.splice(index, 1);
    setInput(newInput);
  };

  const fetchAndDisplayData = () => {
    axios
      .get("http://localhost:3000/api/fetch")
      .then((response) => {
        if (response.status === 200) {
          setInput(response.data);
        } else {
          console.error("Error fetching data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  };

  return (
    <div className="container">
      <form className="main">
        <h1>BOOKING APP</h1>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="number">Phone Number:</label>
        <br />
        <input
          type="tel"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        <button type="submit" onClick={submitHandler}>
          submit
        </button>
      </form>

      <div className="data-table">
        <h2>Submitted Data</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {input.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>
                  <button onClick={() => deleteHandler(index)}>Delete</button>
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;