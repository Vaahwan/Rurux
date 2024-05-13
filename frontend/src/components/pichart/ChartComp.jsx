import React, { useState } from "react";
import {useEffect} from 'react'
import axios from "axios";
import { Mark } from "@chakra-ui/react";
import Pichart from "./Pichart";

const ChartComp = ({studentData})=>{
    
    const label = studentData.map((elem)=>{
        return elem.subjectName;
    })

    const dataset = studentData.map((elem)=>{
        return elem.marks;
    })

    const finaldata = {
        labels: label,
        datasets: [{
            label:"my subjects",
            data: dataset,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
            ],
        }],       
    }

    // const chartData = {
    //     datasets: [{
    //         data: [10, 20, 30]
    //     }],
    
    //     // These labels appear in the legend and in the tooltips when hovering different arcs
    //     labels: [
    //         'Red',
    //         'Yellow',
    //         'Blue'
    //     ]
    // };

    return(
        <div>
            {/* <button onClick={handleChart}>Get Chart</button> */}
            <Pichart chartData={finaldata} /> 
        </div>
    )
}

export default ChartComp