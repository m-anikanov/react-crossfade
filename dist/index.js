'use strict';

var React = require('react');
var PropTypes = React.PropTypes;

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
	displayName: 'Crossfade',

	propTypes: {
		children: PropTypes.node,
		transitionEnterTimeout: PropTypes.number,
		transitionLeaveTimeout: PropTypes.number,
		transitionName: PropTypes.string
	},

	getInitialState: function getInitialState() {
		return {
			prevNode: undefined,
			nextNode: undefined
		};
	},
	componentWillMount: function componentWillMount(nextProps) {
		this.updateNodes(this.props);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.updateNodes(nextProps);
	},
	updateNodes: function updateNodes(nextProps) {
		var _this = this;

		if (!this.state.prevNode) {
			this.setState({
				prevNode: nextProps.children
			});
		} else if (this.state.prevNode.key !== nextProps.children.key) {
			this.setState({
				prevNode: null,
				nextNode: nextProps.children
			}, function () {
				setTimeout(function () {
					_this.setState({
						prevNode: _this.state.nextNode,
						nextNode: null
					});
				}, _this.props.transitionEnterTimeout);
			});
		} else if (this.state.prevNode.key == nextProps.children.key) {
			this.setState({
				prevNode: nextProps.children
			});
		}
	},
	render: function render() {
		return React.createElement(
			ReactCSSTransitionGroup,
			{
				transitionName: this.props.transitionName,
				transitionEnterTimeout: this.props.transitionEnterTimeout,
				transitionLeaveTimeout: this.props.transitionLeaveTimeout },
			this.state.prevNode || null
		);
	}
});