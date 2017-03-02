import React, { Component,PropTypes } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import * as MUI from 'material-ui'
import AppTheme from '../../app-theme';
import Navigation from '../Navigation/Navigation'
import { connect } from 'react-redux';

import AuthActions from '../../store/actions/authActions'

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
    };
}
/*
function mapDispatchToProps(dispatch) {
    return {
        fetchMovie: (id) => dispatch(MovieActions.fetchMovie(id))
    };
}
*/

class App extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(){
    super();
    
    this.state = {
      drawerOpen : false
    }
  }

  componentWillMount() {
    if(this.props.isAuthenticated){
      console.log("Authenticated");
    }
    else {
      console.log("Not Authenticated");
      //Uncomment it and it will move to login page if not authenticated
      this.context.router.push("/login");
    }
    
  }

  handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});
  render() {

    // User for resizing center view and header
    //let { drawerOpen } = this.state;
    //const paddingLeftDrawerOpen = 280;

    const styles = {
      header: {
        // User for resizing center view and header
        //paddingLeft: drawerOpen ? paddingLeftDrawerOpen : 20
      },
      container: {
        // User for resizing center view and header
        margin: '20px 20px 20px 15px',
        //paddingLeft: drawerOpen ? paddingLeftDrawerOpen : 0
      }
    };

    return (
      <MuiThemeProvider muiTheme={AppTheme}>
        <div className="app">
        <Navigation styles={styles.header} drawerOpen={this.state.drawerOpen} drawerToggle={this.handleDrawerToggle.bind(this)}/>
        <div className="app-childs" style={styles.container}>
          {this.props.children}
        </div>
        </div>
      </MuiThemeProvider>
      
    );
  }
}

//export default App;
//export default connect(mapStateToProps,mapDispatchToProps)(App)
export default connect(mapStateToProps)(App)
