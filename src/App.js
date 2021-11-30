import Content from './content';
import Menu from './menu';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Menu></Menu>
        </div>
        <br></br><br></br>
        <div>
          <Content></Content>
        </div>
      </div>
    </Router>
  );
}

export default App;
