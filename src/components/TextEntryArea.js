import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap'


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
        minWidth: '300px'
    };

        return (
             <div className="react">
               <Container>
               <Row fluid>
                <Col xs={12}>
                    <div style={divStyle}>
                        ↓ TextEntryArea Component ↓
                    </div>
                </Col>
               </Row>
                <Row>
                    <Col xs={9}/>
                    <Col xs={3} >
                        <div style={{border:'solid', height:'50px', margin: '10px'}}>
                            Put a send button component here?
                        </div>
                    </Col>
                </Row>
             </Container>
            </div>
        );
    }
}


export default TextEntryArea;