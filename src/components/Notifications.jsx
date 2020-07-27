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
            unreadMessages : {}
        };
        
        this.onTextReceived = this.onTextReceived.bind(this)
    }
    
  componentDidMount() {
        this.props.onTextRecievedHandler(this.onTextReceived)
      
  }
    
    onTextReceived(data){
        console.log(data)
      this.setState({ unreadMessages: data });
    }
    
    

    componentWillReceiveProps(nextProps) {
    if (nextProps.selectedContact !== this.state.currentMessage) {
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

        
                    
                <div style={this.props.styles.NotificationContainer}> 
                <Grid style={{marginTop:'0px', marginBottom: '20px'}} textAlign={'center'} verticalAlign={'middle'}>
                    <Grid.Row style={this.props.styles.NotificationHeader}>
                        <div >Contacts</div>
                    </Grid.Row>
                    {this.props.messages.map(
        
                        (conversation,messageLocation) => ( 
                                <NotificationCard conversation={conversation} messageLocation={messageLocation} setSelectedContact={this.props.setSelectedContact} styles={this.props.styles} selectedContact={this.props.selectedContact} getContactInfo={this.props.getContactInfo} shouldNotify={this.state.unreadMessages}></NotificationCard>
                        ))}
                    
                </Grid>
                 </div>
                    
      
        
        );
    }
}


export default Notifications;