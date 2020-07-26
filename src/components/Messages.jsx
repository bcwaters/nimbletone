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
         
                  <div style={this.props.styles.MessageContainer}>
          <Grid>
          
            <Grid.Row style={{paddingBottom: '0px'}}> 
                <Grid.Column >      
                    <div style={this.props.styles.MessageContact}>
                        {this.props.getContactInfo(this.props.messages[this.props.selectedContact][0].number)}
                    </div>
                </Grid.Column>
            </Grid.Row>
              
            <Grid.Row style={{paddingTop: '0px',paddingBottom: '0px'}}> 
                <Grid.Column  >  
                   <div style={this.props.styles.ConversationContainer}>
                 <Grid >
  
                
            {this.props.messages[this.props.selectedContact].map(msg => 
                (   
                   
                    <Grid.Row >   
                        {msg.eventType == 'sent'?<Grid.Column style={{padding: '0px'}} width={2} textAlign={'center'} verticalAlign={'middle'}><div style={this.props.styles.SenderFont}> You  </div></Grid.Column>:' '}
                        <Grid.Column style={{padding: '0px'}} width={14}>
                        <div style={msg.eventType == 'sent'? this.props.styles.SentMessageStyle:this.props.styles.ReceivedMessageStyle} > {msg.msg} <br/></div>
                        </Grid.Column>
                         {msg.eventType != 'sent'?<Grid.Column style={{padding: '0px'}} width={2} textAlign={'center'} verticalAlign={'middle'}> <div style={this.props.styles.SenderFont}> { this.props.getContactInfo(msg.number) } </div></Grid.Column>:' '}
                    
                   
                    </Grid.Row > 
                  
                    
                )
            )}
                   </Grid>
              </div>
                </Grid.Column> 
            </Grid.Row> 
         
                <Grid.Row style={{paddingTop: '0px'}} >
                         <Grid.Column>
                    <div style={{border: 'solid 1px ', padding: '20px'}}>
                        <TextEntryArea styles={this.props.styles}/>
                    </div>
                             </Grid.Column>
                </Grid.Row>
                   
               
       
          </Grid>
                    </div>
         
        );
    }
    
}


export default Messages