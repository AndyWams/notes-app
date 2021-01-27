import React, { Component } from "react";
import "./NoteForm.css";
import { animateScroll } from "react-scroll";
class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: "",
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }
  handleUserInput(event) {
    this.setState({
      newNoteContent: event.target.value,
    });
  }
  writeNote(e) {
    e.preventDefault();
    if (this.state.newNoteContent !== "") {
      this.props.addNote(this.state.newNoteContent);
    }
    this.setState(
      {
        newNoteContent: "",
      },
      this.scrollToBottom
    );
  }
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "note_container",
    });
  }
  render() {
    return (
      <div className="form__wrapper">
        <form onSubmit={this.writeNote}>
          <input
            className="noteInput"
            placeholder="Write a new note..."
            value={this.state.newNoteContent}
            onChange={this.handleUserInput}
          />
          <button className="postButton">Add Note</button>
        </form>
      </div>
    );
  }
}

export default NoteForm;
