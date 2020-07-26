import React, {Component} from 'react';
import TextEntryArea from './TextEntryArea.jsx'
import {Container, Row, Col} from 'reactstrap'
import './Notifications.css';

class NotificationCard extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
            name: 'React',
            currentMessage: 0,
        };
        
              this.getCardStatus = this.getCardStatus.bind(this)
    }
    
    componentDidMount() {
   
    }
    
    getCardStatus(){
        if(this.props.selectedContact != this.props.messageLocation){
            return null
        }
        return (<div style={this.props.styles.NotificationStatus}>1</div>)
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
                 <Row>
                    <div onClick={()=>{this.props.setSelectedContact(this.props.messageLocation)}} style={this.props.selectedContact != this.props.messageLocation?this.props.styles.Notification:this.props.styles.SelectedNotification} 
                    className={"Notification"}> 
                        
                    <Row> 
                        <Col xs={8}>
                            <div style={{padding:'20px'}}>{this.props.getContactInfo(this.props.conversation[0].number + "")} 
                            </div>
                        </Col>
                        <Col xs={4}> 
                            {this.getCardStatus()}
                        </Col>
                    </Row>
                    </div>
                </Row> 
            </div>
        );
    }
}


export default NotificationCard;