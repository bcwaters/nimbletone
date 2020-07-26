import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react'

class ThemeDropDown extends Component {

    state = {
        themeName: 'MainTheme',

    }


    render() {
        return (
            <Dropdown
                onChange={(e, data) => {
                    this.props.handleToggle(data.value)
                }}
                inline
                options={this.props.ThemeOptions}
                defaultValue={this.props.ThemeOptions[0].value}
            />

        );
    }
}


export default ThemeDropDown