import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Note from "./Note/Note";
import React, { Component } from "react";
import NoteForm from "./NoteForm/NoteForm";
import { DB_CONFIG } from "./config/config";
import firebase from "firebase";
import "firebase/database";

class App extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

    if (!firebase.apps.length) {
      this.myApp = firebase.initializeApp(DB_CONFIG);
    } else {
      this.myApp = firebase.app();
    }

    this.database = this.myApp.database().ref().child("notes");

    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    const previousNotes = this.state.notes;
    //Datasnapshot
    this.database.on("child_added", (snap) => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      });
      this.setState({
        notes: previousNotes,
      });
    });

    //Function to remove an item from the database
    this.database.on("child_removed", (snap) => {
      for (let i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }
      this.setState({
        notes: previousNotes,
      });
    });
  }

  //Method to add a Note
  addNote(note) {
    this.database.push().set({ noteContent: note });
  }
  //Method to delete a Note
  deleteNote(noteId) {
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <main className="main">
        <div className="notes__wrapper">
          <div className="notes__header">
            <header>
              <h1>
                Your Notes <span>Playground to post random stuff...</span>
              </h1>
            </header>
          </div>
          <div className="notes__content" id="note_container">
            {this.state.notes.map((note) => {
              return (
                <Note
                  noteContent={note.noteContent}
                  noteId={note.id}
                  key={note.id}
                  deleteNote={this.deleteNote}
                />
              );
            })}
          </div>
          <div className="notes__footer">
            <footer>
              <NoteForm addNote={this.addNote} />
            </footer>
          </div>
        </div>
      </main>
    );
  }
}
export default App;
