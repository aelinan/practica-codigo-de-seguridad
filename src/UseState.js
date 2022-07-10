import React from "react";

const SECURITY_CODE = 'paradigma'

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    })

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        })
    }

    const onError = () => {
        setState({ 
            ...state,
            loading: false,
            error: true,
        })
    }
    
    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
        });
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        })
    }

    const onDelete = () => {
        setState({
            ...state, 
            deleted: true,
        })
    }

    const onReset = () => {
        setState({
            ...state,
            value: '', 
            deleted: false,
            loading: false,
            confirmed: false,
        })
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
                onChange={(event) => {
                    onWrite(event.target.value)
                }}
                placeholder="codigo de seguridad"/>
                <button
                    onClick={() => 
                        onCheck()
                    }
                >Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Seguro que quieres eliminar el código?</p>
                <button
                onClick={() => {
                    onDelete()
                }}
                >Sí, eliminar</button>
                <button
                onClick={() => {
                    onReset()
                }}
                >No, volver</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button
                onClick={() => {
                    onReset()
                }}
                >Recuperar información</button>
            </React.Fragment>
        )
    }
}

export { UseState }