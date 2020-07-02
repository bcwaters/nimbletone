import React, {Component} from 'react';
import TextEntryArea from './TextEntryArea.js'

class Phone extends Component {

    constructor() {
        super();
        this.state = {
            name: 'React'
        };
    }
    

    render() {
            var divStyle = {
        border: 'solid',
        height: '600px',
        width: '400px'
    };

        return (
            <div className="react">
             ↓ Phone component↓
                <div style={divStyle}>
                 
            
            <TextEntryArea />   
                </div>

            </div>
        );
    }
}


export default Phone;