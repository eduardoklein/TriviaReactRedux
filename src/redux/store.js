import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// https://gist.github.com/ANDREHORMAN1994/dbcd4e60b0737a70f819c7dfab4c02b5

if (window.Cypress) {
  window.store = store;
}

export default store;
