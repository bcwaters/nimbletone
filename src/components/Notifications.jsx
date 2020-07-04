import React, {Component} from 'react';
import TextEntryArea from './TextEntryArea.jsx'
import {Container, Row, Col} from 'reactstrap'

class Notifications extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
            name: 'React',
        };
    }
    
  componentDidMount() {

      
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
                    
                <div style={divStyle}> 
                    {console.log( this.props.messages) }
                    {this.props.messages.map(
                        
                        (conversation,messageLocation) => ( 

                                <Row>
                                    <div onClick={()=>{this.props.setSelectedContact(messageLocation)}} style={{height: '100px',     border: 'solid',     width: '400px'}}> 
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