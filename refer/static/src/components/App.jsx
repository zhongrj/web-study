
import React from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout';

const App = React.createClass({
    render() {
        return (
            <MainLayout {...this.props}>
                {this.props.children}
            </MainLayout>
        )
    }
});

export default App;