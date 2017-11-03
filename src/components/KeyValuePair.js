import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/KeyValuePair.css';

class KeyValuePair extends Component {

  select = () => {
    this.props.select();
  }

  render() {
    return (
      <div className={this.props.selected ? "dictionary-entry selected" : "dictionary-entry"}
        onClick={this.select}>
        <p>{this.props.dictKey}={this.props.dictValue}</p>
      </div>
    );
  }
}

KeyValuePair.propTypes = {
  dictKey: PropTypes.string.isRequired,
  dictValue: PropTypes.string.isRequired
}

export default KeyValuePair
