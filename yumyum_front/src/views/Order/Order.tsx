/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";

import axios from "axios";
import moment from "moment";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

import {
  CurrentStore,
  OrderInfo,
  OrderDetailInfo,
  OrderDetailOptionInfo,
} from "../../types/Order";
import * as css from "./Style";

export default function Order() {
  const [currentTab, setCurrentTab] = useState("0");
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState<OrderDetailInfo[]>([]);
  const [optionDetail, setOptionDetail] = useState<OrderDetailOptionInfo[]>([]);

  const [completedCount, setCompletedCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentDate] = useState<string>(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    const storeCurrentInfo = localStorage.getItem("currentStore");

    const parseStoreCurrentInfo: CurrentStore | null = storeCurrentInfo
      ? JSON.parse(storeCurrentInfo)
      : null;

    const defaultStoreInfo: CurrentStore = {
      storeDate: currentDate,
      storeCompletedCount: 0,
      storeTotalPrice: 0,
    };

    if (parseStoreCurrentInfo?.storeDate === currentDate) {
      setCompletedCount(parseStoreCurrentInfo.storeCompletedCount || 0);
      setTotalPrice(parseStoreCurrentInfo.storeTotalPrice || 0);
    } else {
      localStorage.setItem("currentStore", JSON.stringify(defaultStoreInfo));
      setCompletedCount(0);
      setTotalPrice(0);
    }
    fetchOrder();
  }, [currentDate]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get("http://localhost:4041/api/v1/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        const data = response.data.data;

        const uniqueOrders = data.filter(
          (order: any, index: number, self: any[]) =>
            index === self.findIndex((o) => o.orderId === order.orderId)
        );

        setOrders(uniqueOrders);

        const completedOrders = data.filter(
          (order: any) =>
            order.orderState === "2" &&
            moment(order.orderDate).format("YYYY-MM-DD") === currentDate
        );

        setCompletedCount(completedOrders.length);

        setTotalPrice(
          completedOrders.reduce(
            (sum: any, order: any) => sum + (order.sumTotalPrice || 0),
            0
          )
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const currentInfo = (orderId: number, updateOrderState: string) => {
    const updateOrder = orders.find(
      (order) =>
        order.orderId === orderId &&
        order.orderState !== "2" &&
        updateOrderState === "2"
    );
    if (updateOrder) {
      const isToday =
        moment(updateOrder.orderDate).format("YYYY-MM-DD") === currentDate;
      if (isToday) {
        const updateCompletedCount = completedCount + 1;
        const updateTotalPrice = totalPrice + updateOrder.sumTotalPrice;

        const updateCurrentStore: CurrentStore = {
          storeDate: currentDate,
          storeCompletedCount: Number(updateCompletedCount),
          storeTotalPrice: Number(updateTotalPrice),
        };

        localStorage.setItem(
          "currentStore",
          JSON.stringify(updateCurrentStore)
        );

        setCompletedCount(updateCompletedCount);
        setTotalPrice(updateTotalPrice);
      }
    }
  };

  const FilterOrder = orders.filter((order) => {
    const isToday =
      moment(order.orderDate).format("YYYY-MM-DD") === currentDate;
    const orderState = String(order.orderState);

    if (currentTab === "2") {
      return orderState === "2";
    } else {
      if (currentTab === "0") {
        return orderState === "0" && isToday;
      } else if (currentTab === "1") {
        return orderState === "1" && isToday;
      }
    }
  });

  const openModal = async (orderId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:4041/api/v1/orders/detail/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        const data = response.data.data;

        const uniqueOrderDetail = data.filter(
          (item: OrderDetailInfo, index: number, self: OrderDetailInfo[]) =>
            index ===
            self.findIndex((o) => o.orderDetailId === item.orderDetailId)
        );

        setOrderDetail(uniqueOrderDetail);
        setOptionDetail(data);
        setIsModalOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOrderDetail([]);
  };

  const updateOrderState = async (
    orderId: number,
    updateOrderState: string
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:4041/api/v1/orders/update/state/${orderId}`,
        {},
        {
          params: {
            updateOrderState: updateOrderState,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        currentInfo(orderId, updateOrderState);
        fetchOrder();
        closeModal();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const currentOrderInfo = () => {
    return (
      <>
        <p className="completedCount">
          오늘의 주문 건수는 {completedCount} 건 입니다!
        </p>
        <p className="totalPrice">오늘의 매출은 {totalPrice} 원 입니다!</p>
      </>
    );
  };

  const renderTable = () => {
    return (
      <div css={css.tableContainer}>
        {FilterOrder.length > 0 ? (
          <table css={css.table}>
            <tbody>
              {FilterOrder.map((order, index) => (
                <tr key={order.orderId} css={css.tr}>
                  <td css={css.td}>
                    <p>{order.deliveryAddress}</p>
                  </td>
                  <td css={css.td}>
                    <p>{order.orderDate}</p>
                  </td>
                  <td css={css.td}>
                    <p>{order.sumTotalPrice}</p>
                  </td>
                  <td css={css.td}>
                    {order.orderState === "0" ? (
                      <button
                        css={css.buttons}
                        onClick={() => openModal(order.orderId)}
                      >
                        접수
                      </button>
                    ) : currentTab !== "2" ? (
                      <button
                        css={css.buttons}
                        onClick={() => updateOrderState(order.orderId, "2")}
                      >
                        완료
                      </button>
                    ) : (
                      order.orderState === "2" && (
                        <span
                          css={css.detailButton}
                          onClick={() => openModal(order.orderId)}
                        >
                          자세히
                        </span>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ display: "flex" }}>
            <p
              style={{
                marginTop: "30px",
                margin: "30px auto",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              주문이 없습니다
            </p>
          </div>
        )}
        {isModalOpen && (
          <div css={css.modal}>
            <div css={css.modalContent}>
              <div css={css.modalHeader}>
                <h2>주문 상세</h2>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  onClick={closeModal}
                  style={{ cursor: "pointer" }}
                />
              </div>
              {orderDetail.length > 0 ? (
                <div>
                  <div css={css.orderInfo}>
                    {orderDetail.map((order) => (
                      <div key={order.orderDetailId} style={{ margin: "10px" }}>
                        <div css={css.orderDetail}>
                          <span>{order.menuName}</span>
                          <span>{order.quantity}개</span>
                          <span>{order.menuPrice}원</span>
                        </div>
                        <div>
                          {optionDetail
                            .filter(
                              (option) =>
                                option.orderDetailId === order.orderDetailId
                            )
                            .map((option, idx) => (
                              <div
                                key={idx}
                                css={css.optionDetail}
                              >
                                <span>{option.menuOptionName}</span>
                                <span>{option.menuOptionDetailName}</span>
                                <span>+{option.additionalFee}원</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p css={css.address}>
                    주소: {orderDetail[0].deliveryAddress}
                  </p>
                  {orderDetail.length > 0 &&
                    orderDetail[0].orderState !== "2" && (
                      <div css={css.modalButtons}>
                        <button
                          css={css.modalButton}
                          onClick={() =>
                            updateOrderState(orderDetail[0].orderId, "1")
                          }
                        >
                          접수
                        </button>
                        <button
                          css={css.modalButton}
                          onClick={() => alert("거절 시 본사에 문의해주세요.")}
                        >
                          거절
                        </button>
                      </div>
                    )}
                </div>
              ) : (
                <p>로딩 중..</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleStateTabClick = (stateTab: string) => {
    setCurrentTab(stateTab);
  };

  return (
    <div css={css.container}>
      <div css={css.currentInfoContainer}>{currentOrderInfo()}</div>
      <div css={css.orderTableContainer}>
        <div className="orderStateButton">
          <button
            onClick={() => handleStateTabClick("0")}
            css={[css.button, currentTab === "0" && css.buttonActive]}
          >
            접수 대기
          </button>
          <button
            onClick={() => handleStateTabClick("1")}
            css={[css.button, currentTab === "1" && css.buttonActive]}
          >
            처리 중
          </button>
          <button
            onClick={() => handleStateTabClick("2")}
            css={[css.button, currentTab === "2" && css.buttonActive]}
          >
            완료
          </button>
        </div>
        <div>{renderTable()}</div>
      </div>
    </div>
  );
}
