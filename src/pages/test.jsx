import React, { useState } from "react";

const DoctorTable = () => {
 

  return (
    <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "left" }}>
      <thead>
        <tr>
          <th>
            Name
            <span onClick={() => handleSort("name", nameSort, setNameSort)} style={{ cursor: "pointer", marginLeft: "8px" }}>
              ▲▼
            </span>
            {nameSort && <span> ({nameSort})</span>}
          </th>
          <th>
            Level
            <span onClick={() => handleSort("level", levelSort, setLevelSort)} style={{ cursor: "pointer", marginLeft: "8px" }}>
              ▲▼
            </span>
            {levelSort && <span> ({levelSort})</span>}
          </th>
          <th>
            Login Date
            <span onClick={() => handleSort("loginDate", dateSort, setDateSort)} style={{ cursor: "pointer", marginLeft: "8px" }}>
              ▲▼
            </span>
            {dateSort && <span> ({dateSort})</span>}
          </th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.name}</td>
            <td>{doc.level}</td>
            <td>{doc.loginDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DoctorTable;
