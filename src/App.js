// import React from 'react';
// import logo from './trivia.png';
import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      // BrowserRouter <- tudo que tiver dentro pode ser acessado por uma rota
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
      </Switch>
    );
  }
}

export default App;

// export default function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={ logo } className="App-logo" alt="logo" />
//         <p>SUA VEZ</p>
//       </header>
//     </div>
//   );
// }
