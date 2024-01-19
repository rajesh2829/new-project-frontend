import React, { useEffect, useState } from "react";

//Config
import { endpoints } from "../../../api/endPoints";
import { apiClient } from "../../../apiClient";

import * as storeConstant from "../../../helpers/StoreList";
import "../../../scss/_custom.scss";
import { Bar } from "react-chartjs-2";
import Spinner from "../../../components/Spinner";
import {
  CategoryScale,
  Chart,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getColorsRandom, getRandomColor } from "../../../lib/Helper";
import Currency from "../../../lib/Currency";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PaymentType } from "../../../helpers/saleReport";
import { searchSalesData } from "../../../actions/report";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActiveSales = (props) => {
  const [total, setTotal] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [average, setAverage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const graphData = props.graphData;
  const defaultGraph = props.defaultGraph
  useEffect(() => {
    getRandomColors();
  }, [storeList]);

  useEffect(() => {
    getStoresList();
  }, [graphData]);

  const getRandomColors = () => {
    if (defaultGraph) {
      let color = getRandomColor(storeList.length);
      setColorList(color);
    } else {
      let color = getColorsRandom();
      setColorList(color);
    }
  };

  const getStoresList = async () => {
    let storeName = [];
    let storeAmount = [];
  
    let total
    let average
    let storesLists = [];
    if (!defaultGraph && graphData) {
      storesLists = graphData.data;
      if (storesLists) {
        if (storesLists.length == 0) {
          setIsLoading(true);
          storeName.push([]);
          storeAmount.push([]);
          setStoreList(storeName);
          setTotalAmount(storeAmount);
          total = graphData.totalAmount;
          setTotal(total);
          setAverage(graphData.average)
          setIsLoading(false);
        }
        else {
          for (var i = 0; i < storesLists.length; i++) {

            storeName.push(storesLists[i].date);
            if(props.params.paymentType===PaymentType.CASH_VALUE){
            storeAmount.push(storesLists[i].amount_cash);
            }
            if(props.params.paymentType===PaymentType.UPI_VALUE){
              storeAmount.push(storesLists[i].amount_upi);
              }
              if(!props.params.paymentType){
            storeAmount.push(storesLists[i].amount);
              }

            setIsLoading(true);
            setStoreList(storeName);
            setTotalAmount(storeAmount);

          }
          total = graphData.totalAmount;  
          setTotal(total);
          average = graphData.average;
          setAverage(average);
          setIsLoading(false);
        }
      }
    }
    else if (defaultGraph && graphData) {
      storesLists = graphData.data;
      if (storesLists) {
        if (storesLists.length == 0) {
          setIsLoading(true);
          storeName.push([]);
          storeAmount.push([]);
          setStoreList(storeName);
          setTotalAmount(storeAmount);
          total = graphData.totalAmount;
          setTotal(total);
          setAverage(graphData.average)
          setIsLoading(false);
        }
        else {
          for (var i = 0; i < storesLists.length; i++) {
            storeName.push(storesLists[i].name);
            if(props.params.paymentType===PaymentType.CASH_VALUE){
              storeAmount.push(storesLists[i].total_amount_cash);
              }
              if(props.params.paymentType===PaymentType.UPI_VALUE){
                storeAmount.push(storesLists[i].total_amount_upi);
                }
                if(!props.params.paymentType){
                  storeAmount.push(storesLists[i].totalAmount);

                    }
            setIsLoading(true);
            setStoreList(storeName);
            setTotalAmount(storeAmount);
          }
          total = graphData.totalAmount;
          average = graphData.average;
          setAverage(average);
          setTotal(total);
          setIsLoading(false);
        }
      }
    }

    if (storeName && storeName.length > 0) return storeName;
    if (storeAmount) return storeAmount;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="App"><h3 className="text-center">Total: {Currency.GetFormatted(total)} (Average: {Currency.GetFormatted(average)}) </h3></div>
      <div className="App">
        <Bar
          data={{
            labels: storeList,
            datasets: [
              {
                label: "",
                data: totalAmount,
                // backgroundColor: ["aqua", "green", "red", "yellow"],
                backgroundColor: colorList,
                borderColor: defaultGraph ? ["aqua", "green", "red", "yellow"] : colorList,
                borderWidth: 0.5,
                datalabels: {
                  formatter: (value) => {
                    return Currency.GetFormatted(value) },
                  color: "blue",
                  anchor: "end",
                  align: "top",
                  offset: -5,
                  font: {
                    size: 14,
                  }
                },
              }
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
                position: 'top',
                align: 'center',
                labels: {
                  padding: 20,
                  boxWidth: 0
                }
              }
            }
          }}
        />
      </div>
    </>
  );
};
export default ActiveSales;
