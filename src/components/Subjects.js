import React, { Component } from 'react';
import { SubjectItem } from './index';

class Subjects extends Component {
  render() {
    return (
      <div className="subjects">
        <SubjectItem />
        <SubjectItem />
        <SubjectItem />
      </div>
    );
  }
}

export default Subjects;
