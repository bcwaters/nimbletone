import React, {Component} from 'react';
import {ThemeProvider} from '../../styles/StyleProvider.js'
import {Button} from 'semantic-ui-react'

class MenuButton extends Component {

    state = {
        themeName: 'MainTheme',

    }

    render() {
        return (
            <Button onClick={this.props.onClick} style={ThemeProvider.getCss(this.props.themeName).Button}>
                Add Random Theme
            </Button>

        );
    }
}


export default MenuButton