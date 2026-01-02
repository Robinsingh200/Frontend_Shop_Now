import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Toaster } from './components/ui/sonner';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Store, { persistor } from './ReduxToolKit/Store';
import axios from "axios";           
import './index.css';

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster />
    </PersistGate>
  </Provider>
);
