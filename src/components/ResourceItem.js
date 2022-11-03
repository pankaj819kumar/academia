import React, { Component } from 'react';

class ResourceItem extends Component {
  render() {
    const { resource } = this.props;
    return (
      <div className="resource-item">
        <a href={resource.link} target="_blank" rel="noopener noreferrer">
          <div className='resource-name'>{resource.name}</div>
          <div className="resource-creator-box">
            <span>uploaded by</span> 
            <span className="resource-creator-name">
              {resource.creator_name}
            </span>
          </div>
        </a>
      </div>
    );
  }
}

export default ResourceItem;
