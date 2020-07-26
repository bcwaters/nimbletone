import React, {Component} from 'react';
import {Container, Row, Grid, Column, Button,Input} from 'semantic-ui-react'


class TextEntryArea extends Component {

    constructor() {
        super();
        this.state = {
            name: 'React'
        };
    }
    

    render() {
            var divStyle = {
        border: 'solid',
        height: '150px',
        minWidth: '300px',
        margin: '5px'
    };

        return (
             <div className="react">
               <Grid>
               <Grid.Row fluid>
                <Grid.Column width={11}>
                    <div style={divStyle}>
                        ↓ TextEntryArea Component ↓
                  <Input type="textarea" name="text" id="exampleText" />
                    </div>
                </Grid.Column>
           
        
                    <Grid.Column width={1} >
                    <Grid.Row><br/><br/><br/><br/><br/></Grid.Row>     
      
                    <Grid.Row>
                        <Button color="primary" size="sm">Send</Button>
                    </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
             </Grid>
            </div>
        );
    }
}


export default TextEntryArea;