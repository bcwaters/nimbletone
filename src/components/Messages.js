import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap'
import TextEntryArea from './TextEntryArea.js'


class Messages extends Component {

    constructor() {
        super();
        this.state = {
            name: 'React',
            messages: []
        };
    }
    
  componentDidMount() {
    fetch("/v1/messages")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            messages: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      
  }
    

    render() {
        var divStyle = {
            border: 'solid',
            padding: '20px',
            margin: '5px'
           
        }
        
        return (
            <div className="react">
          <Container>
            <div style={{border: 'solid',   padding: '20px'}}>
            <Row> 
                <Col xs={4}>      
                <div style={{border: 'solid',   padding: '20px'}}>Selected Contact Name</div>
                </Col>
                <Col fluid>     
                <div style={{border: 'solid',   padding: '20px'}}>select current contact dropdown</div>
                </Col>
            </Row>
           <div style={{border: 'solid',   padding: '20px'}}>
            Converation
            {this.state.messages.map(msg => 
                (   
                    <Row>
                     {msg.number == '9288888420'?<Col xs={3} / >:' '}
                        <Col xs={9}>
                        <div style={divStyle} > {msg.number + ': ' + msg.msg} <br/></div>
                        </Col>
                        {msg.number != '9288888420'?<Col xs={3} / >:' '}
                    </Row>
            
                  
                    
                )
            )}
            </div>
                 <div style={{border: 'solid',   padding: '20px'}}>
                        Reply
                     <TextEntryArea/>
                     </div>
            </div>
          </Container>
            </div>
        );
    }
    
}


export default Messages