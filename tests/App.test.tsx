import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../src/components/App';

it('App is rendered', () => {
    // Render App in the document
    const domContainer = document.createElement('div');
    ReactDOM.render(<App/>, domContainer);

    const appNode = ReactDOM.findDOMNode(domContainer);

    // Verify text content
    expect(appNode.textContent).toEqual('Task ManagerPlease Log InnamepasswordLogin');
});
