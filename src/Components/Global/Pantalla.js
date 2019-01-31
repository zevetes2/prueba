import React, { Component } from 'react';
import fire from './Config/Fire.js';
import './css/Pantalla.css'; 
import Header from './Header';
import Login from './Login';
import Principal from './Principal';
import Bienvenida from './Bienvenida.js';
import Principal1 from './Principal1.js';

class Pantalla extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:{},
        }
    }

    componentDidMount(){
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            //console.log(user);
            if(user){
                this.setState({user});
            }
            else{
                this.setState({user:null});
            }
        });
    }
    render(){
        return(
            <div className="Principal">
                <div className="Main">
                    <Header/>
                    {this.state.user ? (<Bienvenida/>) : (<Login/>)}
                    {this.state.user ? (<Principal/>) : (<Principal1/>)}
                </div>
          </div>
        );
    }

}
export default Pantalla;