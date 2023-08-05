import React, { useState } from "react";
import { toast, Slide } from "react-toastify";
import { useSelector } from "react-redux";

const HeadTail = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [submittedValues, setSubmittedValues] = useState([]);
  const { username } = useSelector((state) => state.user.userinfo);

  const handleSubmit = () => {
    if (!selectedOption) {
      toast.warn("Please select an option", {
        position: toast.POSITION.TOP_RIGHT,
        transition: Slide,
        autoClose: 1000,
      });
      return;
    }
    setSubmittedValues((prevValues) => [...prevValues, selectedOption]);
    setSelectedOption("");
  };

  const handleReset = () => {
    setSelectedOption("");
    setSubmittedValues([]);
  };

  const generatePattern = (values) => {
    const rows = [];
    let currentRow = [];
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      currentRow.push(value);
      if (values[i + 1] && value !== values[i + 1]) {
        rows.push(currentRow);
        currentRow = [];
      }
    }
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    return rows;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4>Play Head & Tail {username}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="selectOption" className="d-flex">
          Select Option:
        </label>
        <select
          className="form-control"
          id="selectOption"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select value</option>
          <option value="H">H</option>
          <option value="T">T</option>
        </select>
      </div>
      <div className="d-flex gap-3 mt-3">
        <button className="btn btn-primary mr-2" onClick={handleSubmit}>
          Submit
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div>
        {submittedValues.length > 0 && (
          <div className="d-flex gap-3 mt-3">
            {generatePattern(submittedValues).map((row, rowIndex) => (
              <div key={rowIndex} className="d-flex flex-column">
                {row.map((value, colIndex) => (
                  <span key={colIndex} className="mr-2">
                    {value}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadTail;
