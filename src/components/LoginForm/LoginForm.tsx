import * as React from 'react';
import './LoginForm.scss';
import { FormGroup } from './FormGroup'


export interface LoginFormProps {
    readonly stateMachine: any;
    readonly send: (arg0: any) => any;
    readonly buttonSubmit: string;
    readonly disableSubmit?: boolean;
    readonly subtitle: string;
}

const LoginForm = (props: LoginFormProps) => {

    // TO_DO: set up global state using custom hook and Context React API
    const [form, setForm] = React.useState({
        name: '',
        password: '',
    });
    return (
        <div className="main-container">
            <div className="form-header">
                <h2>{props.subtitle}</h2>
            </div>
            {props.stateMachine.context.login_fails > 0 &&
                <div className="alert error">Autentication Failed</div>
            }
            {props.stateMachine.context.login_fails == 4 && 
                <div className="alert error">You have 1 more attempt</div>
            }
            <div className="form-body">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        props.send({ type: "SUBMIT", data: { ...form } });
                    }}
                >
                    <FormGroup 
                        name="name"
                        id="NameOnCard"
                        className="form-control"
                        type="text"
                        maxLength={255}
                        value={form.name}
                        handleChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    <FormGroup 
                        name="password"
                        id="CreditCardNumber"
                        className="null card-image form-control"
                        type="password"
                        value={form.password}
                        handleChange={e => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                        id="SubmitButton"
                        className="btn btn-block btn-success submit-button"
                        type="submit"
                        disabled={props.disableSubmit}
                    >
                        <span className="align-middle">{props.buttonSubmit}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export { LoginForm };
export default LoginForm;

