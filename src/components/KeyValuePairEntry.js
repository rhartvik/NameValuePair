import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/KeyValuePair.css';

class KeyValuePairEntry extends Component {

  select = () => {
    this.props.select();
  }

  render() {
    var inputId = "newKVPInput" + this.props.index;
    return (
      <div className={this.props.selected ? "dictionary-entry selected" : "dictionary-entry"}
        onClick={this.select}>
        <label htmlFor={inputId} className="hidden">
          Enter a new label in the form "&lt;key&gt;=&lt;value&gt;"
        </label>
        <input id={inputId} type="text"/>
      </div>
    );
  }
}

KeyValuePairEntry.propTypes = {
  select: PropTypes.func.isRequired,
  selected: PropTypes.bool
  
}

export default KeyValuePairEntry
