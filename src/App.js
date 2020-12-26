import React from "react";
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);

class App extends React.Component {
  render() {
    return <div>App</div>;
  }
}

export default withAuthenticator(App, { includeGreetings: true });
