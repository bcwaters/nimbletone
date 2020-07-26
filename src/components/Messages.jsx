import React, {Component} from 'react';
import {Container, Row, Column, Grid} from 'semantic-ui-react'
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
          <Grid>
            <div style={this.props.styles.MessageContainer}>
            <Grid.Row> 
                <Grid.Column width={8}>      
                    <div style={this.props.styles.MessageContact}>
                        {'Contact: ' + this.props.getContactInfo(this.props.messages[this.props.selectedContact][0].number)}
                    </div>
                </Grid.Column>
           
                <Grid.Column width={4}>     
                </Grid.Column>
            </Grid.Row>
           <div style={this.props.styles.ConversationContainer}>
            Converation
            {this.props.messages[this.props.selectedContact].map(msg => 
                (   
                    <Grid.Row>
                     {msg.eventType == 'sent'?<Grid.Column width={3}> ---You--- </Grid.Column>:' '}
                        <Grid.Column width={9}>
                        <div style={msg.eventType == 'sent'? this.props.styles.SentMessageStyle:this.props.styles.ReceivedMessageStyle} > {msg.msg} <br/></div>
                        </Grid.Column>
                        {msg.eventType != 'sent'?<Grid.Column width={3} > ------{ this.props.getContactInfo(msg.number) } --</Grid.Column>:' '}
                    </Grid.Row>
            
                  
                    
                )
            )}
            </div>
                 <div style={{border: 'solid',   padding: '20px'}}>
                        Reply
                     <TextEntryArea/>
                     </div>
            </div>
          </Grid>
            </div>
        );
    }
    
}


export default Messages