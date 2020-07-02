import React, {Component} from 'react';


class TextEntryArea extends Component {

    constructor() {
        super();
        this.state = {
            name: 'React'
        };
    }
    

    render() {
            var divStyle = {
        border: 'solid',
        height: '150px',
        width: '300px'
    };

        return (
            <div className="react">
          
             ↓ TextEntryArea Component ↓
                <div style={divStyle}>
                 
                </div>

            </div>
        );
    }
}


export default TextEntryArea;