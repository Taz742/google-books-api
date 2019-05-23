import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './header';
import Content from './content';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header {...this.props} />
                <Content {...this.props} />
            </div>
        )
    }
}

export default withRouter(App);
