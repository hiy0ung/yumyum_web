import FullCalendar from "@fullcalendar/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../Styles/calendar.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface DailyStat {
  orderDay: string;
  dailySales: number;
}

interface MonthStat {
  orderDateYear: number;
  orderDateMonth: number;
  monthSales: number;
}

interface YearStat {
  orderDateYear: number;
  yearSales: number;
}

interface StoreTime {
  openingTime: string;
  closingTime: string;
}

export default function DailyStats() {
  const isoDate = (date: Date) => {
    return date.toISOString().slice(0, 19);
  };

  const fullCalendarRef = useRef<FullCalendar>(null);

  const date = new Date();
  const [orderDate, setOrderDate] = useState<String>(isoDate(date));
  const [responseDailyData, setResponseDailyData] = useState<DailyStat[]>([]);
  const [responseMonthData, setResponseMonthData] = useState<MonthStat[]>([]);
  const [responseYearData, setResponseYearData] = useState<YearStat[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(date);
  const [storeTime, setStoreTime] = useState<StoreTime[]>([]);

  const handleClickMonth = (value: Date) => {
    setSelectedDate(value);
    const newDate = new Date(value);
    newDate.setDate(newDate.getDate() + 1);
    setOrderDate(isoDate(newDate));
  };

  useEffect(() => {
    setFullCalendarDate(orderDate);
  }, [orderDate]);

  const setFullCalendarDate = (date: String) => {
    const timeIndex = date.indexOf("T");
    const convertDate = date.slice(0, timeIndex);

    const calendarApi = fullCalendarRef?.current?.getApi();
    calendarApi?.gotoDate(convertDate);
  };

  const fetchDay = async () => {
    try {
      const responseDay = await axios.get(
        `http://localhost:4041/api/v1/stats/daily/${orderDate}`,
        { params: { orderDate: orderDate } }
      );
      const responseMonth = await axios.get(
        `http://localhost:4041/api/v1/stats/month/${orderDate}`,
        { params: { orderDate: orderDate } }
      );
      const responseYear = await axios.get(
        `http://localhost:4041/api/v1/stats/year/${orderDate}`,
        { params: { orderDate: orderDate } }
      );

      // const responseStroeTime = await axios.get(
      //   `http://localhost:4041/api/v1/stores`
      // )

      setResponseDailyData(responseDay.data.data);
      setResponseMonthData(responseMonth.data.data);
      setResponseYearData(responseYear.data.data);
      // setStoreTime(responseStroeTime.data.data);
      // console.log(responseStroeTime.data.data);
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다.", error);
    }
  };
  useEffect(() => {
    fetchDay();
  }, [orderDate]);

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("ko-KR").format(number);
  };

  const events = responseDailyData.map((item: DailyStat) => ({
    title: `매출 : ${formatNumber(item.dailySales)} 원`,
    date: item.orderDay,
  }));

  return (
    <>
      <h1>Daily Stats</h1>
      <Calendar
        calendarType="gregory"
        view="year"
        prev2Label={null}
        next2Label={null}
        maxDate={new Date()}
        onClickMonth={(value) => handleClickMonth(value)}
        tileClassName={({ date, view }) => {
          if (
            view === "year" &&
            selectedDate &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()
          ) {
            return "selected";
          }
          return null;
        }}
      />
      <div className="App">
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={events}
          ref={fullCalendarRef}
        />
        {responseMonthData && responseMonthData.length > 0 ? (
          <h2>월 매출: {formatNumber(responseMonthData[0].monthSales)}원</h2>
        ) : (
          <h2>월 매출: 0원</h2>
        )}

        {responseYearData && responseYearData.length > 0 ? (
          <h2>연 매출: {formatNumber(responseYearData[0].yearSales)}원</h2>
        ) : (
          <h2>연 매출: 0원</h2>
        )}
      </div>
    </>
  );
}
