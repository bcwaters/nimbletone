import React, {Component} from 'react';
import TextEntryArea from './TextEntryArea.jsx'
import {Container, Grid, Row, Column} from 'semantic-ui-react'
import NotificationCard from './NotificationCard.jsx'


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
        
                    
                <div style={this.props.styles.NotificationContainer}> 
        
                    {this.props.messages.map(
        
                        (conversation,messageLocation) => ( 
                                <NotificationCard conversation={conversation} messageLocation={messageLocation} setSelectedContact={this.props.setSelectedContact} styles={this.props.styles} selectedContact={this.props.selectedContact} getContactInfo={this.props.getContactInfo}></NotificationCard>
                        ))}
                    
         
                 </div>
                    
      
            </div>
        );
    }
}


export default Notifications;