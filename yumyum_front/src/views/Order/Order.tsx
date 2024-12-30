/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as css from "./Style";
import { useCookies } from "react-cookie";
import axios from "axios";
import { OrderInfo, OrderDetailInfo } from "../../types/Order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export default function Order() {
  const [currentTab, setCurrentTab] = useState("0");
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState<OrderDetailInfo[]>([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await axios.get("http://localhost:4041/api/v1/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        const data = response.data.data;
        setOrders(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const FilterOrder = orders.filter((order) => order.orderState === currentTab);

  const openModal = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:4041/api/v1/orders/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        const data = response.data.data;
        setOrderDetail(data);
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

  const updateOrderState =  async (orderId: number, updateOrderState: string) => {
    try {
      const response = await axios.put(`http://localhost:4041/api/v1/orders/update/state/${orderId}`, 
        {},
      {
        params: {
          updateOrderState: updateOrderState
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }, 
      );
      if(response.data) {
        console.log(token);
        fetchOrder();
        closeModal();
      }
    } catch(e) {
      console.error(e);
    }
  }

  const renderTable = () => {
    return (
      <div css={css.tableContainer}>
        <table css={css.table}>
          <tbody>
            {FilterOrder.map((order) => (
              <tr key={order.orderId} css={css.tr}>
                <td css={css.td}>
                  <p>{order.orderId}</p>
                </td>
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
                  ) : (
                    currentTab !== "2" && (
                      <button css={css.buttons} onClick={() => updateOrderState(order.orderId, "2")}>완료</button>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                      <div style={{ margin: "10px" }}>
                        <p>
                          {order.menuName} {order.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p css={css.price}>
                    총 가격:{" "}
                    {orderDetail.reduce(
                      (sum, item) =>
                        sum +
                        item.menuPrice * item.quantity +
                        item.additionalFee,
                      0
                    )}{" "}
                    원
                  </p>
                  <p css={css.address}>
                    주소: {orderDetail[0].deliveryAddress}
                  </p>
                  <div css={css.modalButtons}>
                    <button css={css.modalButton} onClick={() => updateOrderState(orderDetail[0].orderId, "1")}>접수</button>
                    <button
                      css={css.modalButton}
                      onClick={() => alert("거절 시 본사에 문의해주세요.")}
                    >
                      거절
                    </button>
                  </div>
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

  return (
    <div css={css.container}>
      <div>
        <button onClick={() => setCurrentTab("0")} css={css.button}>
          접수 대기
        </button>
        <button onClick={() => setCurrentTab("1")} css={css.button}>
          처리 중
        </button>
        <button onClick={() => setCurrentTab("2")} css={css.button}>
          완료
        </button>
      </div>
      <div>{renderTable()}</div>
    </div>
  );
}
