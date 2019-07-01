import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import { useMachine } from '@xstate/react';
import { machine } from './../stateManager/stateManager'
import { SesionAutoclosed } from './SesionAutoclosed'
import { LoginForm } from './LoginForm'
import { Spinner } from './Spinner'
import { UserPanel } from './UserPanel'

// Entry point
function App() {
    // Custom hook to allow usage of state machine
    const [stateMachine, send] = useMachine(machine);

    return (
        <div className="app">
            <h1>Task Manager</h1>
            
            {(()=>{
                // Each state is meant to have his own component.
                switch (stateMachine.value) {
                    case 'logged':                        
                        return <UserPanel
                            send={send}
                        />                        
                    case 'sesion_autoclosed':
                        return <SesionAutoclosed send={send} />
                    case 'wait':
                        return <Spinner/>
                    case 'secure_wait_after_login_fail':
                        return <LoginForm 
                            send={send} 
                            stateMachine={stateMachine} 
                            buttonSubmit="Login"
                            subtitle="Login temporary disabled"
                            disableSubmit
                        />
                    default:
                        return <LoginForm 
                            send={send} 
                            stateMachine={stateMachine}
                            subtitle="Please Log In" 
                            buttonSubmit="Login" 
                        />
                }
            })()}
        </div>
    );
}

declare let module: Object;

export default hot(module)(App);