import React, { Component } from 'react'
import { Line, Bar } from 'react-chartjs-2'

const data = {
	labels: [],
	datasets: [
		{
			label: 'Course',
			backgroundColor: 'rgba(75,192,192,1)',
			fill: false,
			lineTension: 0.5,
			borderColor: 'rgba(0,0,0,1)',
			borderWidth: 2,
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'black',
			pointBackgroundColor: 'rgba(75,192,192,1)',
			pointBorderWidth: 2,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 5,
			pointHitRadius: 10,
			data: [],
		},
	],
}

export default class LineChart extends Component {
	static defaultProps = {
		labels: [''],
		data: [0],
		type: 'Line',
	}

	render() {
		if (this.props.labels !== undefined) {
			data.labels = this.props.labels
			data.datasets[0].data = this.props.data
		}
		return (
			<div>
				{(this.props.type === 'Line' && (
					<Line
						ref='chart'
						data={data}
						options={{
							title: {
								display: true,
								text: 'Course graph for a certain period of time',
								fontSize: 20,
							},
							legend: {
								display: true,
								position: 'right',
								labels: {
									usePointStyle: true,
								},
							},
							responsive: true,
							maintainAspectRatio: true,
							tooltips: {
								mode: 'index',
								axis: 'y',
							},
						}}
					/>
				)) ||
					(this.props.type === 'Bar' && (
						<Bar
							ref='chart'
							data={data}
							options={{
								title: {
									display: true,
									text: 'Course graph for a certain period of time',
									fontSize: 20,
								},
								legend: {
									display: true,
									position: 'right',
									labels: {
										usePointStyle: true,
									},
								},
								responsive: true,
								maintainAspectRatio: true,
								tooltips: {
									mode: 'index',
									axis: 'y',
								},
							}}
						/>
					))}
			</div>
		)
	}

	componentDidMount() {
		const { datasets } = this.refs.chart.chartInstance.data
		// console.log(datasets[0].data)
	}
}
