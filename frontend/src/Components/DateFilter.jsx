import React, { useState } from "react";
import "./DateFilter.css";

function DateFilter({ onFilter, label = "Date" }) {
  const [filterType, setFilterType] = useState("day");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let params = {};

    if (filterType === "day" && date) {
      params.start = date;
      params.end = date;
    } else if (filterType === "month" && month && year) {
      const lastDay = new Date(year, month, 0).getDate();
      params.start = `${year}-${month}-01`;
      params.end = `${year}-${month}-${lastDay}`;
    } else if (filterType === "year" && year) {
      params.start = `${year}-01-01`;
      params.end = `${year}-12-31`;
    } else if (filterType === "range" && rangeStart && rangeEnd) {
      params.start = rangeStart;
      params.end = rangeEnd;
    }

    onFilter(params);
  };

  return (
    <form onSubmit={handleSubmit} className="date-filter-form">
      <label className="df-label">{label} Filter By:</label>
      <select
        className="df-select"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        aria-label={`${label} filter type`}
      >
        <option value="day">Day</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="range">Custom Range</option>
      </select>

      {filterType === "day" && (
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="df-input"
          required
          aria-label={`${label} day`}
        />
      )}
      {filterType === "month" && (
        <input
          type="month"
          value={year && month ? `${year}-${month}` : ""}
          onChange={(e) => {
            const [y, m] = e.target.value.split("-");
            setYear(y);
            setMonth(m);
          }}
          className="df-input"
          required
          aria-label={`${label} month`}
        />
      )}
      {filterType === "year" && (
        <input
          type="number"
          min="2000"
          max={new Date().getFullYear()}
          placeholder="YYYY"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="df-input"
          required
          aria-label={`${label} year`}
        />
      )}
      {filterType === "range" && (
        <>
          <input
            type="date"
            value={rangeStart}
            onChange={(e) => setRangeStart(e.target.value)}
            className="df-input"
            required
            aria-label={`${label} range start`}
          />
          <span className="df-range-separator">to</span>
          <input
            type="date"
            value={rangeEnd}
            onChange={(e) => setRangeEnd(e.target.value)}
            className="df-input"
            required
            aria-label={`${label} range end`}
          />
        </>
      )}
      <button type="submit" className="df-button">
        Filter
      </button>
    </form>
  );
}

export default DateFilter;
