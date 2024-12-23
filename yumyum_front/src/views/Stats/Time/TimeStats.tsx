/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as css from "./Style";
import { ResponseStatsTime, StatsTime } from "../../../types/TimeStats";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TimeStats = () => {
  const convertDate = new Date().toISOString().slice(0, 10);

  const [orderDate, setOrderDate] = useState<string>(convertDate);
  const [stats, setStats] = useState<StatsTime[]>([]);

  const fetch = async () => {
    const response = await axios.get(`http://localhost:4041/api/v1/stats/time/${orderDate}T00:00:00`);
    const statsTimes: ResponseStatsTime[] = response.data.data;
    console.log(response)
    setStats(
      statsTimes.map((statsTime) => ({
        name: statsTime.hour,
        revenue: statsTime.revenue,
      }))
    );
  };

  useEffect(() => {
    fetch();
  }, [orderDate]);
  return (
    <>
      <input
        type="date"
        onChange={(e) => setOrderDate(e.target.value)}
        value={orderDate}
        style={{
          border: "none",
        }}
      />
      <select name="년도">
        <option value="">안녕</option>
        <option value="">하세요</option>
        <option value="">그만</option>
        <option value="">웃어</option>
      </select>
      <ResponsiveContainer width={"100%"} height={500}>
        <LineChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            name="매출"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default TimeStats;
