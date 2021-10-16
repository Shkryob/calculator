import {evaluate} from 'mathjs'
import {connect} from "react-redux";

function EqualBtn({display, dispatch}) {
    function getResult() {
        const result = evaluate(display)

        dispatch({ type: "SET_DISPLAY", display: result });
    }

    return (
        <button id="equals" onClick={getResult}>=</button>
    )
}

const mapStateToProps = (state) => ({
    display: state.display,
});

export default connect(mapStateToProps)(EqualBtn);
