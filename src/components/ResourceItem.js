import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ResourceItem extends Component {
  render() {
    const { resource } = this.props;
    return (
      <div className="resource-item">
        <a href={resource.link} target="_blank" rel="noopener noreferrer">
          <div className='resource-name'>{resource.name}</div>
        </a>
      </div>
    );
  }
}

export default ResourceItem;
