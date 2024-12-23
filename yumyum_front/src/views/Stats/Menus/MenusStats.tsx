/** @jsxImportSource @emotion/react */
import React, {useCallback, useEffect, useState} from "react";
import * as css from "./Styles";
import {Pie, PieChart, ResponsiveContainer, Sector} from "recharts";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Calendar from "react-calendar";
import {monthContainer} from "./Styles";

const calendarStyles = {
    ".react-calendar__tile--active": {
        backgroundColor: "blue",
        color: "white",
    },
    ".react-calendar__month-view__weekdays": {
        lineHeight: "40px",
        height: "50px"
    }
}

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
                stroke="#ccc"
                style={{
                    filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.3))", borderRadius: "10px"
                }}
                cornerRadius={10}
            />
            <text
                x={cx + (innerRadius + (outerRadius - innerRadius) / 2) * Math.cos(-RADIAN * midAngle)}
                y={cy + (innerRadius + (outerRadius - innerRadius) / 2) * Math.sin(-RADIAN * midAngle)}
                textAnchor="middle"
                fontSize={20}
                fontWeight={500}
                fill="#ffffff"
            >
                {`${payload.orderProductName}`}
            </text>
            <text
                x={cx + (innerRadius + (outerRadius - innerRadius) / 2) * Math.cos(-RADIAN * midAngle)}
                y={cy + (innerRadius + (outerRadius - innerRadius) / 2) * Math.sin(-RADIAN * midAngle) + 16}
                textAnchor="middle"
                fontSize={18}
                fontWeight={400}
                fill="#ffffff"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        </g>
    );
};

