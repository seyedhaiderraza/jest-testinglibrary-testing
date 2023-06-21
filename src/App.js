import logo from './logo.svg';
import './App.css';
import Login from './components/Login';

function App() {
  const a = 4
  const b = 2
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Login/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          <li>Apples</li>
          <li>Orange</li>
          <li>Mango</li>
        </ul>
        <h1 title='Sample-Title'>This is Title for Testing</h1>
        <div data-testid="sum-of" >{a+b}</div>
      </header>
    </div>
  );
}

export default App;
