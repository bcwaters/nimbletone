import React, {Component} from 'react';
import TextEntryArea from './TextEntryArea.js'
import {Container, Row, Col} from 'reactstrap'

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
            width: '400px',
            padding: '30px'
        };

        return (
            <div className="react">
             ↓ Phone component↓
                <Container>
                <div style={divStyle}> 
                    <Row>
               <div style={{height: '300px',     border: 'solid',     width: '400px'}}> 
                        Maybe dialpad goes here?
                </div>
                    </Row>
                    <Row>
                        <TextEntryArea />  
                    </Row>
                 </div>
                </Container>
            </div>
        );
    }
}


export default Phone;