import React from "react";

import ReactEcharts from "echarts-for-react";

import apiUrl from "../fetchAPI";

function ISODateString(d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

class SalesDataPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sales: [],
      dates: [],
      chartData: [],
      salesPeriod: "week"
    };

    this.createDateRange = this.createDateRange.bind(this);
    this.insertSalesDates = this.insertSalesDates.bind(this);
    this.fetchSalesInfo = this.fetchSalesInfo.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
  }

  componentDidMount() {
    this.fetchSalesInfo();
  }

  createDateRange(salesPeriod) {
    const dates = [];
    const today = new Date();
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (salesPeriod === "week") {
      currentDate.setDate(today.getDate() - 7);
    } else if (salesPeriod === "month")
      currentDate.setMonth(today.getMonth() - 1);
    else if (salesPeriod === "year") {
      currentDate.setYear(today.getFullYear() - 1);
    }
    while (currentDate < today) {
      let nextDay = currentDate;
      nextDay.setDate(currentDate.getDate() + 1);
      dates.push(ISODateString(nextDay));
      currentDate = nextDay;
    }
    this.setState({ dates: dates }, () => this.insertSalesDates(salesPeriod));
  }

  sortByDate() {
    this.state.sales.sort((a, b) => {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? 1 : a < b ? -1 : 0;
    });
  }

  insertSalesDates(salesPeriod) {
    let data = new Array(this.state.dates.length).fill(0);
    this.state.dates.forEach((date, index) => {
      this.state.sales.forEach(sale => {
        if (sale.date === date) {
          data[index]++;
        }
      });
      this.setState({ chartData: data });
    });
  }

  fetchSalesInfo() {
    fetch(apiUrl + "/manager/sales")
      .then(res => res.json())
      .then(sales =>
        this.setState({ sales: sales }, () => {
          this.sortByDate();
          this.createDateRange("week");
        })
      );
  }

  render() {
    return (
      <>
        <div className="level">
          <div className="level-item">
            <p className="title">Sales Data</p>
          </div>
        </div>
        <div className="level">
          <div className="level-item">
            <button
              className="button is-link is-large"
              onClick={() => {
                this.createDateRange("week");
                this.setState({ salesPeriod: "week" });
              }}
            >
              Past Week Sales
            </button>
          </div>
          <div className="level-item">
            <button
              className="button is-link is-large"
              onClick={() => {
                this.createDateRange("month");
                this.setState({ salesPeriod: "month" });
              }}
            >
              Past Month Sales
            </button>
          </div>
          <div className="level-item">
            <button
              className="button is-link is-large"
              onClick={() => {
                this.createDateRange("year");
                this.setState({ salesPeriod: "year" });
              }}
            >
              Past Year Sales
            </button>
          </div>
        </div>
        <ReactEcharts
          option={{
            title: {
              text: "Sales from the past " + this.state.salesPeriod
            },
            xAxis: {
              data: this.state.dates
            },
            yAxis: {},
            series: [
              {
                name: "Sales",
                type: "bar",
                data: this.state.chartData
              }
            ],
            tooltip: {},
            legend: {
              data: ["Sales"]
            }
          }}
        />
      </>
    );
  }
}

export default SalesDataPage;
