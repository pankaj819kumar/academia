import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubjectItem } from './index';

class Subjects extends Component {
  render() {
    const { subjects } = this.props;
    // console.log('props in Subjects Comp', this.props);
    return (
      <div className="subjects">
        {subjects.map((subject) => (
          <SubjectItem subject={subject} key={ ""} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subjects: state.subjects,
  };
}

// App.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default connect(mapStateToProps)(Subjects);
