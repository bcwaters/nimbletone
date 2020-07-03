import React, {Component} from 'react';
import {Container, Row, Col, Button,Input} from 'reactstrap'


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
        minWidth: '300px',
        margin: '5px'
    };

        return (
             <div className="react">
               <Container>
               <Row fluid>
                <Col xs={11}>
                    <div style={divStyle}>
                        ↓ TextEntryArea Component ↓
                  <Input type="textarea" name="text" id="exampleText" />
                    </div>
                </Col>
           
        
                    <Col xs={1} >
                    <Row><br/><br/><br/><br/><br/></Row>     
      
                    <Row>
                        <Button color="primary" size="sm">Send</Button>
                    </Row>
                    </Col>
                </Row>
             </Container>
            </div>
        );
    }
}


export default TextEntryArea;