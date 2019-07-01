import * as React from 'react';
import './UserPanel.scss';

export interface UserPanelProps {
    readonly send: (arg0: any) => any;
}

const UserPanel = (props: UserPanelProps) => {
    return (
        <div className='main-container'>
            <div className='userName'>User: Admin</div>
            <button
                id="SubmitButton"
                className="btn btn-block btn-success submit-button"
                type="submit"
            >
                <span className="align-middle">Upload completed task</span>
            </button>
            <button
                id="SubmitButton"
                className="btn btn-block btn-success submit-button"
                type="submit"
            >
                <span className="align-middle">View pending tasks</span>
            </button>
            <button
                id="SubmitButton"
                className="btn btn-block btn-success submit-button"
                type="submit"
            >
                <span className="align-middle">Statistics</span>
            </button>
            <button
                id="SubmitButton"
                className="btn btn-block btn-warning submit-button"
                type="submit"
                onClick={() => props.send({ type: "LOG_OUT"})}
            >
                <span className="align-middle">Log out</span>
            </button>
        </div>
    );
};

export { UserPanel };
export default UserPanel;

