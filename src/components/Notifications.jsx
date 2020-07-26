import React, {Component} from 'react';
import TextEntryArea from './TextEntryArea.jsx'
import {Container, Row, Col} from 'reactstrap'
import NotificationCard from './NotificationCard.jsx'
import './Notifications.css';

class Notifications extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
            name: 'React',
            currentMessage: 0,
        };
    }
    
  componentDidMount() {

      
  }
    
    componentWillReceiveProps(nextProps) {
    if (nextProps.selectedContact !== this.state.currentMessage) {console.log("update" + nextProps)
        this.setState({ currentMessage: nextProps.selectedContact });
    }
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
                                <NotificationCard conversation={conversation} messageLocation={messageLocation} setSelectedContact={this.props.setSelectedContact} styles={this.props.styles} selectedContact={this.props.selectedContact} getContactInfo={this.props.getContactInfo}></NotificationCard>
                        ))}
                    
           
                 </div>
                    
                </Container>
            </div>
        );
    }
}


export default Notifications;