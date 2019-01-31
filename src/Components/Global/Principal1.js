import React, {Component} from 'react';
import P from './P';
import './css/Principal.css';
import fire from './Config/Fire.js';

class Principal1 extends Component{
   
  constructor(props){
    super(props);
    this.app = fire;
    this.database = this.app.database().ref().child('notes');

    this.state = {
      notes: [],
    }
  }
  


  componentWillMount(){
    const previousNotes = this.state.notes;


    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }  

  render() {
    return (
      <div className="Contenido">
        <div className="publicaciones">
          {
            this.state.notes.map((note) => {
              return (
                <P noteContent={note.noteContent} 
                noteId={note.id} 
                key={note.id} />
              )
            })
          }
        </div>
      </div>
    );
  }
}
export default Principal1;