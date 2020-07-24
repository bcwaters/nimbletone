import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap'
import TextEntryArea from './TextEntryArea.jsx'

//TODO rename to conversation
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


    render() {
        
        return (
            <div className="react">
          <Container>
            <div style={this.props.styles.MessageContainer}>
            <Row> 
                <Col xs={8}>      
                    <div style={this.props.styles.MessageContact}>
                        {'Contact: ' + this.props.messages[this.props.selectedContact][0].number}
                    </div>
                </Col>
           
                <Col xs={4}>     
                </Col>
            </Row>
           <div style={this.props.styles.ConversationContainer}>
            Converation
            {this.props.messages[this.props.selectedContact].map(msg => 
                (   
                    <Row>
                     {msg.eventType == 'sent'?<Col xs={3}> -----You--- </Col>:' '}
                        <Col xs={9}>
                        <div style={msg.eventType == 'sent'? this.props.styles.SentMessageStyle:this.props.styles.ReceivedMessageStyle} > {msg.msg} <br/></div>
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