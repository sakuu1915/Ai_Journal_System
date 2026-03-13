import { useEffect, useState } from "react";
import axios from "axios";

import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MoodDashboard({ userId }) {

  const [chartData, setChartData] = useState(null);

  useEffect(() => {

    const getStats = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/journal/mood-stats/${userId}`
        );

        const labels = res.data.map(item => item._id);
        const values = res.data.map(item => item.count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Mood Distribution",
              data: values,
              backgroundColor: [
                "#4CAF50",
                "#2196F3",
                "#FF9800",
                "#F44336",
                "#9C27B0"
              ]
            }
          ]
        });

      } catch (error) {
        console.log(error);
      }

    };

    getStats();

  }, [userId]);

  return (

    <div style={{ width: "400px", margin: "40px auto" }}>

      <h2 style={{ textAlign: "center" }}>Mood Insights</h2>

      {chartData ? <Pie data={chartData} /> : <p>No Data Yet</p>}

    </div>

  );
}