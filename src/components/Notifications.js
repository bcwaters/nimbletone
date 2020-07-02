import React, {Component} from 'react';
import TextEntryArea from './TextEntryArea.js'
import {Container, Row, Col} from 'reactstrap'

class Notifications extends Component {

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
           
                <Container>
                <div style={divStyle}> 
                    <Row>
                        <div style={{height: '100px',     border: 'solid',     width: '400px'}}> 
                      
                        </div>
                    </Row>
                    <Row>
             
                    </Row>
                    <Row>
                  
                    </Row>
            
                 </div>
                </Container>
            </div>
        );
    }
}


export default Notifications;