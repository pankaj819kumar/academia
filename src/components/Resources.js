import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ResourceItem } from './';


class Resources extends Component {
    componentDidMount() {
    }
    render() {
        const { resources } = this.props;
        // console.log('props in Resources Comp', this.props);
        return (
            <div className='resources'>
                {resources.map((resource) => {
                    return <ResourceItem resource={ resource} />
                })}
            </div>
        );
    }
}

// export default Resources;
function mapStateToProps(state) {
    return {
      
    };
  }
  export default connect(mapStateToProps)(Resources);