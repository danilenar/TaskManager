import * as React from 'react';
import './FormGroup.scss';

export interface FormGroupProps {
    readonly name: string,
	readonly id : string,
    readonly className : string,
    readonly type : string,
    readonly maxLength? : number,
    readonly value : string,
    readonly handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void 
}

const FormGroup = (props: FormGroupProps) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.name}</label>
            <input
                id= {props.id}
                className={props.className}
                type={props.type}
                maxLength={props.maxLength}
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    );
};

export { FormGroup };
export default FormGroup;

