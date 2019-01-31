import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './css/Principal.css'


class P extends Component{
    constructor(props){
        super(props);
        this.noteContent= props.noteContent;
        this.noteId=props.noteId;
    }

    render(){
        return(         
            <div className="publicacion">
            <p className="p">{this.noteContent}</p>              
               </div>
        )
    }
}

P.protoTypes={
    noteContent: PropTypes.string
}
export default P;