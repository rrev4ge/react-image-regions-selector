import {BrowserRouter, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter basename="/">
        <Switch>
            <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
