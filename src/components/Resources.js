import React, { Component } from 'react';
import { ResourceItem } from './';


class Resources extends Component {
    render() {
        const { resources } = this.props;
        console.log('props in Resources Comp', this.props);
        return (
            <div className='resources'>
                {resources.map((resource) => {
                    return <ResourceItem resource={ resource} />
                })}
            </div>
        );
    }
}

export default Resources;