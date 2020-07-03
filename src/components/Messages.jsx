import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap'
import TextEntryArea from './TextEntryArea.jsx'


class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'React',
            messages: [[{number:'CurrentContact'}]],
            currentMessage: 0
        };
    }
    
  componentDidMount() {

      
  }
    componentWillReceiveProps({someProp}) {
  this.setState({...this.state,someProp})
}

    render() {
        var receivedStyle = {
            borderRadius: '25px',
            background: '#73AD21',
            border: 'solid',
            padding: '20px',
            margin: '5px'
           
        }
             var sentStyle = {
            borderRadius: '25px',
            background: '#0095ff',
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
                <div style={{border: 'solid',   padding: '20px', background: '#ffcbc1'}}>{this.props.messages[this.props.selectedContact][0].number}</div>
                </Col>
                        <Col xs={4}>  
                        </Col>
                <Col xs={4}>     
                <div style={{border: 'solid',   padding: '20px', background: '#ccaa00'}}>Text a new number</div>
                </Col>
            </Row>
           <div style={{border: 'solid',   padding: '20px'}}>
            Converation
            {this.props.messages[this.props.selectedContact].map(msg => 
                (   
                    <Row>
                     {msg.eventType == 'sent'?<Col xs={3} > ------You--- </Col>:' '}
                        <Col xs={9}>
                        <div style={msg.eventType == 'sent'?sentStyle:receivedStyle} > {msg.msg} <br/></div>
                        </Col>
                        {msg.eventType != 'sent'?<Col xs={3} > ------{msg.number} --</Col>:' '}
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