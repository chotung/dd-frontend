import React, { Component } from 'react';
import './App.css';
import DashboardContainer from './containers/DashboardContainer';
import GraphContainer from './containers/GraphContainer';

const baseUrl = "http://localhost:5000";

class App extends Component {

  state = {
    dockerCPUUsage: [],
    chartData: [],
    dashboards: [],
    name: ''
  }

  componentDidMount = () => {
    this.fetchCpuUsage()
    this.getDashBoards()
  }

  fetchCpuUsage = () => {
    fetch(`${baseUrl}/api/cpu_usage`)
    .then(res => res.json())  
    .then(data => {
      let percent = []
      let currentAmountOfTicks = []
      data.forEach(tick => {
        percent.push(tick[1])
        currentAmountOfTicks.push(tick[0])
      })
      this.setGraph(currentAmountOfTicks,percent)

    })
  }

  getDashBoards = () => {
    fetch(`${baseUrl}/api/get_dashboards`)
      .then(res => res.json())
      .then(data => {
        this.setState({dashboards:data['dashboard_lists']})
      }) 
    }

  createDashboard = (event) => {
    event.preventDefault();
    this.getDashBoards()
    fetch("http://localhost:5000/api/create_dashboard", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `name=${this.state.name}`
    })
    this.getDashBoards()
    this.setState({ name:''})
  }

deleteDashboard = (id) => {
    fetch(`${baseUrl}/api/delete_dashboard`, {
      method: "POST",
      headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `id=${id}`
    })
    this.getDashBoards()
  }



  setGraph = (label, data) => {

    this.setState({
      chartData: {
        labels: label,
        datasets: [
          {
            fill: true,
            data: data,
            backgroundColor: ["rgb(43, 102, 137)"],
            borderColor: ["rgb(79, 193, 233)"]
          }
        ]
      },
    });
  }

  inputName = (e) => {
    this.setState({ name: e.target.value})
  }


  render() {
    return (
      <div className="App">
        <DashboardContainer dashboards={this.state.dashboards} inputName={this.inputName} name={this.state.name} addDashboard={this.addDashboard} deleteDashboard={this.deleteDashboard} createDashboard={this.createDashboard} />
        <GraphContainer chartData={this.state.chartData} />
      </div>
    );
  }
}

export default App;
