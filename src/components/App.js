import React, { Component } from 'react';
import '../styles/App.css';
import KeyValuePair from '../components/KeyValuePair';

class App extends Component {

  state = {
    newKVPs: [],
    selectedNewKVP: 0,
    kvps: [],
    selectedKVP: 0
  }

  updateSelectedKVP = (kvpIndex) => {
    this.setState((prevState, props) => {
      return { selectedKVP: kvpIndex};
    });
  };

  updateSelectedNewKVP = (kvpIndex) => {
    this.setState((prevState, props) => {
      return { selectedNewKVP: kvpIndex};
    });
  };


  render() {
    return (
      <div className="app">
        <div id="input-column" className="column">
        </div>
        <div id="buttons-column" className="column">
          <button type="button">Add</button>
          <button type="button">Remove Selected</button>
          <button type="button">Clear</button>
          <button type="button">Export to JSON</button>
          <button type="button">Sort by Name</button>
          <button type="button">Sort by Value</button>
        </div>
        <div id="dictionary-column" className="column">
          {this.state.kvps.map((kvp, index) => {
            var endOfKey = kvp.indexOf(">=<");
            var beginValue = endOfKey + 3;
            var endOfValue = kvp.indexOf(">", beginValue);
            var key = kvp.substring(1,endOfKey);
            var value = kvp.substring(beginValue,endOfValue);
            return (
            <KeyValuePair key={"kvp" + index} 
              dictKey={key} dictValue={value}
              selected={this.state.selectedKVP === index}
              select={this.updateSelectedKVP.bind(this, index)} />
          )}
          )}
        </div>
      </div>
    );
  }
}

export default App;
