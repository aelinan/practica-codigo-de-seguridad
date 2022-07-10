import { type } from "@testing-library/user-event/dist/type";
import React from "react";

const SECURITY_CODE = 'paradigma'

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const onConfirm = () => {
        dispatch({type: actionTypes.confirm})
    }

    const onError = () => {
        dispatch({type: actionTypes.error})
    }
    
    const onWrite = (event) => {
        dispatch({type: actionTypes.write, payload: event.target.value})
    }

    const onCheck = () => {
        dispatch({type: actionTypes.check})
    }

    const onDelete = () => {
        dispatch({type: actionTypes.delete})
    }

    const onReset = () => {
        dispatch({type: actionTypes.reset})
    }

    React.useEffect(() => {
        if(!!state.loading) {
            setTimeout(() => {
                if(state.value !== SECURITY_CODE) {
                    onError()
                } else {
                    onConfirm()
                }
            }, 2500);
        }
    }, [state.loading])
    

    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor escribe el codigo de seguridad</p>
    
                {(state.error && !state.loading) && (
                    <p>Error: el codigo es incorrecto</p>
                )}
    
                {state.loading && (
                    <p>Cargando...</p>
                )}
    
                <input 
                value={state.value}
                onChange={onWrite}
                placeholder="codigo de seguridad"/>
                <button onClick={onCheck} >Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Seguro que quieres eliminar el código?</p>
                <button onClick={onDelete} >Sí, eliminar</button>
                <button
                onClick={onReset}
                >No, volver</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button
                onClick={onReset}
                >Recuperar información</button>
            </React.Fragment>
        )
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const actionTypes = {
    confirm: 'CONFIRM',
    check: 'CHECK',
    error: 'ERROR',
    delete: 'DELETE',
    reset: 'RESET',
    write: 'WRITE',
}

const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    }, 
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.delete]: {
        ...state, 
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        value: '', 
        deleted: false,
        loading: false,
        confirmed: false,
    },
    [actionTypes.write]: {
        ...state,
        value: payload,
    }
})

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

export { UseReducer }