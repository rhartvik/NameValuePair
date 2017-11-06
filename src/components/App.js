import React, { Component } from 'react';
import '../styles/App.css';
import KeyValuePair from '../components/KeyValuePair';
import KeyValuePairEmptyList from '../components/KeyValuePairEmptyList';

var minRows = 16;
var kvpFormat = /^<([\w\d]+)> *= *<([\w\d]+)>$/;


class App extends Component {

  state = {
    kvpInput: "",
    kvps: [],
    selectedKVP: 0
  }

  handleKVPInput = (e) => {
    var newKVPInput = e.target.value;
    this.setState((prevState, props) => {
      return { kvpInput: newKVPInput};
    });
  }

  updateSelectedKVP = (kvpIndex) => {
    this.setState((prevState, props) => {
      return { selectedKVP: kvpIndex};
    });
  };

  addNewKVP = () => {
    let newKVP = this.state.kvpInput;
    let validKVP = kvpFormat.test(newKVP);
    if (validKVP) {
      let spacesRemoved = newKVP.replace(kvpFormat, '<$1>=<$2>');
      let updatedKVPs = this.state.kvps.slice();
      updatedKVPs.push(spacesRemoved);

      document.getElementById("kvp-input").value = "";
      this.setState((prevState, props) => {
        return { 
          kvpInput: "",
          kvps: updatedKVPs
        };
      });
    } else {
      window.alert("Name-value pairs must be entered in the format \"<name>=<value>\" and names/values must contain only letters and numbers.");
    }
  }

  removeOne = () => {
    let updatedKVPs = this.state.kvps.slice();
    updatedKVPs.splice(this.state.selectedKVP, 1);
    this.setState((prevState, props) => {
      return {
        kvps: updatedKVPs,
        selectedKVP: 0
      };
    });
  };

  clearAll = () => {
      document.getElementById("kvp-input").value = "";
      this.setState((prevState, props) => {
      return { 
        kvpInput: "",
        kvps: [],
        selectedKVP: 0
      };
    });
  };

  sortKeys = () => {
    let updatedKVPs = this.state.kvps.slice().sort();
    this.setState((prevState, props) => {
      return { 
        kvps: updatedKVPs,
        selectedKVP: 0
      };
    });
  }

  sortValues = () => {
    let updatedKVPs = this.state.kvps.slice().map((kvp) => { return kvp.replace(kvpFormat, '<$2>=<$1>') });
    updatedKVPs.sort();
    updatedKVPs = updatedKVPs.map((kvp) => { return kvp.replace(kvpFormat, '<$2>=<$1>') });

    this.setState((prevState, props) => {
      return { 
        kvps: updatedKVPs,
        selectedKVP: 0
      };
    });
  }

  exportToXml = () => {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<NameValuePairs>';
    this.state.kvps.forEach((kvp) => {
      let kvpXML = kvp.replace(kvpFormat, `
  <NameValuePair>
    <key>
      $1
    </key>
    <value>
      $2
    <value>
  </NameValuePair>`);
      xmlContent += kvpXML;
    }); 
    xmlContent += "\n</NameValuePairs>";
    var uriContent = "data:application/octet-stream," + encodeURIComponent(xmlContent);
    window.open(uriContent, 'name_values.xml');
  }

  render() {
    return (
      <div className="app">
        <div id="input-column" className="column">
          <div className="dictionary-entry">
            <form>
              <label htmlFor="kvp-input" className="hidden">
                Enter a new name-value pair in the form "&lt;name&gt;=&lt;value&gt;"
              </label>
              <input id="kvp-input" type="text"
                onChange={this.handleKVPInput.bind(this)}/>
            </form>
          </div>
          <KeyValuePairEmptyList count={Math.max(minRows - 1, this.state.kvps.length - 1)} />
        </div>
        <div id="buttons-column" className="column">
          <button type="button" onClick={this.addNewKVP}>Add</button>
          <button type="button" onClick={this.removeOne}>Remove Selected</button>
          <button type="button" onClick={this.clearAll}>Clear</button>
          <button type="button" onClick={this.exportToXml}>Export to XML</button>
          <button type="button" onClick={this.sortKeys}>Sort by Name</button>
          <button type="button" onClick={this.sortValues}>Sort by Value</button>
        </div>
        <div id="dictionary-column" className="column">
          {this.state.kvps.map((kvp, index) => {
            let endOfKey = kvp.indexOf(">=<");
            let beginValue = endOfKey + 3;
            let endOfValue = kvp.indexOf(">", beginValue);
            let key = kvp.substring(1,endOfKey);
            let value = kvp.substring(beginValue,endOfValue);
            return (
              <KeyValuePair key={"kvp" + index} 
                dictKey={key} dictValue={value}
                selected={this.state.selectedKVP === index}
                select={this.updateSelectedKVP.bind(this, index)} />
            )}
          )}
          <KeyValuePairEmptyList count={Math.max(0,minRows - this.state.kvps.length)} />
        </div>
      </div>
    );
  }
}

export default App;