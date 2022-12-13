import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';

import * as CONSTANTS from './constants/constants';
import { CometChat } from '@cometchat-pro/chat';

const appSetting = new CometChat.AppSettingsBuilder()
                    .subscribePresenceForAllUsers()
                    .setRegion(CONSTANTS.APP_REGION)
                    .autoEstablishSocketConnection(true)
                    .build();
CometChat.init(CONSTANTS.APP_ID, appSetting).then(
  () => {
    console.log("Initialization completed successfully"); 
  }, error => {
    console.log("Initialization failed with error:", error);
  }
);



ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('root'),
  );
  
