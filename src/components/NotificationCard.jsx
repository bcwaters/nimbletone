import React, {Component} from 'react';
import TextEntryArea from './TextEntryArea.jsx'
import {Container, Grid, Row, Column} from 'semantic-ui-react'


class NotificationCard extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
            name: 'React',
            currentMessage: 0,
            unread: false
        };
        
              this.getCardStatus = this.getCardStatus.bind(this)
    }
    
    componentDidMount() {
   
    }
    
    getCardStatus(){
        if(this.props.shouldNotify.phoneNumber != this.props.conversation[0].number){
            return null
        }else{
        return (<span style={this.props.styles.NotificationStatus}>★</span>)
        }
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
      
           
                <Container>
                    <div onClick={()=>{this.props.setSelectedContact(this.props.messageLocation)}} style={this.props.selectedContact != this.props.messageLocation?this.props.styles.Notification:this.props.styles.SelectedNotification} 
                    className={"Notification"}> 
                        
                    <Grid.Row> 
                            <span style={{paddingLeft:'20px', paddingTop:'10px', marginRight:'5px'}}>{this.props.getContactInfo(this.props.conversation[0].number + "")} 
                            </span>

                            {this.getCardStatus()}
        
                    </Grid.Row>
                    </div>
                    </Container>
             

  
        );
    }
}


export default NotificationCard;