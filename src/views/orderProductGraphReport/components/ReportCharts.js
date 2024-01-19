import React, { useEffect, useState } from "react";
import "../style.scss";

import { Line, Bar } from "react-chartjs-2";
import Spinner from "../../../components/Spinner";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Chart from "chart.js/auto";
import { getColorsRandom, getRandomColor } from "../../../lib/Helper";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Number from "../../../lib/Number";
import Url from "../../../lib/Url";
import Currency from "../../../lib/Currency";
import { OrderProduct } from "../../../helpers/orderProduct";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const ActiveSales = (props) => {
  const [total, setTotal] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [average, setAverage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState([]);
  const graphData = props?.graphData;
  const defaultGraph = props?.defaultGraph;
  const [locationName, setLocation] = useState([]);
  const [storeQuantity, setStoreQuantity] = useState([]);
  const [amount, setAmount] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [totalAverage, setTotalAverage] = useState("");
  useEffect(() => {
    getRandomColors();
  }, [storeList]);

  useEffect(() => {
    getStoresList();
  }, [graphData]);

  const getRandomColors = () => {
      let color = getRandomColor( Url.GetParam("graphData") == OrderProduct.REPORT_TYPE_AMOUNT_WISE ? amount.length : storeQuantity.length);
      setColorList(color);
  };
  const getStoresList = async () => {
    let storeData = [];
    let locationName = [];
    let orderProductQuantity = [];
    let storeQuantity = [];
    let total;
    let average;
    let storesLists = [];
    let amount=[]
    let totalAmount;
    let totalAverage
    if (!defaultGraph && graphData) {
      storesLists = graphData.data;
      if (storesLists) {
        if (storesLists.length == 0) {
          setIsLoading(true);
          storeData.push([]);
          orderProductQuantity.push([]);
          setStoreList(storeData);
          setLocation([]);
          setStoreQuantity([]);
          setTotalQuantity(orderProductQuantity);
          total = graphData.totalQuantity;
          setTotal(total);
          setAverage(graphData.average);
          setAmount([])
          setIsLoading(false);
        } else {
          for (var i = 0; i < storesLists.length > 0; i++) {
            if (storesLists[i].date) {
              storeData.push(storesLists[i].date);
              amount.push(storesLists[i].price)
              setAmount(amount)
              orderProductQuantity.push(storesLists[i].quantity);
              setStoreList(storeData);
              setTotalQuantity(orderProductQuantity);
              setLocation([]);
              setStoreQuantity([]);
            }

            if (storesLists[i].name) {
              locationName.push(storesLists[i].name);
              storeQuantity.push(storesLists[i].quantity);
              amount.push(storesLists[i].price)
              setAmount(amount)
              setLocation(locationName);
              setStoreQuantity(storeQuantity);
              setStoreList([]);
              setTotalQuantity([]);
            }

            if (storesLists[i].brand_name) {
              locationName.push(storesLists[i].brand_name);
              storeQuantity.push(storesLists[i].quantity);
              amount.push(storesLists[i].price)
              setLocation(locationName);
              setStoreQuantity(storeQuantity);
              setStoreList([]);
              setTotalQuantity([]);
              setAmount(amount)
            }

            if (storesLists[i].category_name) {
              locationName.push(storesLists[i].category_name);
              storeQuantity.push(storesLists[i].quantity);
              amount.push(storesLists[i].price)
              setLocation(locationName);
              setStoreQuantity(storeQuantity);
              setStoreList([]);
              setTotalQuantity([]);
            }
            setIsLoading(true);
          }
          total = graphData.totalQuantity;
          average = graphData.average; 
           totalAmount = graphData?.totalAmount;
          totalAverage = graphData?.totalAverage;
          setAverage(average);
          setTotal(total);
          setTotalAmount(totalAmount);
          setTotalAverage(totalAverage)
          setIsLoading(false);
        }
      }
    }
    if (storeData && storeData.length > 0) return storeData;
    if (orderProductQuantity) return orderProductQuantity;
  };
  const graphBarData = locationName && locationName.length >0 && locationName.map((value, index) => [value, Url.GetParam("graphData") == "Amount Wise" ? amount[index] : storeQuantity[index]]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="App">
        <h3 className="text-center">
          { Url.GetParam("graphData") == "Amount Wise" ? `Total Amount: ${Currency.GetFormatted(graphData?.totalAmount ? graphData?.totalAmount :"")} (Average: ${Number.Get(graphData?.totalAverage ? graphData?.totalAverage :"")})${" "}`:  `Total Quantity: ${graphData?.totalQuantity ? graphData?.totalQuantity :""} (Average: ${Number.Get(graphData.average ?  graphData.average :"")})${" "}`}
        </h3>
      </div>
      {storeList.length > 0 && totalQuantity.length > 0 && (
        <div
          className="chart-container"
          style={{ width: "100%", whiteSpace: "nowrap" }}
        >
          <div>
            <Line
              data={{
                labels: storeList,
                datasets: [
                  {
                    label: " ",
                    data: Url.GetParam("graphData") == "Amount Wise" ? amount : totalQuantity,
                    // backgroundColor: ["aqua", "green", "red", "yellow"],
                    backgroundColor: colorList,
                    borderColor: defaultGraph ? ["blue"] : colorList,
                    borderWidth: 2,
                    datalabels: {
                      formatter: (value) => {
                        if (Url.GetParam("graphData") == "Amount Wise") {
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
              height={"550px"}
              plugins={[ChartDataLabels]}
              options={{
                animation: false,
                maintainAspectRatio: false,
                scales: {
                  y: 
                    {
                      ticks: {
                        callback: (value) => {
                          if (Url.GetParam("graphData") == "Amount Wise") {
                            return Currency.GetFormatted(value);
                          } else {
                            return value;
                          }
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
      )}
 {locationName.length > 0 && storeQuantity.length > 0 && (
<div style={{ width: '100%', overflowX: 'auto' }} id="scroll-view-v1">
<HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'column',
            scrollablePlotArea: {
              minWidth: 700,
            },
            width:10000,
          },
          title: {
            text: " ",
          },
          xAxis: {
            type: 'category',
            labels: {
              autoRotation: [-45, -90],
              style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
              },
            },
          },
          yAxis: {
            min: 0,
            title: {
              text: ' ',
            },
            labels: {
              formatter: function () {
                if(Url.GetParam("graphData") == "Amount Wise"){
                  return Currency.GetFormatted(this.value);
                }else{
                  return this.value;
                }
              },
            },
          },
          legend: {
            enabled: false,
          },
          tooltip: {
            pointFormat: Url.GetParam("graphData") == "Amount Wise" ? '<b>₹{point.y:.1f}</b>': '<b>{point.y:.1f}</b>',
          },
          series: [
            {
              name: 'Population',
              colors: colorList,
              colorByPoint: true,
              groupPadding: 0,
              data: graphBarData,
              dataLabels: {
                enabled: true,
                rotation: -60,
                color: 'black',
                align: 'center',
                format: Url.GetParam("graphData") == "Amount Wise" ? '₹{point.y:.1f}': '{point.y}',
                style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif',
                },
              },
            },
          ],
        }}
      />
</div>
 )}
    </>
  );
};
export default ActiveSales;
