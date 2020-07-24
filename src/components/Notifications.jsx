import React, {Component} from 'react';
import TextEntryArea from './TextEntryArea.jsx'
import {Container, Row, Col} from 'reactstrap'
import './Notifications.css';

class Notifications extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
            name: 'React',
        };
    }
    
  componentDidMount() {

      
  }
    
    
    
    
//TODO this mapping should use another component ContactNotification
    render() {
        var divStyle = {
            border: 'solid',
            padding: '30px'
        };

        return (
            <div className="react">
           
                <Container>
                    
                <div style={this.props.styles.NotificationContainer}> 
                    {this.props.messages.map(
        
                        (conversation,messageLocation) => ( 

                                <Row>
                                    <div onClick={()=>{this.props.setSelectedContact(messageLocation)}} style={this.props.styles.Notification} className={"Notification"}> 
                                    Contact: {conversation[0].number}
                                    </div>
                                </Row>
                        ))}
                    
           
                 </div>
                    
                </Container>
            </div>
        );
    }
}


export default Notifications;