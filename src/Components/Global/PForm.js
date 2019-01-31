import React, { Component } from 'react';
import './css/Principal.css';
class PForm extends Component {

    constructor(props){
        super(props);
        this.state={
            newNoteContent:'',
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }
    handleUserInput(e){
        this.setState({
             newNoteContent: e.target.value,

        })
    }

    writeNote(){

        var nombre = localStorage.getItem("nombre");
        this.props.addNote(nombre + " escribió:  " + this.state.newNoteContent);
        this.setState({
            newNoteContent:'',
        })
    }

    
    render(){
        return(
            <div className="add1">
                <input className="Input" placeholder="Escribe en el muro..." value={this.state.newNoteContent} onChange={this.handleUserInput}></input> 
                <button className="Button" onClick={this.writeNote}>Add Post</button>
            </div>
            
        )
    }

}

export default PForm;