import * as React from 'react';
import './SesionAutoclosed.scss';

export interface SesionAutoclosedProps {
	readonly send: (arg0: any)=>any;
}

const SesionAutoclosed = (props: SesionAutoclosedProps) => {
    return (
        <div className='main-container'>
            <h2>Maxium session time reached, closed</h2>
            <button onClick={() => props.send('OK')}>Ok</button>
        </div>
    );
};

export { SesionAutoclosed };
export default SesionAutoclosed;

