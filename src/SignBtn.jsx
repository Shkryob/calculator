import {connect} from "react-redux";

function SignBtn({sign, dispatch}) {
    function addSign() {
        dispatch({ type: "APPEND_DISPLAY", append: sign.sign });
    }

    return (
        <button id={sign.id} onClick={addSign}>{sign.sign}</button>
    )
}

export default connect()(SignBtn);
