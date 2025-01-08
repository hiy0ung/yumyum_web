/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import * as css from "./Style";
import {
  Calender,
  QuantityStatsTime,
  ResponseQuantityStatsTime,
  ResponseRevenueStatsTime,
  RevenueStatsTime,
} from "../../../types/TimeStats";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
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
  Label,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";
import { useCookies } from "react-cookie";
import Calendar from "react-calendar";
import "../../../assets/src/Calendar.css";
import moment from "moment";

export default function TimeStats() {
  const convertDate = new Date().toISOString().slice(0, 10);

  const [calendarBox, setCalendarBox] = useState<Calender>({ calendar: false });
  const [orderDate, setOrderDate] = useState<string>(convertDate);
  const [revenueStats, setRevenueStats] = useState<RevenueStatsTime[]>([]);
  const [quantityStats, setQuantityStats] = useState<QuantityStatsTime[]>([]);
  const [cookies] = useCookies(["token"]);

  const token = cookies.token;
  const calendarRef = useRef<HTMLDivElement>(null);

  const fetchChart1 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4041/api/v1/stats/time/revenue/${orderDate}T00:00:00`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const revenueStatsTimes: ResponseRevenueStatsTime[] = response.data.data;
      setRevenueStats(
        revenueStatsTimes.map((revenueStatsTime) => ({
          name: revenueStatsTime.hour,
          revenue: revenueStatsTime.revenue,
        }))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const fetchChart2 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4041/api/v1/stats/time/quantity/${orderDate}T00:00:00`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const quantityStatsTimes: ResponseQuantityStatsTime[] =
        response.data.data;
      setQuantityStats(
        quantityStatsTimes.map((quantityStatsTime) => ({
          name: quantityStatsTime.hour,
          quantity: quantityStatsTime.quantity,
        }))
      );
    } catch (e) {
      console.error(e);
    }
  };

  //* 날짜 하루씩 변경 (이전/이후)
  const changeDate = (days: number) => {
    const currentDate = new Date(orderDate);
    currentDate.setDate(currentDate.getDate() + days);
    setOrderDate(currentDate.toISOString().slice(0, 10));
  };

  //* 캘린더 열기/닫기
  const handleCalendarOpen = () => {
    setCalendarBox((prevState) => ({
      ...prevState,
      calendar: !prevState.calendar,
    }));
  };

  //* 캘린더 안 날짜 선택
  const handleDateChange = (date: any) => {
    const selectDate = new Date(date);
    const formattedDate = selectDate.toLocaleDateString("en-CA");
    setOrderDate(formattedDate);

    setCalendarBox((prevState) => ({
      ...prevState,
      calendar: false,
    }));
  };

  //* 캘린더 외부 영역 선택 시 캘린더 닫기
  const handleClickOutside = (e: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current?.contains(e.target as Node)
    ) {
      setCalendarBox({ calendar: false });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchChart1();
    fetchChart2();
  }, [orderDate]);

  

  return (
    <>
      <div css={css.container}>
        <div css={css.topContainer}>
          <div css={css.dateContainerStyle}>
            <button onClick={() => changeDate(-1)} css={css.buttonStyle}>
              ◀
            </button>
            <input
              type="text"
              onChange={(e) => setOrderDate(e.target.value)}
              value={orderDate}
              readOnly
              css={css.inputStyle}
            />
            <button
              onClick={() => changeDate(+1)}
              css={[
                css.buttonStyle,
                moment().format("YYYY-MM-DD") === orderDate &&
                  css.nextButtonBlock,
              ]}
            >
              ▶
            </button>
          </div>
          <div css={css.calendarContainer}>
            <div css={css.calendarIconStyle} onClick={handleCalendarOpen}>
              <EventAvailableIcon sx={{ fontSize: 26 }} />
            </div>
            <div
              ref={calendarRef}
              onClick={(e) => e.stopPropagation()}
              css={
                calendarBox.calendar
                  ? css.calendarContainerBlock
                  : css.calendarContainerNone
              }
            >
              <Calendar
                value={new Date(orderDate)}
                maxDate={new Date()}
                calendarType="gregory"
                defaultView="month"
                onChange={handleDateChange}
                tileClassName={({ date }) => {
                  const day = date.getDay();
                  if (day === 0) return "sunday";
                  else if (day === 6) return "saturday";
                }}
              />
            </div>
          </div>
        </div>
        {revenueStats.length && quantityStats.length > 0 ? (
          <div
            css={
              revenueStats.length || quantityStats.length > 0
                ? css.chartContainer
                : css.chartLineNone
            }
          >
            {/* chart1 - 매출 */}
            <ResponsiveContainer
              width={"50%"}
              height={500}
              style={{
                border: "none",
              }}
            >
              <LineChart data={revenueStats}>
                <CartesianGrid stroke="#d2d5ca" strokeDasharray="5 5" />
                <XAxis dataKey="name" stroke="#383b43" />
                <YAxis stroke="#383b43" />
                <Tooltip
                  content={({ payload, label }) => {
                    if (!payload || payload.length === 0) return null;
                    const formattedLabel = `${label}시`;
                    const formattedValue = `${Number(payload[0].value).toLocaleString()}원`;

                    return (
                      <div css={css.tooltipStyle}>
                        <p css={css.labelTextStyle}>{formattedLabel}</p>
                        <p css={css.valueTextStyle}>{formattedValue}</p>
                      </div>
                    );
                  }}
                />
                <Legend 
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{
                    fontWeight: "bold",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="매출"
                  stroke="#1683ffdf"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
            {/* 차트2 - 수량 */}
            <ResponsiveContainer
              width={"45%"}
              height={500}
              style={{
                border: "none",
              }}
            >
              <LineChart data={quantityStats}>
                <CartesianGrid stroke="#d2d5ca" strokeDasharray="5 5"/>
                <XAxis dataKey="name" stroke="#383b43" />
                <YAxis stroke="#383b43" />
                <Tooltip 
                    content={({ payload, label }) => {
                    if (!payload || payload.length === 0) return null;
                    const formattedLabel = `${label}시`;
                    const formattedValue = `${Number(payload[0].value).toLocaleString()}건`;
                
                    return (
                      <div css={css.tooltipStyle}>
                        <p css={css.labelTextStyle}>{formattedLabel}</p>
                        <p css={css.valueTextStyle}>{formattedValue}</p>
                      </div>
                    );
                  }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  wrapperStyle={{
                    fontWeight: "bold",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="quantity"
                  name="건수"
                  stroke="#fdbe35"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div css={css.chartDataNone}>
            해당 날짜에 데이터가 없습니다!
          </div>
        )}
      </div>
    </>
  );
}
