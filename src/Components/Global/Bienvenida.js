import React, { Component } from 'react';
import './css/Login.css'
import fire from './Config/Fire.js';

class Bienvenida extends Component {
    constructor(props){
        super(props);
        this.state = {
                
            username:localStorage.getItem("usuario"),
            nombre:localStorage.getItem("nombre"),
            apellido:localStorage.getItem("apellido")
        };
        var a = localStorage.getItem("usuario");
        this.logout = this.logout.bind(this);
        this.recargar = this.recargar.bind(this);
    }
    recargar(){
        window.location.reload();
    }
    logout(){        
        localStorage.clear();
        fire.auth().signOut();
    }
    
    render(){
        return(
            <div className="Login">
                <h1>Bienvenido</h1>
                <h4 className="Informacion">{this.state.nombre} {this.state.apellido}</h4>
                <center><button id="L_btn_r" onClick={this.recargar} className="btn1" type="button">Mostrar Datos</button>
                <button id="L_btn_agregar" onClick={this.logout} className="btn1" type="button">Salir</button></center>
            </div>
        );
    }
}
export default Bienvenida;