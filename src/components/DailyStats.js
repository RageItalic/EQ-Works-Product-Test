import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line, Radar } from "react-chartjs-2";
import moment from "moment";

export default function DailyStats() {
  const [dailyStats, setDailyStats] = useState({});
  const [showRevenue, setShowRevenue] = useState(true);
  const [showClicks, setShowClicks] = useState(false);
  const [showImpressions, setShowImpressions] = useState(false);

  //Ideally, in a bigger project, I would not be making api calls from the component file.
  //I would seperate concerns and place all my api calls in functions in a seperate file
  //and then call the functions I need based on the route I need to access.
  //The only reason I did not do this is because this is a smaller project with just a few api calls.

  useEffect(() => {
    let labels = [];
    let impressionArr = [];
    let clickArr = [];
    let revenueArr = [];
    axios.get("https://hill-roar.glitch.me/stats/daily").then(({ data }) => {
      console.log("DATATA", data);
      data.forEach(({ date, impressions, clicks, revenue }) => {
        labels.push(moment(date).format("DD MMM YYYY"));
        impressionArr.push(impressions);
        clickArr.push(clicks);
        revenueArr.push(revenue);
      });

      if (showRevenue) {
        console.log("revenue");
        setDailyStats({
          labels,
          datasets: [
            {
              label: "Revenue",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: revenueArr
            }
          ]
        });
      }
      if (showClicks) {
        console.log("clicks");
        setDailyStats({
          labels,
          datasets: [
            {
              label: "Clicks",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: clickArr
            }
          ]
        });
      }
      if (showImpressions) {
        console.log("impressions");
        setDailyStats({
          labels,
          datasets: [
            {
              label: "Impressions",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: impressionArr
            }
          ]
        });
      }
    });
  }, [showRevenue, showClicks, showImpressions]);

  return (
    <div>
      <h2 className="subtitle">
        Daily Stats -{" "}
        <a
          onClick={() =>
            setShowRevenue(true) ||
            setShowClicks(false) ||
            setShowImpressions(false)
          }
          style={{
            fontWeight: showRevenue ? "bold" : 100
          }}
        >
          Revenue
        </a>{" "}
        <a
          onClick={() =>
            setShowRevenue(false) ||
            setShowClicks(true) ||
            setShowImpressions(false)
          }
          style={{
            fontWeight: showClicks ? "bold" : 100
          }}
        >
          Clicks
        </a>{" "}
        <a
          onClick={() =>
            setShowRevenue(false) ||
            setShowClicks(false) ||
            setShowImpressions(true)
          }
          style={{
            fontWeight: showImpressions ? "bold" : 100
          }}
        >
          Impressions
        </a>
      </h2>
      <Bar
        data={dailyStats}
        options={{
          maintainAspectRatio: true
        }}
      />
    </div>
  );
}
