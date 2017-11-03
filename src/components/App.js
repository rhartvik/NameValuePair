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

  addNewKVP = () => {
    var newKVP = document.getElementById("newKVPInput" + this.state.selectedNewKVP).value;
    var kvpFormat = /^(<[\w\d]+>) *= *(<[\w\d]+>)$/;
    var validKVP = kvpFormat.test(newKVP);
    if (validKVP) {
      var spacesRemoved = newKVP.replace(kvpFormat, '$1=$2');
      var updatedKVPs = this.state.kvps.slice();
      updatedKVPs.push(spacesRemoved);

      var updatedNewKVPs = this.state.newKVPs.slice();
      updatedNewKVPs[this.state.selectedNewKVP] = "";

      this.setState((prevState, props) => {
        return { 
          newKVPs: updatedNewKVPs,
          kvps: updatedKVPs
        };
      });
    } else {
      window.alert("Key-value pairs must be entered in the format \"<key>=<value>\"");
    }
  }

  removeOne = () => {
    var updatedKVPs = this.state.kvps.slice();
    updatedKVPs.splice(this.state.selectedKVP, 1);
    this.setState((prevState, props) => {
      return {
        kvps: updatedKVPs,
        selectedKVP: 0
      };
    });
  };

  render() {
    return (
      <div className="app">
        <div id="input-column" className="column">
        </div>
        <div id="buttons-column" className="column">
          <button type="button" onClick={this.addNewKVP}>Add</button>
          <button type="button" onClick={this.removeOne}>Remove Selected</button>
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
