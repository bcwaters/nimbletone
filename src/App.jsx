import React, { Component} from "react";
import Notifications from './components/Notifications.jsx'
import Messages from './components/Messages.jsx'
import {Container, Row, Col} from 'reactstrap'
import "./App.css";
import {ThemeProvider} from './styles/StyleProvider.js'

//Primary colors for design https://paletton.com/#uid=52Q0u0kllllaFw0g0qFqFg0w0aF

class App extends Component{
  
    //TODO The app should make an intitial call to the DB to load in contacts and settings to pass down
  
      constructor(props) {
        super(props);

        this.state = {
            name: 'React',
            currentMessage: 0,
            messages: [[   {timestamp: '12:00 7-29-20', number: '6504768039', msg:'1st Message', eventType: 'received'}]],
            styles: ThemeProvider.getCss("TestTheme"),
            AppColor: ThemeProvider.getDefaultColor(),
            
        };
            this.setSelectedContact = this.setSelectedContact.bind(this)
          this.getContactInfo = this.getContactInfo.bind(this)
    }
    
    setSelectedContact(messageLocation){
        this.setState({currentMessage:messageLocation})
    }
    
    //Hardcoded contact list... not very private. Move to a database solution later
    getContactInfo(phoneNumber){
        var contactList = {
            '+14806000995': "Mitch",
            '+19288888420': "Me",
            '+14802837963': "Chris I"
        }
   
        return !!contactList[""+phoneNumber]?contactList[""+phoneNumber]:phoneNumber
    }
    
    //TODO add navbar and foot
      componentDidMount() {
        fetch("/v1/messages")
      .then(res => res.json())
      .then(
        (result) => {
            console.log("fetched success")
            console.log(result)
          this.setState({
            isLoaded: true,
            messages: result
            
          });
            
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {   
          this.setState({
            isLoaded: true,
            error
          });
        })
      }
    
    
    render(){

        return(
    <div className="App">
    <Container fluid>
        <Row>
            <Col xs={3}> ↓ Notifications component↓ <br/> 
                <Notifications getContactInfo={this.getContactInfo} setSelectedContact={this.setSelectedContact} selectedContact={this.state.currentMessage} messages={this.state.messages} styles={this.state.styles}/>
            </Col>
            <Col xs={6}>   ↓ Messages component↓ <br/> 
                <Messages getContactInfo={this.getContactInfo} selectedContact={this.state.currentMessage} messages={this.state.messages} styles={this.state.styles}/>    
            </Col>
        </Row>
    </Container>
    </div>
    );
  }
}

export default App;