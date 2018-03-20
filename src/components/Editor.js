import React, { Component } from 'react'
import { connect } from 'react-redux'

import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

import { dispatchTextChange } from '../store'

class Editor extends Component {

  render(){
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="tomorrow"
          onChange={this.props.onChange}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          height="300px"
          width="300px"
          focus={true}
          wrapEnabled={true}
          value={this.props.textValue}
        />
        <button onClick={this.props.onClick}>Run</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    textValue: state.textValue
  }
}

const mapDispatch = (dispatch) => {
  return {
    onChange(textValue) {
      dispatch(dispatchTextChange(textValue));
    },
    onClick(evt) {
      evt.preventDefault();
      // console.log('stuff ', this.state);
      // console.log(this.props.editorValue);
      console.log('anything');
    }
  }
}

export default connect(mapState, mapDispatch)(Editor);
