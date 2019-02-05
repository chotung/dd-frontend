import React from 'react'
import { Line } from 'react-chartjs-2'

// const useData = (props) => {
//   const dataPoint = props.chartData.map(data => {
//     return data
//   })
//   console.log(dataPoint)
//   return dataPoint
// }



export default (props) => {
  return (
    <div className='Graph'>
      <Line
        data={props.chartData}
        options={{
          title: {
            display: true,
            text: 'Docker CPU Usage'
          },
          legend: {
            display: false
          },
          maintainAspectRatio: true
        }}
      /> 
    </div>
  )
}
