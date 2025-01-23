/** @jsxImportSource @emotion/react */
import React, {useCallback, useEffect, useRef, useState} from "react";
import * as css from "./Styles";
import {Pie, PieChart, ResponsiveContainer, Sector} from "recharts";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Calendar from "react-calendar";
import axios from "axios";
import {useCookies} from "react-cookie";
import {
    MenuStatsFetchDataGroupByName,
    MenuStatsFetchDataColor,
    MenuStatsFetchData,
    MenuStatsFetchDataTotal
} from "../../../types/Stats";

const calendarStyles = {
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
                {`${payload.groupName}`}
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
    const [cookies] = useCookies(["token"])
    const token = cookies.token;

    const [calendarBox, setCalendarBox] = useState({
        dayCalendar: false,
        monthCalender: false
    });

    const [selectToday, setSelectToday] = useState<string>(moment().format("YYYY-MM-DD"));
    const [selectDay, setSelectDay] = useState<string>(moment().format("YYYY-MM-DD"));
    const [selectMonth, setSelectMonth] = useState<string>(moment().format("YYYY-MM-DD"));
    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"));

    const [data, setData] = useState<MenuStatsFetchDataGroupByName[]>([]);

    const [totalData, setTotalData] = useState({
        totalQuantitySold: 0,
        totalPriceSold: 0
    });

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const onPieEnter = useCallback((_: any, index: any) => {
        setActiveIndex(index);
    }, []);

    const calendarRef1 = useRef<HTMLDivElement>(null);
    const calendarRef2 = useRef<HTMLDivElement>(null);

    const calendarDisplayHandler = (type: "day" | "month") => {
        setCalendarBox(prev => ({
            dayCalendar: type === "day" ? !prev.dayCalendar : false,
            monthCalender: type === "month" ? !prev.monthCalender : false,
        }));
    };

    const dataController = (response: any) => {
        const responseData: MenuStatsFetchData[] = response.data?.data;

        const dataColorFill: MenuStatsFetchDataColor[] = responseData.map((item: any, index: number) => ({
            name: item.menuName,
            quantity: item.quantity,
            price: item.sumTotalPrice,
            fill: colors[index % colors.length],
        }));

        const dataTotalSold: MenuStatsFetchDataTotal = responseData.reduce((acc, item) => {
            acc.totalQuantitySold += item.quantity;
            acc.totalPriceSold += item.sumTotalPrice;
            return acc;
        }, {totalQuantitySold: 0, totalPriceSold: 0});

        const dataGroupByName: MenuStatsFetchDataGroupByName[] =
            dataColorFill.reduce((acc: MenuStatsFetchDataGroupByName[], reduceItem: MenuStatsFetchDataColor, index: number) => {
                const groupNameFind = acc.find((findItem: any) => findItem.groupName === reduceItem.name);
                if (groupNameFind) {
                    groupNameFind.sumQuantity += reduceItem.quantity;
                    groupNameFind.sumPrice += reduceItem.price;
                } else {
                    acc.push({
                        groupName: reduceItem.name,
                        sumQuantity: reduceItem.quantity,
                        sumPrice: reduceItem.price,
                        fill: reduceItem.fill
                    })
                }
                return acc;
            }, [])
        setData(dataGroupByName);
        setTotalData(dataTotalSold);
    }


    const fetchToday = async () => {
        try {
            const response = await axios.get(`http://localhost:4041/api/v1/stats/menus/today`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (response.data.data.length > 0) {
                dataController(response);
                setSelectToday(moment().format("YYYY-MM-DD"));
                setSelectDate(moment().format("YYYY-MM-DD"));

            } else {
                setData([]);
                console.log("오늘 데이터가 없습니다.");
            }
        } catch (error) {
            console.error("data :", error);
        }
    };
    const fetchDay = async () => {
        try {
            const response = await axios.get(`http://localhost:4041/api/v1/stats/menus/day/${selectDay}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(selectDay);
            if (response.data.data.length > 0) {
                dataController(response);
            } else {
                setData([]);
                console.log(`${selectDay} 해당 일의 데이터가 없습니다.`);
            }
        } catch
            (error) {
            console.error("data :", error);
        }
    };
    const fetchMonth = async () => {
        try {
            const response = await axios.get(`http://localhost:4041/api/v1/stats/menus/month/${selectMonth}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            if (response.data.data.length > 0) {
                dataController(response);
            } else {
                setData([]);
                console.log(`${selectMonth} 해당 달의 데이터가 없습니다.`);
            }
        } catch (error) {
            console.error("fetch error:", error);
        }
    };
    useEffect(() => {
        fetchToday()
    }, [selectToday]);
    useEffect(() => {
        fetchDay();
    }, [selectDay]);
    useEffect(() => {
        fetchMonth();
    }, [selectMonth]);



    const handleDateDayChange = (date: any) => {
        setSelectDay(moment(date).format('YYYY-MM-DD'));
        setSelectDate(moment(date).format('YYYY-MM-DD'));

        setCalendarBox(prevState => ({
            ...prevState,
            dayCalendar: false
        }));
        fetchDay();
    };
    const handleDateMonthChange = (date: any) => {
        setSelectMonth(moment(date).format('YYYY-MM-DD'));
        setSelectDate(moment(date).format('YYYY-MM-DD'));

        setCalendarBox(prevState => ({
            ...prevState,
            monthCalender: false
        }));
        fetchMonth();
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);;
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleClickOutside = (e: MouseEvent) => {
        if (
            calendarRef1.current && !calendarRef1.current.contains(e.target as Node)
        ) {
            setCalendarBox(prevState => ({
                ...prevState,
                dayCalendar: false,
            }));
        }

        if (
            calendarRef2.current && !calendarRef2.current.contains(e.target as Node)
        ) {
            setCalendarBox(prevState => ({
                ...prevState,
                monthCalender: false,
            }));
        }
    };

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

    return (
        <>
            <div css={css.menusStatsContainer}>
                <div css={css.menuStatsLeft}>
                    <div css={css.menuStatsLeftTopContainer}>
                        <div css={css.menuStatsLeftTopLeft}>
                            <div onClick={() => {
                                fetchToday()
                            }}
                                 css={css.today}>오늘
                            </div>
                            <div css={css.day}
                                 onClick={() => {
                                     calendarDisplayHandler("day")
                                 }}
                            >
                                <div>
                                    <div css={css.todayContainer}>
                                        <EventAvailableIcon sx={{fontSize: 26, marginRight : "2px"}}/>
                                        <span>일</span>
                                    </div>
                                    <div
                                        ref={calendarRef1}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                        css={calendarBox.dayCalendar ? css.dayCalendarContainerBlock : css.dayCalendarContainerNone}>
                                        <Calendar
                                            maxDate={new Date()}
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
                                        <EventAvailableIcon sx={{fontSize: 26, marginRight : "2px"}}/>
                                        <span>월</span>
                                    </div>
                                    <div
                                        ref={calendarRef2}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                        css={calendarBox.monthCalender ? css.monthCalendarContainerBlock : css.monthCalendarContainerNone}>
                                        <Calendar
                                            maxDate={new Date()}
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
                        {
                            data.length > 0 ?
                            (
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
                                            dataKey="sumQuantity"
                                            onMouseEnter={onPieEnter}
                                            stroke="none"
                                            cornerRadius={15}
                                            paddingAngle={2}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                    <div css={css.chartDataNone}>
                                        해당 날짜에 데이터가 없습니다!
                                    </div>
                                )
                        }

                    </div>
                </div>
                <div>
                </div>
                <div css={css.menuStatsRightContainer}>
                    <div css={css.menuStatsRightTitle}>메뉴별 판매 현황</div>
                    <div css={css.menuStatsRightAllResult}>
                        <div>판매 개수 : {totalData.totalQuantitySold}</div>
                        <div>결제 금액 : {totalData.totalPriceSold.toLocaleString("ko-KR")}원</div>
                    </div>
                    <div css={css.menuStatsRightTextContainer}>
                        <div css={css.orderProductName}>
                            <div>제품명</div>
                            {data.map((item: any, index: number) => (
                                <div key={index}>
                                    {item.groupName}
                                </div>
                            ))}
                        </div>

                        <div css={css.totalQuantitySold}>
                            <div>판매 개수</div>
                            {data.map((item: any, index: number) => (
                                <div key={index}>
                                    {item.sumQuantity}
                                </div>
                            ))}
                        </div>

                        <div css={css.totalPrice}>
                            <div>총 판매 가격</div>
                            {data.map((item: any, index: number) => (
                                <div key={index}>
                                    {item.sumPrice.toLocaleString("ko-KR")}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}