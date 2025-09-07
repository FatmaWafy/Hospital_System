import React from "react";
import "./Overview.css";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Overview = () => {
  // Dummy data simulating DB response
  const statsData = {
    totalCases: 45,
    arrestCases: 5,
    totalDoctors: 50,
    onlineDoctors: 30,
  };

  const patientStatusData = [
    { name: "Critical", value: 5, color: "#000000" },
    { name: "Urgent", value: 15, color: "#FF0000" },
    { name: "Moderate", value: 30, color: "#FFA500" },
    { name: "Cold", value: 50, color: "#008000" },
  ];

  const genderData = [
    { name: "Males", value: 60.2, color: "#4285F4" },
    { name: "Females", value: 39.8, color: "#E91E63" },
  ];

  const responseTimeData = [
    { name: "Early Response", value: 90.2, color: "#4285F4" },
    { name: "Late Response", value: 9.8, color: "#000000" },
  ];

  const ageGroupsData = [
    { name: "25-34", value: 150 },
    { name: "<25", value: 100 },
    { name: "35-44", value: 300 },
    { name: "45-54", value: 250 },
    { name: "55-64", value: 400 },
    { name: ">65", value: 500 },
  ];

  const lineChartData = [
    {
      month: "Jan",
      internalMedicine: 20,
      cardiology: 15,
      generalSurgery: 30,
      ent: 10,
    },
    {
      month: "Feb",
      internalMedicine: 35,
      cardiology: 25,
      generalSurgery: 40,
      ent: 20,
    },
    {
      month: "Mar",
      internalMedicine: 50,
      cardiology: 30,
      generalSurgery: 25,
      ent: 15,
    },
    {
      month: "Apr",
      internalMedicine: 40,
      cardiology: 20,
      generalSurgery: 35,
      ent: 25,
    },
    {
      month: "May",
      internalMedicine: 45,
      cardiology: 40,
      generalSurgery: 50,
      ent: 35,
    },
  ];

  return (
    <div className="overview-page">
      {/* SECTION 1 */}
      <div className="overview-header">
        <h1>Overview</h1>
         
      </div>

      {/* SECTION 2 */}
      <div className="overview-welcome">
        <div className="welcome-text">
          <h2>Good morning, ER Admin</h2>
          <p>
            Here is what’s happening with ER Department from May 19 - May 25.
          </p>
        </div>
        
      </div>

      {/* SECTION 3 */}
      <div className="overview-section-three">
        <div className="left-boxes">
          <div className="stats-box">
            <span className="box-label">Total Cases</span>
            <span className="box-value">{statsData.totalCases}</span>
            <img src="/1.svg" alt="icon" className="stats-icon" />
          </div>
          <div className="stats-box">
            <span className="box-label">Arrest Cases</span>
            <span className="box-value">{statsData.arrestCases}</span>
            <img src="/2.svg" alt="icon" className="stats-icon" />
          </div>
          <div className="stats-box">
            <span className="box-label">Total Doctors</span>
            <span className="box-value">{statsData.totalDoctors}</span>
            <img src="/3.svg" alt="icon" className="stats-icon" />
          </div>
          <div className="stats-box">
            <span className="box-label">Online Doctors</span>
            <span className="box-value">{statsData.onlineDoctors}</span>
            <img src="/4.svg" alt="icon" className="stats-icon" />
          </div>
        </div>

        <div className="patient-status-box">
          <h3>Patients Status</h3>
          <div className="chart-center">
            <PieChart width={152} height={152}>
              <Pie
                data={patientStatusData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={76}
              >
                {patientStatusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="chart-description-row">
            {patientStatusData.map((item) => (
              <div className="desc-item" key={item.name}>
                <div
                  className="color-square"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{`${item.value}% ${item.name}`}</span>
              </div>
            ))}
          </div>
          <div className="view-all-wrapper">
            <button className="view-all-btn">
              View All Patients
              <img src="/arrow-right.svg" alt="Arrow Right" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4 */}
      <div className="overview-section-four">
        <div className="small-box">
          <h3>Gender Predominance</h3>
          <div className="chart-center">
            <PieChart width={152} height={152}>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={76}
              >
                {genderData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="chart-description">
            {genderData.map((item) => (
              <div className="desc-item" key={item.name}>
                <div
                  className="color-square"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{`${item.value}% ${item.name}`}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="small-box">
          <h3>Average Response Time</h3>
          <div className="chart-center">
            <PieChart width={152} height={152}>
              <Pie
                data={responseTimeData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={76}
              >
                {responseTimeData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="chart-description">
            {responseTimeData.map((item) => (
              <div className="desc-item" key={item.name}>
                <div
                  className="color-square"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{`${item.value}% ${item.name}`}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bar-box">
          <h3>Patient Age Average</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageGroupsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 500]} />
              <Tooltip />
              <Bar dataKey="value" fill="#4285F4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 5 */}
      <div className="overview-section-five">
        <h3>Specialties Calls </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 60]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="internalMedicine"
              stroke="#4285F4"
              name="Internal Medicine"
            />
            <Line
              type="monotone"
              dataKey="cardiology"
              stroke="#888888"
              name="Cardiology"
            />
            <Line
              type="monotone"
              dataKey="generalSurgery"
              stroke="#FFA500"
              name="General Surgery"
            />
            <Line type="monotone" dataKey="ent" stroke="#008000" name="ENT" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;





