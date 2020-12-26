import React from "react";
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);

class App extends React.Component {
  state = {
    notes: [{
      id: 1,
      note: "Hello World"
    }
  ]
  }
  render() {
    const { notes } = this.state;
    return (
      <div className="flex flex-column
      items-center justify-center pa3
      bg-washed-red">
        <h1 class="code f2-l">AmplifyNotes</h1>
        {/* Note Form */}
        <form className="mb3">
          <input type="text"
          className="pa2 f4"
          placeholder='Write your note' />
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
