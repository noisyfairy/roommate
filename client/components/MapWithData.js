import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapWrapper from './MapWrapper'
import * as d3 from 'd3'

class MapWithData extends Component {
  constructor() {
    super()
    this.state = {
      dataSet: ''
    }
  }

  componentDidMount() {
    console.log('compnonent mounting')
  }

  handleChange = evt => {
    console.log('receiving event:', evt)
    this.setState({
      dataSet: evt.target.value
    })
    this.render()
  }

  render() {
    const ArrestColor = d3
      .scaleThreshold()
      .domain([1, 5, 10, 15, 20, 25])
      .range([
        'white',
        d3.rgb(245, 162, 162),
        d3.rgb(255, 2, 2),
        d3.rgb(206, 2, 2),
        d3.rgb(168, 1, 1),
        d3.rgb(126, 1, 1),
        d3.rgb(89, 1, 1)
      ])
    // .style('opacity', 0.8)
    // .opacity = .4

    const subwayColor = d3
      .scaleThreshold()
      .domain([1, 4, 8, 12, 16, 20])
      .range([
        'white',
        d3.rgb(254, 255, 204),
        d3.rgb(253, 255, 160),
        d3.rgb(253, 235, 130),
        d3.rgb(255, 236, 100),
        d3.rgb(255, 219, 61)
      ])
    const housingColor = d3
      .scaleThreshold()
      .domain([1, 5, 10, 15, 20, 30])
      .range([
        'white',
        d3.rgb(194, 194, 194),
        d3.rgb(137, 137, 137),
        d3.rgb(80, 80, 80),
        d3.rgb(57, 57, 57),
        d3.rgb(37, 37, 37)
      ])
    const treeColor = d3
      .scaleThreshold()
      .domain([1, 4, 8, 12, 16, 20])
      .range([
        'white',
        d3.rgb(31, 235, 148),
        d3.rgb(1, 204, 102),
        d3.rgb(0, 153, 75),
        d3.rgb(0, 122, 51),
        d3.rgb(0, 80, 15)
      ])

    return (
      <div>
        {this.state.dataSet.length > 1 ? (
          <h3>Currently Showing {this.state.dataSet} Map</h3>
        ) : (
          <h3>Pick a map to display below</h3>
        )}
        <form>
          <div className="mapAndQuestions">
            <select
              type="select"
              value={this.state}
              onChange={this.handleChange}
            >
              <option value="">SELECT</option>
              <option value="Crime"> Crime </option>
              <option value="Subway Stations"> Subway Stations</option>
              <option value="Housing Violations">Housing Violations</option>
              <option value="Trees">Trees</option>
            </select>
          </div>
          <div>
            {this.state.dataSet === 'Crime' && (
              <MapWrapper
                data={this.props.arrestData}
                shouldRender={this.props.shouldRender}
                color={ArrestColor}
              />
            )}
            {this.state.dataSet === 'Subway Stations' && (
              <MapWrapper
                data={this.props.subwayData}
                shouldRender={this.props.shouldRender}
                color={subwayColor}
              />
            )}
            {this.state.dataSet === 'Housing Violations' && (
              <MapWrapper
                data={this.props.violationData}
                shouldRender={this.props.shouldRender}
                color={housingColor}
              />
            )}
            {this.state.dataSet === 'Trees' && (
              <MapWrapper
                data={this.props.treeData}
                shouldRender={this.props.shouldRender}
                color={treeColor}
              />
            )}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mapData: state.map.mapData,
  arrestData: state.addedMap.arrestMapData,
  subwayData: state.addedMap.subwayMapData,
  violationData: state.addedMap.violationMapData,
  shouldRender: state.map.shouldRender,
  treeData: state.addedMap.treeMapData
})

export default connect(mapStateToProps, null)(MapWithData)