export default function MenusStats() {

    const [calendarBox, setCalendarBox] = useState({
        dayCalendar: false,
        monthCalender: false
    });
    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"));

    const [data, setData] = useState<any[]>([]);

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const onPieEnter = useCallback((_: any, index: any) => {
        setActiveIndex(index);
    }, []);

    const calendarDisplayHandler = (type: "day" | "month") => {
        setCalendarBox(prev => ({
            dayCalendar: type === "day" ? !prev.dayCalendar : false,
            monthCalender: type === "month" ? !prev.monthCalender : false,
        }));
    };


    const fetchDay = async () => {
        try {
            // API 호출 예시
            // const response = (
            //     await axios.get(`http://localhost:4041/api/v1/stats/menus/day/${selectDate}`)
            // ).data.data;
            // console.log(response)

            // 여기는 하드코딩된 데이터 예시
            const response = [
                {
                    orderProductName: "치킨버거",
                    totalQuantitySold: 150,
                    totalPrice: 225000,
                },
                {
                    orderProductName: "불고기 버거",
                    totalQuantitySold: 90,
                    totalPrice: 135000,
                },
                {
                    orderProductName: "감자튀김",
                    totalQuantitySold: 200,
                    totalPrice: 60000,
                },
                {
                    orderProductName: "콜라",
                    totalQuantitySold: 180,
                    totalPrice: 54000,
                },
                {
                    orderProductName: "인삼버거",
                    totalQuantitySold: 50,
                    totalPrice: 54000,
                },
                {
                    orderProductName: "치킨버거",
                    totalQuantitySold: 150,
                    totalPrice: 225000,
                },
                {
                    orderProductName: "불고기 버거",
                    totalQuantitySold: 90,
                    totalPrice: 135000,
                },
                {
                    orderProductName: "감자튀김",
                    totalQuantitySold: 200,
                    totalPrice: 60000,
                },
                {
                    orderProductName: "콜라",
                    totalQuantitySold: 180,
                    totalPrice: 54000,
                },
                {
                    orderProductName: "인삼버거",
                    totalQuantitySold: 50,
                    totalPrice: 54000,
                },

            ];

            const processedData = response.map((item: any, index: number) => ({
                orderProductName: item.orderProductName,
                totalQuantitySold: item.totalQuantitySold,
                totalPrice: item.totalPrice,
                fill: colors[index % colors.length],
            }));
            setData(processedData);

        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const handleDateTodayChange = () => {
        const TodayFormatted = moment().format("YYYY-MM-DD");

    }
    const handleDateDayChange = (date: any) => {
        const dayFormatted = moment(date).format('YYYY-MM-DD');
        setSelectDate(dayFormatted);
        setCalendarBox(prevState => ({
            ...prevState,
            dayCalendar: false
        }));
    };
    const handleDateMonthChange = (date: any) => {
        const monthFormatted = moment(date).format('YYYY-MM');
        setSelectDate(monthFormatted); // 날짜 업데이트
        setCalendarBox(prevState => ({
            ...prevState,
            monthCalender: false
        }));
    };
    // 날짜가 변화함에 따라 변경되는 값을 계속 봐야하나? 어차피 누를떄마다 변경될 함수를 지정하는데?
    // 딱 도착하면 한번만 실행되게 오늘 날짜만 받자 ( 오늘 날짜를 받으려면 usestate 값을 초기값에 오늘 날짜 넣기

    useEffect(() => {
        fetchDay(); // 상태가 변경된 이후 최신 값 사용
    }, [selectDate]);


    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

    return (
        <>
            <div css={css.menusStatsContainer}>
                <div css={css.menuStatsLeft}>
                    <div css={css.menuStatsLeftTopContainer}>
                        <div css={css.menuStatsLeftTopLeft}>
                            <div css={css.today}>오늘</div>
                            <div css={css.day}
                                 onClick={() => {
                                     calendarDisplayHandler("day")
                                 }}
                            >
                                <div>
                                    <div css={css.todayContainer}>
                                        <EventAvailableIcon sx={{fontSize: 26, margin: "10px 5px 0  5px",}}/>
                                        <span>일</span>
                                    </div>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                        css={calendarBox.dayCalendar ? css.dayCalendarContainerBlock : css.dayCalendarContainerNone}>
                                        <Calendar
                                            css={calendarStyles}
                                            calendarType='gregory'
                                            defaultView="month"
                                            onChange={handleDateDayChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                 onClick={() => {
                                     calendarDisplayHandler("month")
                                 }}>
                                <div>
                                    <div css={css.monthContainer}>
                                        <EventAvailableIcon sx={{fontSize: 26, margin: "10px 5px 0  5px",}}/>
                                        <span>월</span>
                                    </div>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                        css={calendarBox.monthCalender ? css.monthCalendarContainerBlock : css.monthCalendarContainerNone}>
                                        <Calendar
                                            css={calendarStyles}
                                            calendarType="gregory"
                                            view="year"
                                            defaultView="year"
                                            minDetail="year"
                                            maxDetail="year"
                                            onChange={handleDateMonthChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div css={css.calendarContainer}>
                            <div css={css.calendarDate}>
                                {selectDate}
                            </div>
                        </div>
                    </div>


                    <div css={css.chartResultLeftContainer}>
                        <ResponsiveContainer width="100%" aspect={1}>
                            <PieChart
                                style={{
                                    filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.3))",
                                    borderRadius: "10px",
                                    padding: "30px",
                                    boxSizing: "border-box",
                                }}>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={100}
                                    outerRadius={250}
                                    dataKey="totalQuantitySold"
                                    onMouseEnter={onPieEnter}
                                    stroke="none"
                                    cornerRadius={5}
                                    paddingAngle={5}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div css={css.menuStatsRightContainer}>
                    <div css={css.menuStatsRightTitle}>메뉴별 판매 현황</div>
                    <div css={css.menuStatsRightAllResult}>
                        <div>판매 갯수 : 523 개</div>
                        <div>결제 금액 : 232,000,000 원</div>
                    </div>
                    <div css={css.menuStatsRightTextContainer}>
                        <div css={css.orderProductName}>
                            <div>제품명</div>
                            {data.map((item: any, index: number) => (
                                <div key={index}>
                                    {item.orderProductName}
                                </div>
                            ))}
                        </div>

                        <div css={css.totalQuantitySold}>
                            <div>판매 개수</div>
                            {data.map((item: any, index: number) => (
                                <div key={index}>
                                    {item.totalQuantitySold}
                                </div>
                            ))}
                        </div>

                        <div css={css.totalPrice}>
                            <div>총 판매 가격</div>
                            {data.map((item: any, index: number) => (
                                <div key={index}>
                                    {item.totalPrice}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}