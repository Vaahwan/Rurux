// import { Divider } from "@chakra-ui/react";
// import react from 'react';
// import Chart from 'chart.js'
import React from 'react';
import {Pie} from 'react-chartjs-2'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"

function Pichart({chartData}){

    const cdata = {
        datasets: [{
            data: [10, 20, 30]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };
     

    return(
        <Pie data={chartData}  />
    )
}

export default Pichart;