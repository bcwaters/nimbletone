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
    

    render() {
        var divStyle = {
            border: 'solid',
            height: '600px',
            width: '400px',
            padding: '30px'
        };

        return (
            <div className="react">
           
                <Container>
                    
                <div style={divStyle}> 
                    {this.props.messages.map((msgGroup,messageLocation) => ( 
                        <Row>
                        <div onClick={()=>{this.props.setSelectedContact(messageLocation)}} style={{height: '100px',     border: 'solid',     width: '400px'}}> 
                            Contact: {msgGroup[0].number}
                        </div>
                        </Row>
                     )
                    )}
                   
        
            
                 </div>
                </Container>
            </div>
        );
    }
}


export default Notifications;