import React, { Component } from 'react';
import './css/Login.css'
import fire from './Config/Fire.js';

const ocultar = {
    display:'none'
};

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            
            l_username:'',
            l_contrasena:'',
            s_username:'',
            s_contrasena:'',
            s_nombre:'',
            s_apellido:''
        };
        this.singup = this.singup.bind(this);
        this.login = this.login.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    borrar = () =>{
    
        this.refs.s_apellido.value = '';
        this.refs.s_nombre.value = '';
        this.refs.s_username.value ='';
        this.refs.s_contrasena.value = '';
        this.refs.l_username.value = '';
        this.refs.l_contrasena.value = '';
              
    }   
    buscardatos = (usuario) =>{
        var cont = 0;
        var userRef = fire.database().ref();
        var userQuery = userRef.child(usuario);
        userQuery.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            if(child.key === "nombre"){
                localStorage.setItem("nombre",child.val());     
            }
            else if(child.key === "apellido"){
                localStorage.setItem("apellido",child.val());
            }

        });    
    });
    }

    login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.l_username, this.state.l_contrasena)
        .then((u)=>{
            this.buscardatos(this.usernuevo(this.refs.l_username.value));
            var usuario = this.refs.l_username.value;
            var user = this.usernuevo(usuario);
            localStorage.setItem("usuario",user);
            this.borrar();

        }).catch((error)=>{
            this.borrar();
            alert("Usuario incorecto o Contraseña incorrecta");
            
        });
    }
    singup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.s_username, this.state.s_contrasena)
        .then((u)=>{
            var usuario = (this.refs.s_username.value);
            var user = this.usernuevo(usuario);
            this.agregar_usuario(this.usernuevo(usuario));
            localStorage.clear();
            localStorage.setItem("usuario",user);
            this.buscardatos(user);
            this.borrar();
        })
        .catch((error)=>{
            
            alert(error);
        })            
    }
    //// Funciones /////
     usernuevo = function(usuario){
        var nuevo = "";
        var i =0;
        for(i=0;i<usuario.length;i++){
            if(usuario[i]=='@'){
                break;
            }
            else{
                nuevo = nuevo + usuario[i];
            }
        }
        return nuevo;
    }
    
    agregar_usuario = (usuario) => {    
        fire.database().ref(usuario).set(
            {
                username: this.state.s_username,
                contrasena: this.state.s_contrasena,
                nombre: this.state.s_nombre,
                apellido: this.state.s_apellido,
            }
        ).then(() =>{
            localStorage.setItem("usuario",usuario);
            console.log('Insertado');
        }).catch((error) =>{
            console.log(error)
        });
        this.borrar();
    }
    handleChange(e){
        this.setState({ [e.target.id]: e.target.value});
    }    

    handleClick(e){
        if(e.target.id === "L_link"){
            document.getElementById('Registrarse').style.display = 'block';
            document.getElementById('Login').style.display = 'none';
        }
        else if(e.target.id === "L_link1"){
            document.getElementById('Registrarse').style.display = 'none';
            document.getElementById('Login').style.display = 'block';
        }

    }

    render(){
        return(
            <div className="Login">
                <form className="formulario" id="Login">
                    <center><h1>Login</h1></center>
                    <h4>Username: </h4>
                    <input ref="l_username" values={this.state.l_username} onChange={this.handleChange} type="text" className="txt" id="l_username"/>
                    <h4>Contraseña </h4>
                    <input ref="l_contrasena" type="password" values={this.state.l_contrasena} onChange={this.handleChange} className="txt" id="l_contrasena"/>
                    <center><button id="l_agregar" onClick={this.login} className="btn1" type="button">Entrar</button>
                    <a className="link" id="L_link" onClick={this.handleClick}>Registrarse</a></center>
                </form>
                <form className="formulario" id="Registrarse" style={ocultar}>
                     <center><h1>Registrarse</h1></center>
                    <h4>Nombres: </h4>
                    <input ref="s_nombre" value= {this.state.s_nombre} onChange={this.handleChange} type="text" className="txt" id="s_nombre"/>
                    <h4>Apellidos: </h4>
                    <input ref="s_apellido" value= {this.state.s_apellido} onChange={this.handleChange} type="text" className="txt" id="s_apellido"/>
                    <h4>Username: </h4>
                    <input ref="s_username" value= {this.state.s_username} onChange={this.handleChange} type="text" className="txt" id="s_username"/>
                    <h4>Contraseña: </h4>
                    <input type="password" ref="s_contrasena" value= {this.state.s_contrasena} onChange={this.handleChange}  className="txt" id="s_contrasena"/>
                    <center><button id="s_agregar" onClick={this.singup} className="btn1" type="button">Agregar</button>
                    <button id="s_limpiar" onClick="" className="btn1" type="button">Limpiar</button>
                    <a className="link" id="L_link1" onClick={this.handleClick}>Login</a></center>
                </form>
            </div>
        );
    }

}

export default Login;