import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Fuse from "fuse.js";

//Fuzzy Search has been implemented on POI name as specified in the requirements.
//I attempted to perform fuzzy searching on Impressions, clicks and revenue,
//but the results were not very meaningful.

export default function HourlyStatsTable() {
  const [hourlyStats, setHourlyStats] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [results, setResults] = useState([]);

  let options = {
    keys: ["name"]
  };

  //Ideally, in a bigger project, I would not be making api calls from the component file.
  //I would seperate concerns and place all my api calls in functions in a seperate file
  //and then call the functions I need based on the route I need to access.
  //The only reason I did not do this is because this is a smaller project with just a few api calls.

  useEffect(() => {
    axios
      .get("https://hill-roar.glitch.me/stats/hourly/with-poi")
      .then(({ data }) => {
        setHourlyStats(data);
      });
  }, []);

  const handleChange = e => {
    setLocationName(e.target.value);
  };

  useEffect(() => {
    let fuse = new Fuse(hourlyStats, options);
    setResults(fuse.search(locationName));
  }, [locationName]);

  return (
    <div className="column is-6">
      <input
        className="input"
        type="text"
        placeholder="Fuzzy search on location names.. eg. 'Vancouver Harbour'"
        onChange={handleChange}
        value={locationName}
      />
      <table className="table is-hoverable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hour</th>
            <th>Location</th>
            <th>Revenue</th>
            <th>Clicks</th>
            <th>Impressions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Date</th>
            <th>Hour</th>
            <th>Location</th>
            <th>Revenue</th>
            <th>Clicks</th>
            <th>Impressions</th>
          </tr>
        </tfoot>
        <tbody>
          {hourlyStats.map(
            ({ date, hour, name, impressions, clicks, revenue }, index) => {
              if (results.length !== 0) {
                for (const result of results) {
                  if (name == result.name) {
                    return (
                      <tr className="is-selected" key={index}>
                        <th>{moment(date).format("DD MMM YYYY")}</th>
                        <td>{hour}</td>
                        <td>{name}</td>
                        <td>${Math.round(revenue)}</td>
                        <td>{clicks}</td>
                        <td>{impressions}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index}>
                        <th>{moment(date).format("DD MMM YYYY")}</th>
                        <td>{hour}</td>
                        <td>{name}</td>
                        <td>${Math.round(revenue)}</td>
                        <td>{clicks}</td>
                        <td>{impressions}</td>
                      </tr>
                    );
                  }
                }
              } else {
                return (
                  <tr key={index}>
                    <th>{moment(date).format("DD MMM YYYY")}</th>
                    <td>{hour}</td>
                    <td>{name}</td>
                    <td>${Math.round(revenue)}</td>
                    <td>{clicks}</td>
                    <td>{impressions}</td>
                  </tr>
                );
              }
            }
          )}
        </tbody>
      </table>
    </div>
  );
}
