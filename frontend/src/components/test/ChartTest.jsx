// 차트 테스트룸
import ApexChart from "../chart/ApexChart";
import EduManageReportTable from "../manage/EduManageReportTable";

const ChartTest = () => {
    // const dataSet = {
    //     series: [{
    //       data: [20, 30, 10, 2, 50, 100]
    //     }],
    //     colors: ['#00E396'],
    //     chart: {
    //       id: 'line-1',
    //       group: 'social',
    //       type: 'line',
    //     },
    //     yaxis: {
    //       labels: {
    //         minWidth: 40
    //       }
    //     }
    //   };
    // 테스트값
    const teacherDataSet = [
        0.1, 0.02, 0.6, 0.5, 0.63, 0.2, 0.67, 0.96, 0.25, 0.1, 0.02, 0.6, 0.5,
        0.63, 0.2, 0.67, 0.96, 0.25, 0.56, 0.25,
    ];
    const teacherDataSet2 = [
        0.11, 0.96, 0.25, 0.1, 0.02, 0.6, 0.5, 0.63, 0.1, 0.02, 0.6, 0.5, 0.63,
        0.2, 0.2, 0.67, 0.96, 0.25, 0.56, 0.25,
    ];

    const dataSet = [
        {
            name: "Series 1",
            data: teacherDataSet,
        },
        {
            name: "Series 2",
            data: teacherDataSet2,
        },
    ];

    return (
        <>
            <h1>라인 차트 테스트</h1>
            <ApexChart
                chartType="line"
                type="analyline"
                seriesData={dataSet}
                width="400"
            />

            <EduManageReportTable />
        </>
    );
};

export default ChartTest;
