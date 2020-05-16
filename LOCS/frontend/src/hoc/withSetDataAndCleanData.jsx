import React from 'react';
import { connect } from 'react-redux';

export const withSetDataAndCleanData = (setData, cleanData) => {
    return (Component) => {
        class ComponentWithSetDataAndCleanData extends React.Component {
            componentDidMount() {
                this.props.setData();
            }
        
            componentWillUnmount() {
                this.props.cleanData();
            }
    
            render() {
                return <Component {...this.props.ownProps} />
            }
        }

        const mapStateToProps = (state, ownProps) => ({
            ownProps: ownProps
        });
    
        return connect(mapStateToProps, {setData, cleanData})(ComponentWithSetDataAndCleanData);
    }
} 