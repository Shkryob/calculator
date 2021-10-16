import {connect} from "react-redux";

function ClearBtn({dispatch}) {
    function clear() {
        dispatch({ type: "SET_DISPLAY", display: '0' });
    }

    return (
        <button id="clear" onClick={clear}>clear</button>
    )
}

export default connect()(ClearBtn);
