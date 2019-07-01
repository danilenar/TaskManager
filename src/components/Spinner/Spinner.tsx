import * as React from 'react';
import './Spinner.scss';

export interface SpinnerProps {
	readonly prueba?: any;
}

const Spinner = (props: SpinnerProps) => {
    return (
        <React.Fragment>
            <div className="loader"></div>
        </React.Fragment>
    );
};

export { Spinner };
export default Spinner;

