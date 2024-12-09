/** @jsxImportSource @emotion/react */
import React, {useCallback, useEffect, useState} from "react";
import * as css from "./Styles";
import axios from "axios";
import {PieChart, Pie, Sector} from "recharts";
import Calendar from 'react-calendar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import "react-calendar/dist/Calendar.css";
import moment from "moment";

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
        totalQuantitySold,
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
                cornerRadius={5}
            />
            <text
                x={cx + (innerRadius + (outerRadius - innerRadius) / 2) * Math.cos(-RADIAN * midAngle)}
                y={cy + (innerRadius + (outerRadius - innerRadius) / 2) * Math.sin(-RADIAN * midAngle)}
                textAnchor="middle"
                fontSize={14}
                fontWeight={500}
                fill="#ffffff"
            >
                {`${payload.orderProductName}`}
            </text>
            <text
                x={cx + (innerRadius + (outerRadius - innerRadius) / 2) * Math.cos(-RADIAN * midAngle)}
                y={cy + (innerRadius + (outerRadius - innerRadius) / 2) * Math.sin(-RADIAN * midAngle) + 16}
                textAnchor="middle"
                fontSize={12}
                fontWeight={400}
                fill="#ffffff"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        </g>
    );
};

interface TabMenuStats {
    status: "day" | "week" | "month";
}

const today = moment().format("YYYY-MM-DD");
export default function MenusStats() {
    const [calendarBox, setCalendarBox] = useState<boolean>(false); // 캘린더 아이콘을 클릭시 보여주기/가리기
    const [selectDate, setSelectDate] = useState<string>(today); // 캘린더의 해당 구간을 누르면 현재 날짜 받기
    const [tabMenuStats, setTabMenuStats] = useState<TabMenuStats>({status: "day"}); // 일, 주, 월에 따른 탭 메뉴 선택

    const [data, setData] = useState<any[]>([]); // response 로 데이터를 받아오면 저장시킬 곳

    const [activeIndex, setActiveIndex] = useState<number>(0); // 파이차이
    const onPieEnter = useCallback((_: any, index: any) => {
        setActiveIndex(index);
    }, []);

    // 탭메뉴 상태값 받는 함수
    const statusHandler = (value: TabMenuStats["status"]) => {
        setTabMenuStats(prev => ({prev, status: value}));
    }

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

    // 캘린더 보여/안보여 상태값 변경
    const calendarDisplayHandler = () => {
        setCalendarBox(prev => !prev);
    }

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
                    totalQuantitySold: 2,
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

    const tabMenuHandler = (value: TabMenuStats["status"]) => {
        setTabMenuStats({status: value});
    }
    // 캘린더 해당 구간 누르면 현재 날짜 받기
    const handleDateChange = (date: any) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setSelectDate(formattedDate);
        setCalendarBox(false);
    };
    // 날짜가 변화함에 따라 변경되는 값을 계속 봐야하나? 어차피 누를떄마다 변경될 함수를 지정하는데?
    // 딱 도착하면 한번만 실행되게 오늘 날짜만 받자 ( 오늘 날짜를 받으려면 usestate 값을 초기값에 오늘 날짜 넣기

    useEffect(() => {
        fetchDay();
    }, [selectDate]);

    return (
        <>
            <div css={css.menusStatsTitle}>메뉴별 통계</div>
            <div css={css.menusStatsContainer}>
                <div css={css.menuStatsLeft}>
                    <div css={css.menuStatsLeftTopContainer}>
                        <div css={css.menuStatsLeftTopLeft}>
                            <div css={css.today}>오늘</div>
                            <div css={css.yesterday}>어제</div>
                            <div css={css.thisMonth}>이번 달</div>
                        </div>
                        <div css={css.calendarContainer}
                            onClick={() => {
                                calendarDisplayHandler()
                            }}
                        >
                            <div>
                                <EventAvailableIcon sx={{fontSize: 26, marginTop: 1}}/>
                            </div>
                            <div css={css.calendarDate}>
                                {selectDate} ~ {selectDate}
                            </div>
                        </div>
                        {/*<div css={calendarBox ? css.calendarContainer : css.calendarContainerNone}>*/}
                        {/*    <Calendar*/}
                        {/*        calendarType='gregory'*/}
                        {/*        defaultView="month"*/}
                        {/*        onChange={handleDateChange}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                    <div css={css.chartResultLeftContainer}>
                        <PieChart width={540} height={440} style={{
                            filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.3))", borderRadius: "10px", padding: "30px",boxSizing : "border-box",
                        }}>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={90}
                                outerRadius={180}
                                dataKey="totalQuantitySold"
                                onMouseEnter={onPieEnter}
                                stroke="none"
                                cornerRadius={5}
                                paddingAngle={5}
                            />
                        </PieChart>
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
