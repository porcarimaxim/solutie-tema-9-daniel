import React from "react";

export default class Tasklist extends React.Component {
	render() {
	  return <li>
		  {this.props.customData}
		  {this.props.children}
		</li>
	}
}