import React from "react";
import Amplify from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import { createNote } from './graphql/mutations';
import { listNotes } from './graphql/queries';
import awsExports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);

class App extends React.Component {
  state = {
    note: "",
    notes: []
  }

async componentDidMount() { const result = await API.graphql(graphqlOperation(listNotes))
this.setState({ notes: result.data.listNotes.items })
}

handleChangeNote = event => {
   this.setState ({ note: event.target.value });
}

handleAddNote = async event => {
   const { note, notes } = this.state;
   event.preventDefault();
   const input = { note };
   const result = await API.graphql(graphqlOperation(createNote, { input:     input}));
   const newNote = result.data.createNote;
   const updatedNotes = [newNote, ...notes];
   this.setState({ notes: updatedNotes, note: "" });
}

  render() {
    const { notes, note } = this.state;
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
            Add note
          </button>
        </form>

        {/* Notes List */}
        <div>
          {notes.map(item => (
            <div key={item.id}
            className="flex items-center">
              <li
              className="list pa1 f3"
              >
                {item.note}
              </li>
              <button
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
