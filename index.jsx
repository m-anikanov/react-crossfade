'use strict';

const React = require('react');
const PropTypes = React.PropTypes;

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
	displayName: 'Crossfade',

	propTypes: {
        children: PropTypes.node,
        transitionEnterTimeout: PropTypes.number,
        transitionLeaveTimeout: PropTypes.number,
        transitionName: PropTypes.string
    },

	getInitialState() {
	    return {
	        prevNode: undefined,
	        nextNode: undefined  
	    };
	},

	componentWillMount(nextProps) {
	    this.updateNodes(this.props);
	},

	componentWillReceiveProps(nextProps) {
		this.updateNodes(nextProps);
	},

	updateNodes(nextProps) {
		if (!this.state.prevNode) {
			this.setState({
				prevNode: nextProps.children
			});
		} else if(this.state.prevNode.key !== nextProps.children.key) {
			this.setState({
				prevNode: null,
				nextNode: nextProps.children
			}, () => {
				setTimeout(() => {
					this.setState({
						prevNode: this.state.nextNode,
						nextNode: null
					});
				}, this.props.transitionEnterTimeout)
			});
		} else if (this.state.prevNode.key == nextProps.children.key) {
			this.setState({
				prevNode: nextProps.children
			});
		}
	},

	render() {
		return (
			<ReactCSSTransitionGroup
				transitionName={this.props.transitionName}
				transitionEnterTimeout={this.props.transitionEnterTimeout}
				transitionLeaveTimeout={this.props.transitionLeaveTimeout} >
				{this.state.prevNode || null}
			</ReactCSSTransitionGroup>
		);
	}
});