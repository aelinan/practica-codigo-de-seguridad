import { UseState } from './UseState.js';
import './App.css';
import { UseReducer } from './UseReducer.js';

function App() {
  return (
    <div className="App">
      <UseState name="UseState"/>
      <hr />
      <UseReducer name="UseReducer"/>
    </div>
  );
}

export default App;
