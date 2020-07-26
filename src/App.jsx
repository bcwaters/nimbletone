import React, { Component} from "react";
import Notifications from './components/Notifications.jsx'
import Messages from './components/Messages.jsx'
import TopNavBar from './components/TopNavBar/TopNavBar.jsx'
import {Container, Grid, Row, Column} from 'semantic-ui-react'
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
            styles: ThemeProvider.getCss("MainTheme"),
            AppColor: ThemeProvider.getDefaultColor(),
            
        };
            this.setSelectedContact = this.setSelectedContact.bind(this)
            this.getContactInfo = this.getContactInfo.bind(this)
    }
    
       setTheme = (themeName) => {

        this.setState({
            styles: ThemeProvider.getCss(themeName),
            AppColor: ThemeProvider.getThemeColor(themeName)
        })
        console.log("theme set to: " + themeName)
        document.head.getElementsByTagName("style")[0].innerText = 'body{background-color: ' + ThemeProvider.getThemeColor(themeName).backgroundColor + '}'
    }
    
    setSelectedContact(messageLocation){
        this.setState({currentMessage:messageLocation})
    }
    
    //Hardcoded contact list... not very private. Move to a database solution later
    getContactInfo(phoneNumber){
        var contactList = {
            '+14806000995': "Mitch",
            '+19288888420': "Me",
            '+14802837963': "Chris I",
            '+14803236056': "Eric G"
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

 document.head.getElementsByTagName("style")[0].innerText = 'body{background-color: ' + ThemeProvider.getThemeColor("MainTheme").backgroundColor + '}'
        
        return(
    <div className="App"> 
                <TopNavBar styles={this.state.styles} setTheme={this.setTheme}></TopNavBar>
                <div style={{margin:'20px'}}>
                        </div>
                
    <Grid  >
        <Grid.Row>
            <Grid.Column width={1} ></Grid.Column>
            <Grid.Column width={3} >
                <Notifications getContactInfo={this.getContactInfo} setSelectedContact={this.setSelectedContact} selectedContact={this.state.currentMessage} messages={this.state.messages} styles={this.state.styles}/>
            </Grid.Column >
            <Grid.Column width={6}> 
                <Messages getContactInfo={this.getContactInfo} selectedContact={this.state.currentMessage} messages={this.state.messages} styles={this.state.styles}/>    
            </Grid.Column>
        </Grid.Row>
    </Grid>
    </div>
    );
  }
}

export default App;