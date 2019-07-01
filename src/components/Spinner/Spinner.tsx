import * as React from 'react';
import './Spinner.scss';

export interface SpinnerProps {
	readonly prueba?: any;
}

const Spinner = (props: SpinnerProps) => {
    return (
        <div className="main-container">
            <div className="loader"></div>
        </div>
    );
};

export { Spinner };
export default Spinner;

