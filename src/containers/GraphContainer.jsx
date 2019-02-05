import Graph from '../components/Graph';
import React, { Component } from 'react'

export default class GraphContainer extends Component {

  render() {
    return (
      <div>
        <Graph chartData={this.props.chartData} />
      </div>
    )
  }
}
