import React, { Component } from 'react';
import KeyValuePairEmpty from '../components/KeyValuePairEmpty';

class KeyValuePairEmptyList extends Component {

  render() {
    return (
      Array(this.props.count)
        .fill()
        .map((e,i)=>i+this.props.count)
        .map((x, i) =>
      <KeyValuePairEmpty key={"emptyBox" + i} />
    ));
  }
}

export default KeyValuePairEmptyList
