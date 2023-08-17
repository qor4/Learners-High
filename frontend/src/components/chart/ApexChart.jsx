import React from "react";
import ReactApexChart from "react-apexcharts";
import { NoneDataText } from "../class/LessonItemBox";

class ApexChart extends React.Component {
    // 라인 분석 차트
    renderLineAnalyChart() {
        const { seriesData, width, chartType } = this.props;

        if (seriesData === null || seriesData === undefined) {
            return (
                <div id="chart">
                    <NoneDataText style={{ margin: 0 }}>
                        데이터 없음
                    </NoneDataText>
                </div>
            );
        }
        const options = {
            series: seriesData.map((item) => ({
                name: item.name,
                data: [...item.data],
            })),

            markers: {
                // 데이터 포인트에 점 설정
                show: true,
                size: 4, // 점의 크기
                colors: ["#90E0EF", "#0077B6"], // 점의 색상
                strokeColors: "#fff", // 점 테두리 색상
                strokeWidth: 2, // 점 테두리 너비
            },
            colors: ["#90E0EF", "#0077B6"],
            chart: {
                type: chartType,
            },
            stroke: {
                curve: "smooth",
            },
            yaxis: {
                labels: {
                    minWidth: 40,
                    formatter: function (value) {
                        return value.toFixed(0); // 소수점 두 자리까지 표시
                    },
                },
                min: 0, // 데이터의 최소값
                max: 100, // 데이터의 최대값
                tickAmount: 5, // 눈금의 개수 설정
            },
        };

        return (
            <div id="chart">
                <ReactApexChart
                    key={Math.random()} // 애니메이션 렌더링마다 반복
                    options={options}
                    series={options.series}
                    type={chartType}
                    width={width}
                />
            </div>
        );
    }

    // 파이 만족도 차트
    renderPieCsatChart() {
        const { seriesData, chartType, width } = this.props;

        if (seriesData === null || seriesData === undefined) {
            return (
                <div id="chart">
                    <NoneDataText style={{ margin: 0 }}>
                        데이터 없음
                    </NoneDataText>
                </div>
            );
        }

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

        const options = {
            chart: {
                width: width,
                type: chartType,
                fontFamily: "Pretendard-Regular, sans-serif",
                borderColor: "#000",
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        offset: -10,
                    },
                },
            },
            labels: labels,
            colors: ["#90E0EF", "#00B4D8", "#0077B6", "#023E8A", "#03045E"],

            stroke: {
                show: false,
            },
        };

        return (
            <div id="chart">
                <ReactApexChart
                    key={Math.random()} // 애니메이션 렌더링마다 반복
                    options={options}
                    series={series}
                    type={chartType}
                    width={width}
                />
            </div>
        );
    }

    renderPieTypeChart() {
        const { seriesData, chartType, width } = this.props;

        if (seriesData === null || seriesData === undefined) {
            return (
                <div id="chart">
                    <NoneDataText style={{ margin: 0 }}>
                        데이터 없음
                    </NoneDataText>
                </div>
            );
        }

        const labels = Object.keys(seriesData).map((key) => {
            const countName = key;
            return countName;
        }); // labels에 필드명들을 넣음

        const series = Object.values(seriesData); // series에 해당 필드값들을 넣음

        const options = {
            chart: {
                width: width,
                type: chartType,
                fontFamily: "Pretendard-Regular, sans-serif",
                borderColor: "#000",
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        offset: -10,
                    },
                },
            },
            labels: labels,
            colors: ["#90E0EF", "#00B4D8", "#0077B6", "#023E8A", "#03045E"],

            stroke: {
                show: false,
            },
        };

        return (
            <div id="chart">
                <ReactApexChart
                    key={Math.random()} // 애니메이션 렌더링마다 반복
                    options={options}
                    series={series}
                    type={chartType}
                    width={width}
                />
            </div>
        );
    }

    render() {
        const { type } = this.props;

        return (
            <div id="chart">
                {/* 차트 타입이 파이일 때 + 강사, 강의 만족도 */}
                {type === "csatpie" && this.renderPieCsatChart()}

                {/* 차트 타입이 파이일 때 + 강의 타입 개수 */}
                {type === "typepie" && this.renderPieTypeChart()}

                {/* 라인 분석 차트 */}
                {type === "analyline" && this.renderLineAnalyChart()}
            </div>
        );
    }
}

export default ApexChart;
