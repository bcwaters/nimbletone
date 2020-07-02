import React, {Component} from 'react';


class Messages extends Component {

    constructor() {
        super();
        this.state = {
            name: 'React',
            messages: []
        };
    }
    
  componentDidMount() {
    fetch("/v1/messages")
      .then(res => res.json())
      .then(
        (result) => {
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
        }
      )
  }
    

    render() {
        var divStyle = {
            border: 'solid',
            padding: '20px'
           
        }
        
        return (
            <div className="react">
          
            {this.state.messages.map(msg => 
                (
                    <div style={divStyle}> {msg} <br/></div>
                )
            )}

            </div>
        );
    }
    
}


export default Messages