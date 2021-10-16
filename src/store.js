import { createStore } from "redux";

const initialState = {
    'display': '',
};

const SIGN  = 'SIGN';
const DECIMAL_POINT  = 'DECIMAL_POINT';
const ZERO  = 'ZERO';
const NUMBER  = 'NUMBER';

const symTypes = {
    SIGN: ['+', '-', '*', '/'],
    DECIMAL_POINT: ['.'],
    ZERO: ['0'],
    NUMBER: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
}

function getSymType(newSym) {
    for (const type in symTypes) {
        const symList = symTypes[type];
        if (symList.indexOf(newSym) !== -1) {
            return type;
        }
    }

    throw new Error('Unknown symbol');
}

class NegativeToSignTransition extends Error {}
class SignToSignTransition extends Error {}

class EmptyState {
    transition(newSym) {
        const symType = getSymType(newSym);

        switch (symType) {
            case SIGN:
                if (newSym === '-') {
                    return new NegativeState();
                }
                break;
            case NUMBER:
                return new IntegerState();
                break;
        }

        throw new Error('Unsupported state transition');
    }
}

class IntegerState {
    transition(newSym) {
        const symType = getSymType(newSym);

        switch (symType) {
            case SIGN:
                return new SignState();
                break;
            case NUMBER:
            case ZERO:
                return this;
                break;
            case DECIMAL_POINT:
                return new DecimalState();
                break;
        }

        throw new Error('Unsupported state transition');
    }
}

class DecimalState {
    transition(newSym) {
        const symType = getSymType(newSym);

        switch (symType) {
            case SIGN:
                return new SignState();
                break;
            case NUMBER:
            case ZERO:
                return this;
                break;
        }

        throw new Error('Unsupported state transition');
    }
}

class SignState {
    transition(newSym) {
        const symType = getSymType(newSym);

        switch (symType) {
            case SIGN:
                if (newSym === '-') {
                    return new NegativeState();
                } else {
                    throw new SignToSignTransition('Unsupported state transition');
                }
                break;
            case NUMBER:
                return new IntegerState();
                break;
        }

        throw new Error('Unsupported state transition');
    }
}

class NegativeState {
    transition(newSym) {
        const symType = getSymType(newSym);

        switch (symType) {
            case SIGN:
                throw new NegativeToSignTransition('Unsupported state transition');
            case NUMBER:
                return new IntegerState();
                break;
        }

        throw new Error('Unsupported state transition');
    }
}
let currentState = new EmptyState();

function replaceSym(str, sym, index) {
    console.log('replaceSym', str, sym, index)
    if (index < 0) {
        index = str.length + index;
        console.log('index', index)
    }
    return str.substr(0, index) + sym + str.substr(index + sym.length);
}

function replaceTrailingSymbols(str, sym) {
    const regex = /[\-\+\*\/]+$/i;
    return str.replace(regex, sym);
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_DISPLAY":
            if (action.display === '0') {
                currentState = new EmptyState();
            } else if (Number.isInteger(action.display)) {
                currentState = new IntegerState();
            } else {
                currentState = new DecimalState();
            }

            return { ...state, display: action.display };
        case "APPEND_DISPLAY":
            try {
                currentState = currentState.transition(action.append)

                if (state.display === '0') {
                    return {...state, display: action.append}
                }

                return {...state, display: state.display + action.append}
            } catch (e) {
                console.error(e);
                if (e instanceof NegativeToSignTransition) {
                    return {...state, display: replaceTrailingSymbols(state.display, action.append)}
                } else if (e instanceof SignToSignTransition) {
                    return {...state, display: replaceSym(state.display, action.append, -1)}
                } else {
                    return state;
                }
            }
        default:
            return state;
    }
}
export default createStore(reducer);