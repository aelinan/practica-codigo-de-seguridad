import React from "react";
import { Loading } from './Loading'

const SECURITY_CODE = 'seguridad';

class ClassState extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false,
        };
    }

    componentDidUpdate() {
        console.log('updated')

        if(!!this.state.loading) {
            setTimeout(() => {
                console.log('validando');
                if(this.state.value !== SECURITY_CODE) {
                    this.setState({ error: true, loading: false})
                } else {
                    this.setState({ error: false, loading: false})
                }
                // this.setState({ loading: false });
                console.log('validado');
            }, 2000);
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escribe el codigo de seguridad</p>
                {(this.state.error && !this.state.loading) && (
                <p>Error: el codigo es incorrecto</p>
                )}
                {this.state.loading && (
                    <Loading />
                )}
                <input 
                value={this.state.value}
                onChange={(e) => {
                    this.setState({ value: e.target.value })
                }}
                placeholder="codigo de seguridad"/>
                <button
                    onClick={() => this.setState({ loading: true })}
                >Comprobar</button>
            </div>
        )
    }
}

export { ClassState }