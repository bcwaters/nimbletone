import React, {Component} from 'react';
import TextEntryArea from './TextEntryArea.jsx'
import {Container, Row, Col} from 'reactstrap'
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

                                <Row>
                                    <div onClick={()=>{this.props.setSelectedContact(messageLocation)}} style={this.state.currentMessage != messageLocation?this.props.styles.Notification:this.props.styles.SelectedNotification} 
                                    className={"Notification"}> 
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