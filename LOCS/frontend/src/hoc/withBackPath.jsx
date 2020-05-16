import React from 'react';
import { connect } from 'react-redux';
import { setPathBack } from '../redux/indexReducers';

export const withBackPath = (path) => (Component) => {
    class ComponentWithBackPath extends React.Component {
        componentDidMount() {
            this.props.setPathBack(path);
        }

        render() {
            return <Component {...this.props.ownProps} />
        }
    };

    const mapStateToProps = (props, ownProps) => ({
        ownProps: ownProps
    });

    return connect(mapStateToProps, { setPathBack })(ComponentWithBackPath);
}