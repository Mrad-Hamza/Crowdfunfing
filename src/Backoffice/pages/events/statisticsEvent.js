import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import axios from "axios";
import { options } from "preact";



const StatisticsEvent = () => {
    const [chart, setChart] = useState({});

    // labels: ["A", "B", "C"],
    // datasets: [
    //     {
    //         data: [300, 50, 100],
    //         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    //         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    //     },
    // ],

    useEffect(() => {
        const fetchEventsByType = async () => {

           const response = await axios
               .get(`http://localhost:5000/statis/getAll`)
               .then((response) => {
                   console.log("hh");
                   if (response.ok) {
                       response.json().then((json) => {
                           console.log(json.data);
                           setChart(json.data);
                       });
                   }
                   console.log("helllooooo");
               })
               .catch((error) => {
                   console.log(error);
               });
               
        };
        fetchEventsByType();
    }, []);
    console.log("chart", chart);

    const data = {
        labels: chart?.events?.map((x) => x.eventType),
        datasets: [
            {
                label: `${chart?.events?.length} Coins Available`,
                data: chart?.events?.map((x) => x.eventType),
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
         plugins: {
                legend: {
                    labels: {
                        color: "#ebedef",
                    },
                },
            },
    };
    return (
        <div className="grid p-fluid">
            <div className="col-12 lg:col-6">
                <div className="card flex flex-column align-items-center">
                    <h5>Pie Chart</h5>
                    <Chart type="pie" data={data} options={options} style={{ width: "50%" }} />
                </div>
            </div>
            <div className="col-12 lg:col-6">
                {/* <div className="card flex flex-column align-items-center">
                    <h5>Doughnut Chart</h5>
                    <Chart type="doughnut" data={doughnutData} options={pieOptions} style={{ width: "50%" }} />
                </div> */}
            </div>
        </div>
    );
};




// const doughnutData = {
//     labels: ["A", "B", "C"],
//     datasets: [
//         {
//             data: [300, 50, 100],
//             backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//             hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         },
//     ],
// };

    // const [lineOptions, setLineOptions] = useState(null);
    // const [barOptions, setBarOptions] = useState(null);
    // const [pieOptions, setPieOptions] = useState(null);
    // const [polarOptions, setPolarOptions] = useState(null);
    // const [radarOptions, setRadarOptions] = useState(null);

    
        

       

       
        

        // setLineOptions(lineOptions);
        // setBarOptions(barOptions);
        // setPieOptions(pieOptions);
        // setPolarOptions(polarOptions);
        // setRadarOptions(radarOptions);
    

    // const applyDarkTheme = () => {
    //     const lineOptions = {
    //         plugins: {
    //             legend: {
    //                 labels: {
    //                     color: "#ebedef",
    //                 },
    //             },
    //         },
    //         scales: {
    //             x: {
    //                 ticks: {
    //                     color: "#ebedef",
    //                 },
    //                 grid: {
    //                     color: "rgba(160, 167, 181, .3)",
    //                 },
    //             },
    //             y: {
    //                 ticks: {
    //                     color: "#ebedef",
    //                 },
    //                 grid: {
    //                     color: "rgba(160, 167, 181, .3)",
    //                 },
    //             },
    //         },
    //     };

       

        // const pieOptions = {
        //     plugins: {
        //         legend: {
        //             labels: {
        //                 color: "#ebedef",
        //             },
        //         },
        //     },
        // };

       

       

        // setLineOptions(lineOptions);
        // setBarOptions(barOptions);
        // setPieOptions(pieOptions);
        // setPolarOptions(polarOptions);
        // setRadarOptions(radarOptions);
    

    // useEffect(() => {
    //     if (props.colorMode === "light") {
    //         applyLightTheme();
    //     } else {
    //         applyDarkTheme();
    //     }
    // }, [props.colorMode]);

    


const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
};

export default React.memo(StatisticsEvent, comparisonFn);
