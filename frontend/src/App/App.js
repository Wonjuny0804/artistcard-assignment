import './App.css';
import {
  Albums,
  AlbumDetail
} from 'pages';
import {
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Albums} />
        <Route path="/album/:albumid" exact component={AlbumDetail} />
      </Switch>
    </div>
  );
}

export default App;
