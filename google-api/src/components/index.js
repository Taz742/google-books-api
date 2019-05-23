import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './header';
import Content from './content';

const App = (props) => {
    return (
        <div>
            <Header {...props} />
            <Content {...props} />
        </div>
    )
}

export default withRouter(App);
