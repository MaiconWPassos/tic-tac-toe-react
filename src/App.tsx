import Board from "./components/Board";
import "./styles/app.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
      </header>
      <Board />
    

      <div className="donate-link">
        <a href="https://www.paypal.com/donate?hosted_button_id=XC4TGLL84VX3L">Buy me a coffee ☕ </a>
      </div>
    </div>
  );
}

export default App;
