import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
    // 초기값
    constructor(props) {
        super(props);

        this.state = {
            series: [11, 11, 11, 11, 11],
            options: {
                chart: {
                    width: 380,
                    type: "pie",
                },
                labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
                plotOptions: {
                    pie: {
                        colors: [
                            "#FF5733",
                            "#FFC300",
                            "#33FF57",
                            "#3366FF",
                            "#FF33CC",
                        ],
                    },
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: "bottom",
                            },
                        },
                    },
                ],
            },
        };
    }

    render() {
        // 테스트값
        // const teacherDataSet = {
        //     oneCnt: 1,
        //     twoCnt: 2,
        //     threeCnt: 3,
        //     fourCnt: 4,
        //     fiveCnt: 5,
        // };
        
        const { seriesData, chartType, width } = this.props;
        const labels = Object.keys(seriesData).map((key) => {
            const countName = key;
            let stars = "";
            if (countName === "oneCnt") {
                stars = "⭐";
            } else if (countName === "twoCnt") {
                stars = "⭐⭐";
            } else if (countName === "threeCnt") {
                stars = "⭐⭐⭐";
            } else if (countName === "fourCnt") {
                stars = "⭐⭐⭐⭐";
            } else if (countName === "fiveCnt") {
                stars = "⭐⭐⭐⭐⭐";
            }
            return stars;
        }); // labels에 필드명들을 넣음
        const series = Object.values(seriesData); // series에 해당 필드값들을 넣음

        console.log(chartType);

        const options = {
            chart: {
                width: { width },
                type: { chartType },
            },
            labels: labels,
            // ... 나머지 옵션 설정
        };
        return (
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type={chartType}
                    width={width}
                />
            </div>
        );
    }
}

export default ApexChart;
