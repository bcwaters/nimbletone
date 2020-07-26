import React, {Component} from 'react';
import {Container, Row, Grid, Column, Button,Input, Form} from 'semantic-ui-react'


class TextEntryArea extends Component {

    constructor() {
        super();
        this.state = {
            name: 'React'
        };
    }
    

    render() {
        

        return (
          
    <Form>
        <div style={this.props.styles.replyBox}>
            <Form.Field label='Reply' control='textarea' rows='3' />
            <Form.Field  control='button'>
                Send
            </Form.Field>   
        </div>
     </Form>
        );
    }
}


export default TextEntryArea;