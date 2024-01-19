import React, { useEffect, useState } from "react";
import { CategoryScale, Legend, Tooltip } from "chart.js";
import { LinearScale } from "chart.js";
import { Chart } from "chart.js";
import { BarElement } from "chart.js";
import { Title } from "chart.js";
import Spinner from "../../components/Spinner";
import Currency from "../../lib/Currency";
import { getRandomColor } from "../../lib/Helper";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderReportUserWiseChart = (props) => {
  const [total, setTotal] = useState([]);
  const [userList, setUserList] = useState([]);
  const [average, setAverage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState([]);
  const graphData = props.graphData;
  const defaultGraph = props.defaultGraph;

  useEffect(() => {}, [userList]);

  useEffect(() => {
    getUsersList();
  }, [graphData]);

  const getUsersList = async () => {
    let userName = [];
    let userAmount = [];
    let total;
    let average;
    let usersLists = [];
    if (!defaultGraph && graphData) {
      usersLists = graphData.data;
      if (usersLists) {
        if (usersLists.length == 0) {
          setIsLoading(true);
          userName.push([]);
          userAmount.push([]);
          setUserList(userName);
          setTotalAmount(userAmount);
          total = graphData.totalAmount;
          setTotal(total);
          setAverage(graphData.average);
          setIsLoading(false);
        } else {
          for (var i = 0; i < usersLists.length; i++) {
            if (usersLists[i].name) {
              userName.push(usersLists[i].name);
              userAmount.push(usersLists[i].totalAmount);
              setUserList(userName);
              setTotalAmount(userAmount);
            }

            if (usersLists[i].date) {
              userName.push(usersLists[i].date);
              userAmount.push(usersLists[i].amount);
              setUserList(userName);
              setTotalAmount(userAmount);
            }
          }
          total = graphData.totalAmount;
          average = graphData.average;
          setAverage(average);
          setTotal(total);
          setIsLoading(false);
        }
      }
    }

    if (userName && userName.length > 0) return userName;
    if (userAmount) return userAmount;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="App">
        {total > 0 && (
          <h3 className="text-center mt-3">
            Total: {Currency.GetFormatted(total)} (Average:{" "}
            {Currency.GetFormatted(average)}){" "}
          </h3>
        )}
      </div>
      <div
        className="chart-container"
        style={{ width: "100%", whiteSpace: "nowrap" }}
      >
        <div className="chart-wrapper">
          <Bar
            data={{
              labels: userList,
              datasets: [
                {
                  label: "",
                  data: totalAmount,
                  backgroundColor: getRandomColor(userList.length),
                  borderColor: getRandomColor(userList.length),
                  borderWidth: 0.5,
                  datalabels: {
                    formatter: (value) => {
                      return Currency.GetFormatted(value);
                    },
                    color: "blue",
                    anchor: "end",
                    align: "top",
                    offset: -5,
                    font: {
                      size: 14,
                    },
                  },
                },
              ],
            }}
            height={400}
            plugins={[ChartDataLabels]}
            options={{
              animation: false,
              locale: "en-IN",
              maintainAspectRatio: false,
              scales: {
                y: {
                  ticks: {
                    callback: (value) => {
                      return Currency.GetFormatted(value);
                    },
                    beginAtZero: true,
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                  align: "center",
                  labels: {
                    padding: 20,
                    boxWidth: 0,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};
export default OrderReportUserWiseChart;
