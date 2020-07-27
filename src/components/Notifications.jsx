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
            unreadMessages : []
        };
        
        this.onTextReceived = this.onTextReceived.bind(this)
        this.addMessageState = this.addMessageState.bind(this)
        this.markMessageRead = this.markMessageRead.bind(this)
        this.markMessageUnread = this.markMessageUnread.bind(this)
    }
    
  componentDidMount() {
        this.props.onTextRecievedHandler(this.onTextReceived)
        //TODO ugly and lazy way of prepping notification state
        this.props.messages.map(() => {this.addMessageState()})
      
  }
    
    onTextReceived(data){
    var newState = this.state.unreadMessages
      this.props.messages.map( (msg, loc) => {
          if(msg[0].number == data.number){
                newState[loc] = true
          }
        }
      
      )
      
      this.setState({ unreadMessages: newState });
    }
    
    addMessageState(){
         this.setState(state => {
                unreadMessages: this.state.unreadMessages.concat([false])
        });
    }
    
      markMessageRead(location){
            let newState = this.state.unreadMessages
            newState[location] = false
         
          this.setState(state => {
                unreadMessages:newState
            });
    }
    
        markMessageUnread(location){
            let newState = this.state.unreadMessages
            newState[location] = true
         
          this.setState(state => {
                unreadMessages:newState
            });
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
                               
                                <NotificationCard   conversation={conversation} 
                                                    messageLocation={messageLocation} 
                                                    setSelectedContact={this.props.setSelectedContact} 
                                                    styles={this.props.styles} 
                                                    selectedContact={this.props.selectedContact} 
                                                    getContactInfo={this.props.getContactInfo} 
                                                    shouldNotify={this.state.unreadMessages[messageLocation]} >
                                </NotificationCard>
                        ))}
                    
                </Grid>
                 </div>
                    
      
        
        );
    }
}


export default Notifications;