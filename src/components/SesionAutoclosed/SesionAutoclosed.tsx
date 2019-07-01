import * as React from 'react';
import './SesionAutoclosed.scss';

export interface SesionAutoclosedProps {
	readonly send: (arg0: any)=>any;
}

const SesionAutoclosed = (props: SesionAutoclosedProps) => {
    return (
        <React.Fragment>
            <h2>Maxium session time reached, closed</h2>
            <button onClick={() => props.send('OK')}>Ok</button>
        </React.Fragment>
    );
};

export { SesionAutoclosed };
export default SesionAutoclosed;

