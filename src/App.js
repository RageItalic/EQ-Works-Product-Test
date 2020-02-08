import React, { useState, useEffect } from "react";
import "./App.css";
import moment from "moment";
import DailyEvents from "./components/DailyEvents";
import DailyStats from "./components/DailyStats";
import HourlyStatsTable from "./components/HourlyStatsTable";
import MapboxGLMap from "./components/MapboxGLMap";

function App() {
  return (
    <>
      <section className="hero is-info is-fullheight" id="topHero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">EQ Works Project</h1>
            <h2 className="subtitle">Parth Patel</h2>
            <br />
            <nav class="level">
              <div class="level-item has-text-centered">
                <a href="#backend">
                  <p class="heading" style={{ color: "white" }}>
                    Server side
                  </p>
                  <p class="title">Rate Limiting</p>
                </a>
              </div>
              <div class="level-item has-text-centered">
                <a href="#charts">
                  <p class="heading" style={{ color: "white" }}>
                    Client Side
                  </p>
                  <p class="title">Charts</p>
                </a>
              </div>
              <div class="level-item has-text-centered">
                <a href="#dataTable">
                  <p class="heading" style={{ color: "white" }}>
                    Client Side
                  </p>
                  <p class="title">Data Table</p>
                </a>
              </div>
              <div class="level-item has-text-centered">
                <a href="#map">
                  <p class="heading" style={{ color: "white" }}>
                    Client Side
                  </p>
                  <p class="title">Map</p>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </section>
      <div className="container">
        <section className="section" id="charts">
          <div class="container has-text-centered">
            <h1 class="title">
              Client Side Chart Visualisation{" "}
              <a href="#topHero">
                <i class="fas fa-long-arrow-alt-up"></i>
              </a>
            </h1>
            <p class="subtitle">
              Using <strong>Chart.js</strong>!
            </p>
          </div>
          <br />
          <div className="columns">
            <div className="column is-half">
              <DailyEvents />
            </div>
            <div className="column">
              <DailyStats />
            </div>
          </div>
        </section>
        <hr />
        <section className="section" id="dataTable">
          <div class="container has-text-centered">
            <h1 class="title">
              Client Side Data Table{" "}
              <a href="#topHero">
                <i class="fas fa-long-arrow-alt-up"></i>
              </a>
            </h1>
            <p class="subtitle">
              Using <strong>Fuse.js</strong> for fuzzy search!
            </p>
          </div>
          <br />
          <div className="columns is-centered">
            <HourlyStatsTable />
          </div>
        </section>
        <hr />
        <section className="section" id="map">
          <div class="container has-text-centered">
            <h1 class="title">
              Client Side Map{" "}
              <a href="#topHero">
                <i class="fas fa-long-arrow-alt-up"></i>
              </a>
            </h1>
            <p class="subtitle">
              Using <strong>Mapbox</strong>!
            </p>
          </div>
          <br />
          <MapboxGLMap />
        </section>
        <hr />
        <section className="section" id="backend">
          <div class="container has-text-centered">
            <h1 class="title">
              Server Side Rate Limiting{" "}
              <a href="#topHero">
                <i class="fas fa-long-arrow-alt-up"></i>
              </a>
            </h1>
            <p class="subtitle">
              Using <strong>Glitch</strong>!
            </p>
          </div>
          <br />
          <div
            class="glitch-embed-wrap"
            style={{ height: "420px", width: "100%" }}
          >
            <iframe
              src="https://glitch.com/embed/#!/embed/hill-roar?path=index.js&previewSize=0"
              title="hill-roar on Glitch"
              allow="geolocation; microphone; camera; midi; vr; encrypted-media"
              style={{ height: "100%", width: "100%", border: 0 }}
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
