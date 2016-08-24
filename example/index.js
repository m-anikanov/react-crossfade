'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Crossfade = require('../dist/index.js');

var Demo = React.createClass({
	getInitialState() {
		return {
			isElementSwitched: false
		}
	},
	onElementClick() {
		this.setState({
			isElementSwitched: !this.state.isElementSwitched
		})
	},
	render: function() {
		return(
			<div onClick={this.onElementClick}>
				<Crossfade
					transitionName="example"
					transitionEnterTimeout={400}
					transitionLeaveTimeout={400} >
					{this.state.isElementSwitched ? 
						<div className="element" key={1}>B</div>
						:
						<div className="element" key={0}>A</div>
					}
				</Crossfade>
			</div>
		);
	}
});

ReactDOM.render(<Demo />, document.querySelector('#demo-wrapper'));
