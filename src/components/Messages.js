import React, {Component} from 'react';


class Messages extends Component {

    constructor() {
        super();
        this.state = {
            name: 'React'
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
        return (
            <div className="react">
          
          {JSON.stringify(this.state.messages)}

            </div>
        );
    }
}


export default Messages