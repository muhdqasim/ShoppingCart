import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "./RelayEnvironment";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {ShoppingList, ErrorBoundary} from './components';
import { LocalStorageProvider } from './context/LocalStorageContext';
import { ItemsProvider } from "./context/ItemsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    
      <LocalStorageProvider>
        <React.StrictMode>
          <ErrorBoundary>
          <ItemsProvider>
            <ShoppingList />
            </ItemsProvider>
          </ErrorBoundary>
        </React.StrictMode>
      </LocalStorageProvider>
    
  </RelayEnvironmentProvider>
);
