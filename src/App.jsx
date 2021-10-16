import './App.css'
import SignBtn from "./SignBtn";
import EqualBtn from "./EqualBtn";
import ClearBtn from "./ClearBtn";
import {connect} from "react-redux";

const signs = [
    {'sign': '0', 'id': 'zero'},
    {'sign': '1', 'id': 'one'},
    {'sign': '2', 'id': 'two'},
    {'sign': '3', 'id': 'three'},
    {'sign': '4', 'id': 'four'},
    {'sign': '5', 'id': 'five'},
    {'sign': '6', 'id': 'six'},
    {'sign': '7', 'id': 'seven'},
    {'sign': '8', 'id': 'eight'},
    {'sign': '9', 'id': 'nine'},

    {'sign': '+', 'id': 'add'},
    {'sign': '-', 'id': 'subtract'},
    {'sign': '*', 'id': 'multiply'},
    {'sign': '/', 'id': 'divide'},

    {'sign': '.', 'id': 'decimal'}
];

function App({display}) {
  return (
    <div className="App">
      <header className="App-header">
          {signs.map((sign) => (<SignBtn sign={sign} key={sign.id}/>))}

          <EqualBtn />
          <ClearBtn />
          <div id="display">{display}</div>
      </header>
    </div>
  )
}

const mapStateToProps = (state) => ({
    display: state.display,
});

export default connect(mapStateToProps)(App);