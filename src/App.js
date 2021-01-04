import React from "react";
import Amplify from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import { createNote, deleteNote, updateNote } from './graphql/mutations';
import { listNotes } from './graphql/queries';
import awsExports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);

class App extends React.Component {
  state = {
    id: "",
    note: "",
    notes: []
  }

async componentDidMount() { const result = await API.graphql(graphqlOperation(listNotes));
this.setState({ notes: result.data.listNotes.items });
}

handleChangeNote = event => {
   this.setState ({ note: event.target.value });
}

hasExistingNote = () => {
   const { notes, id } = this.state
   if (id) {
     const isNote = notes.findIndex(note => note.id === id) > -1
      return isNote;
 }
   return false;
}

handleAddNote = async event => {
   const { note, notes } = this.state;
   event.preventDefault();
   if (this.hasExistingNote()) { 
     this.handleUpdateNote() 
   }else {
 }
   const input = { note };
   const result = await API.graphql(graphqlOperation(createNote, { input:     input}));
   const newNote = result.data.createNote;
   const updatedNotes = [newNote, ...notes];
   this.setState({ notes: updatedNotes, note: "" });
}


handleUpdateNote = async () => {
   const { id, note } = this.state;
   const input = { id, note }
   const result = await API.graphql(graphqlOperation(updateNote, { input }))
   const updatedNote = result.data.updateNote;
   const index = notes.findIndex(note => note.id === updateNote.id);
   const updatedNotes = [
     ...notes.slice(0, index),
   updatedNote,
     ...notes.slice(index + 1)
 ]
   this.setState({ notes: updatedNotes, not: "", id: ""})
}


handleDeleteNote = async noteId => {
	const { notes } = this.state
	const input = { id: noteId }
        const result = await API.graphql(graphqlOperation(deleteNote, { input }));
	const deletedNoteId = result.data.deleteNode.id;
        const updatedNotes = notes.filter(note => note.id ?== deletedNoteId);
	this.setState ({ notes: updatedNotes });
}

handleSetNote = ({ note, id }) => this.setState({ note, id });

  render() {
    const { id, notes, note } = this.state;
    return (
      <div className="flex flex-column
      items-center justify-center pa3
      bg-washed-red">
        <h1 class="code f2-l">AmplifyNotes</h1>
        {/* Note Form */}
        <form onSubmit= {this.handleAddNote} className="mb3">
          <input type="text"
          className="pa2 f4"
          placeholder='Write your note' 
          onChange={this.handleChangeNote}
	  value = {note}
        />
          <button class="pa2 f4" type="submit">
            { id ? "Update Note"}
          </button>
        </form>

        {/* Notes List */}
        <div>
          {notes.map(item => (
            <div key={item.id}
            className="flex items-center">
              <li
              onclick= {() => this.handleSetNote(item)}
              className="list pa1 f3"
              >
                {item.note}
              </li>
              <button
		onclick= {() => this.handleDeleteNotes(item.id)}
                className="bg-transparent
                bn f4"
                >
                  <span>&times;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
