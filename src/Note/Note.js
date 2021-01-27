import React, { Component } from "react";
import "../Note/Note.css";
// import PropTypes from "prop-types";
class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }
  handleRemoveNote(id) {
    this.props.deleteNote(id);
  }
  render() {
    return (
      <div className="note">
        <span
          className="closebtn"
          onClick={() => this.handleRemoveNote(this.noteId)}
        >
          &times;
        </span>
        <p className="noteContent">{this.noteContent}</p>
      </div>
    );
  }
}

export default Note;
