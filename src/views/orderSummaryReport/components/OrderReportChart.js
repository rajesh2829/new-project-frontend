import React, { useEffect, useState } from "react";
import "../style.scss";

import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import Spinner from "../../../components/Spinner";
import Currency from "../../../lib/Currency";
import { getRandomColor } from "../../../lib/Helper";
import { OrderProduct } from "../../../helpers/orderProduct";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActiveSales = (props) => {
  const [total, setTotal] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [average, setAverage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState([]);
  const graphData = props.graphData;
  const defaultGraph = props.defaultGraph;

  useEffect(() => {
  }, [storeList]);

  useEffect(() => {
    getStoresList();
  }, [graphData]);

 

  const getStoresList = async () => {
    let locationName = [];
    let storeAmount = [];
    let total;
    let average;
    let storesLists = [];
    if (!defaultGraph && graphData) {
      storesLists = graphData.data;
      if (storesLists) {
        if (storesLists.length == 0) {
          setIsLoading(true);
          locationName.push([]);
          storeAmount.push([]);
          setStoreList(locationName);
          setTotalAmount(storeAmount);
          total = graphData.totalAmount;
          setTotal(total);
          setAverage(graphData.average);
          setIsLoading(false);
        } else {
          for (var i = 0; i < storesLists.length; i++) {
            if (
              props.params.type == "Location Wise" &&
              !props.params.sortType
            ) {
              locationName.push(storesLists[i].name);
              storeAmount.push(storesLists[i].totalAmount);
              setStoreList(locationName);
              setTotalAmount(storeAmount);
            }

            if (storesLists[i].name && props.params.sortType == OrderProduct.REPORT_TYPE_AMOUNT_WISE) {
              locationName.push(storesLists[i].name);
              storeAmount.push(storesLists[i].totalAmount);
              setStoreList(locationName);
              setTotalAmount(storeAmount);
            }
            if (storesLists[i].name && props.params.sortType == OrderProduct.REPORT_TYPE_QUANTITY_WISE) {
              locationName.push(storesLists[i].name);
              storeAmount.push(storesLists[i].totalCount);
              setStoreList(locationName);
              setTotalAmount(storeAmount);
            }

            if (storesLists[i].date && !props.params.sortType) {
              locationName.push(storesLists[i].date);
              storeAmount.push(storesLists[i].amount);
              setStoreList(locationName);
              setTotalAmount(storeAmount);
            }

            if (storesLists[i].date && props.params.sortType == OrderProduct.REPORT_TYPE_AMOUNT_WISE) {
              locationName.push(storesLists[i].date);
              storeAmount.push(storesLists[i].amount);
              setStoreList(locationName);
              setTotalAmount(storeAmount);
            }
            if (storesLists[i].date && props.params.sortType == OrderProduct.REPORT_TYPE_QUANTITY_WISE) {
              locationName.push(storesLists[i].date);
              storeAmount.push(storesLists[i].totalCount);
              setStoreList(locationName);
              setTotalAmount(storeAmount);
            }

            if (props.params.sortType == OrderProduct.REPORT_TYPE_QUANTITY_WISE) {
              total = graphData.totalCount;
              average = graphData.average;
              setAverage(average);
              setTotal(total);
            } else {
              total = graphData.totalAmount;
              average = graphData.average;
              setAverage(average);
              setTotal(total);
            }
            if (graphData.totalCount == 0 || graphData.totalAmount == 0) {
              setAverage();
              setTotal();
            }
          }
          setIsLoading(false);
        }
      }
    }
    if (locationName && locationName.length > 0) return locationName;
    if (storeAmount) return storeAmount;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="App">
        {total > 0 && props.params.sortType !== OrderProduct.REPORT_TYPE_QUANTITY_WISE && (
        <h3 className="text-center mt-3">
          Total: {Currency.GetFormatted(total)} (Average:{" "}
          {Currency.GetFormatted(average)}){" "}
        </h3>
        )}
        {total > 0 && props.params.sortType == OrderProduct.REPORT_TYPE_QUANTITY_WISE && (
          <h3 className="text-center mt-3">
            Total Order: {total} (Average: {Math.round(average)}){" "}
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
              labels: storeList,
              datasets: [
                {
                  label: "",
                  data: totalAmount,
                  backgroundColor: getRandomColor(storeList.length),
                  borderColor:  getRandomColor(storeList.length),
                  borderWidth: 0.5,
                  datalabels: {
                    formatter: (value) => {
                      if (props.params.sortType !== OrderProduct.REPORT_TYPE_QUANTITY_WISE) {
                        return Currency.GetFormatted(value);
                      } else {
                        return value;
                      }
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
export default ActiveSales;
