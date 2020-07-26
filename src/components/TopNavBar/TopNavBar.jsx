import React, {Component} from 'react';
import {Menu, Visibility,} from 'semantic-ui-react'
import {ThemeProvider} from '../../styles/StyleProvider.js'
import ThemeDropDown from './ThemeDropDown.jsx'
import MenuButton from './MenuButton.jsx'

const AppColors = ThemeProvider.getThemeColor('MainTheme')

class TopNavBar extends Component {

    state = {
        menuStyle: {background: AppColors.secondary},
        themeColors: ThemeProvider.getThemeColor('MainTheme'),
        themeName: 'MainTheme',
        ThemeOptions: [
            {
                key: 'MainTheme',
                text: 'MainTheme',
                value: 'MainTheme',
            },
            {
                key: 'TestTheme',
                text: 'TestTheme',
                value: 'TestTheme',

            },
            {
                key: 'SpaceTheme',
                text: 'SpaceTheme',
                value: 'SpaceTheme',
            }
        ]
    }

    hideFixedMenu = () => this.setState({
        fixed: false,
        menuStyle: {background: this.state.themeColors.secondary}
    })

    showFixedMenu = () => this.setState({
        fixed: true,
        menuStyle: {background: this.state.themeColors.secondaryDark}
    })

    addTheme = () => {

        let randomName = 'theme' + (Math.random() * 0xFFF << 0).toString(16)
        ThemeProvider.addColorTheme({
            primary: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            primaryLight: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            primaryDark: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            secondary: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            secondaryLight: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            secondaryDark: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            accent: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            accentLight: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            accentDark: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            backgroundColor: '#ffffe0'
        }, randomName)
        this.setState((prevState) => {
            return {
                ThemeOptions: [...prevState.ThemeOptions,
                    {
                        key: randomName,
                        text: randomName,
                        value: randomName
                    }]
            }
        })
        this.handleToggleTheme(randomName)
    }


    handleItemClick = (e, {name, to}) => {
        console.log('clcik' + 'name' + 'to: ' + to)
        this.setState({activeItem: name})
        if (to != null) {
            this.props.history.push({pathname: to});
        }
    }

    handleToggleTheme = (themeName) => {
        this.props.setTheme(themeName)
        ThemeProvider.currentColorTheme = themeName
        console.log("result clicked")
        let fixedState = this.state.fixed ? "secondaryDark" : "secondary"
        this.setState((prevState, props) => {
                return {
                    themeColors: ThemeProvider.getThemeColor(themeName),
                    themeName: themeName,
                    menuStyle: {background: ThemeProvider.getThemeColor(themeName)[fixedState]}
                }
            }
        )

        //
        this.forceUpdate();

    }

    render() {
        const {activeItem} = this.state
        const {fixed} = this.state

        return (
        
                  <header>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >

                    <Menu style={this.state.menuStyle}
                          fixed={fixed ? 'top' : null}
                          inverted={true}
                          pointing={!fixed}
                          secondary={true}
                          size='large'>
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} to='/'/>
                        <Menu.Item
                            name='shop'
                            to='/shop'
                            active={activeItem === 'shop'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            children={< ThemeDropDown ThemeOptions={this.state.ThemeOptions}
                                                      handleToggle={this.handleToggleTheme}/>}
                        />
                        <Menu.Item
                            children={<MenuButton onClick={this.addTheme} themeName={this.state.themeName}/>}
                        />

                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='logout'
                                active={activeItem === 'logout'}
                                onClick={this.handleItemClick}
                            />
                        </Menu.Menu>


                    </Menu>

                </Visibility>
            </header>
      
        );
    }
}


export default TopNavBar;