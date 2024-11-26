/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from "react";
import * as css from "./Styles";
import axios from "axios";
import { PieChart, Pie, Sector } from "recharts";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={cx} y={cy} dy={8} 
        textAnchor="middle" 
        fontSize={25}
        fontWeight={600}
        fill={fill}>
        {payload.dailyData}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fontSize={20}
        fontWeight={500}
        fill="#1230AE"
      >{`${payload.name} 판매량[${value}개]`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#666"
      >
        {`판매 비율 ${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

export default function MenusStats() {
  const [date, setDate] = useState("2024-11-13");
  const [data, setData] = useState([]);
  const [dailyData, setDailyData] = useState(0)

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

  const fetchDay = async () => {
    const response = (
      await axios.get(`http://localhost:4041/api/v1/stats/menus/day/${date}`)
    ).data.data;

    const data = response.map((item: any, index: number) => ({
      name: item.orderProductName,
      value: item.totalQuantitySold,
      fill: colors[index % colors.length]
    }));

    let count = 0;
    const dailyData = data.map((item : any, index : number) => (
     count += item.value 
    ))

    setData(data);
    setDailyData(dailyData)
  };

  useEffect(() => {
    fetchDay();
  }, []);

  return (
    <PieChart css={css.dayBox} width={1000} height={700}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={500}
        cy={350}
        innerRadius={100}
        outerRadius={200}
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}
