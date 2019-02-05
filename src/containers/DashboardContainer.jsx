import React, { Component } from 'react'

import DashBoard from '../components/Dashboard'

export default class DashboardContainer extends Component {
  
  state = {
    dashboards: [],
  }

  static getDerivedStateFromProps(props, state) {
    if (props.dashboards !== state.dashboards) {
      return {
        dashboards: props.dashboards
      }
    }
    return null
  }

  renderDashboards = () => {
    return this.state.dashboards.map((dashboard) => {
      return (<DashBoard key={dashboard.id} id={dashboard.id} data={dashboard} delete={this.props.deleteDashboard} />)
    });
  }

  

  render() {
    return (
      <div>
        <div className='dashboard-container'>
          {this.renderDashboards()}
        </div>
      <form className='create-dashboard' onSubmit={this.props.createDashboard}>
        <label>
          Name: &nbsp;
            <input className="input-text" type="text" value={this.props.name} onChange={this.props.inputName} placeholder="Enter a Name"  />
        </label>
        <input type="submit" value="Create" />
      </form>

      </div>
    )
  }
}
