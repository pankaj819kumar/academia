import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SubjectItem extends Component {
  render() {
    const { subject } = this.props;
    // console.log('props in SubjectItem Comp', this.props);
    return (
      <div className="subject-item">
        <Link
          to={encodeURIComponent(subject.subject_name)}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <div className="subject-item-container">
            <div className="subject-name">{subject.subject_name}</div>
            <div className="subject-instructor">{subject.instructor}</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default SubjectItem;
