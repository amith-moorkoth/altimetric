import React, { useRef, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale, LineElement, PointElement } from 'chart.js';
import { saveAs } from 'file-saver';
import { Stack } from "@mui/system";

// Register the required components
Chart.register(CategoryScale, LinearScale, LineElement, PointElement);

function DashBoard() {
  const initialData = [
    { "2024-08-25": "1" },
    { "2024-08-26": "2" },
    { "2024-08-27": "4" },
    { "2024-08-28": "25" },
    { "2024-08-29": "4" },
    { "2024-08-30": "30" },
    { "2024-08-31": "31" },
  ];

  const [dates, setDates] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  const inputRef1 = useRef();
  const inputRef2 = useRef();

  useEffect(() => {
    const initialDates = [];
    const initialValues = [];

    initialData.forEach((item) => {
      const date = Object.keys(item)[0];
      const value = Number(item[date]);
      initialDates.push(date);
      initialValues.push(value);
    });

    setDates(initialDates);
    setDataPoints(initialValues);
  }, []);

  function filterData() {
    const value1 = new Date(inputRef1.current.value);
    const value2 = new Date(inputRef2.current.value);

    if (isNaN(value1.getTime()) && isNaN(value2.getTime())) {
      return; 
    }

    const filteredDates = [];
    const filteredDataPoints = [];

    initialData.forEach((item) => {
      const date = Object.keys(item)[0];
      const value = Number(item[date]);
      const currentDate = new Date(date);
      
      if (!isNaN(value1.getTime()) && !isNaN(value2.getTime())) {
        if (currentDate >= value1 && currentDate <= value2) {
          filteredDates.push(date);
          filteredDataPoints.push(value);
        }
      } else if (!isNaN(value1.getTime())) {
        if (currentDate >= value1) {
          filteredDates.push(date);
          filteredDataPoints.push(value);
        }
      } else if (!isNaN(value2.getTime())) {
        if (currentDate <= value2) {
          filteredDates.push(date);
          filteredDataPoints.push(value);
        }
      }
    });

    setDates(filteredDates);
    setDataPoints(filteredDataPoints);
  }

  function sortData() {
    const sortedData = [...dates].map((date, index) => ({
      date,
      value: dataPoints[index],
    })).sort((a, b) => a.value - b.value);

    setDates(sortedData.map(item => item.date));
    setDataPoints(sortedData.map(item => item.value));
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(initialData)], { type: "application/json" });
    saveAs(blob, "sales_data.json");
  }

  return (
    <div>
      <h2>Sales Report Chart</h2>
      <div>
        <Line
          id="myChart"
          data={{
            labels: dates,
            datasets: [
              {
                label: "Sales",
                data: dataPoints,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={400}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
      <Stack spacing={1} direction="row"><input type="date" ref={inputRef1} />
      <input type="date" ref={inputRef2} />
      <button onClick={filterData}>Filter</button>
      <button onClick={sortData}>Sort</button>
      <button onClick={exportData}>Export</button></Stack>
    </div>
  );
}

export default DashBoard;
