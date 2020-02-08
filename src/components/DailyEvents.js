import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import moment from "moment";

export default function DailyEvents() {
  const [dailyEvents, setDailyEvents] = useState({});

  //Ideally, in a bigger project, I would not be making api calls from the component file.
  //I would seperate concerns and place all my api calls in functions in a seperate file
  //and then call the functions I need based on the route I need to access.
  //The only reason I did not do this is because this is a smaller project with just a few api calls.

  useEffect(() => {
    let labels = [];
    let eventArr = [];
    axios.get("https://hill-roar.glitch.me/events/daily").then(({ data }) => {
      data.forEach(({ date, events }) => {
        labels.push(moment(date).format("DD MMM YYYY"));
        eventArr.push(events);
      });
      setDailyEvents({
        labels,
        datasets: [
          {
            data: eventArr,
            label: "Daily Events",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10
          }
        ]
      });
    });
  }, []);

  return (
    <div>
      <h2 className="subtitle">Daily Events</h2>
      <Line data={dailyEvents} />
    </div>
  );
}
