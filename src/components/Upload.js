import React, { Component } from 'react';

class Upload extends Component {
    render() {
        return (
            <div className='upload'>
                <h1>Upload File</h1>
                <input type="file" name="" id="filepicker" />
            </div>
        );
    }
}

export default Upload;