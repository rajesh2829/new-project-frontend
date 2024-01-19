import React, { useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import Spinner from "../../../components/Spinner";
import Currency from "../../../lib/Currency";
import { getColorsRandom, getRandomColor } from "../../../lib/Helper";
import "../../../scss/_custom.scss";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VendorBarChart = (props) => {
  const [total, setTotal] = useState([]);
  const [average, setAverage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const graphData = props.graphData;
  const defaultGraph = props.defaultGraph;

  useEffect(() => {
    getRandomColors();
  }, [vendorList]);

  useEffect(() => {
    getVendorList();
  }, [graphData]);

  const getRandomColors = () => {
    if (defaultGraph) {
      let color = getRandomColor(vendorList.length);
      setColorList(color);
    } else {
      let color = getColorsRandom();
      setColorList(color);
    }
  };

  const getVendorList = async () => {
    let name = [];
    let amount = [];

    if (graphData?.graphData) {
      graphData?.graphData.forEach((data) => {
        name.push(data.name);
        amount.push(data.totalAmount);
      });
    }
    setVendorList(name);
    setTotalAmount(amount);
    setTotal(graphData.totalAmount);
    setAverage(graphData.average);
    return storeName; 
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
            labels: vendorList,
            datasets: [
              {
                label: "",
                data: totalAmount,
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
export default VendorBarChart;
