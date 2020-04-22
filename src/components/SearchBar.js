import React from 'react';

function SearchBar (props){
    return(
        <div>
        <input 
           placeholder={props.input}
           value={props.input}
           onChange={props.inputChangeHandler} />
        
        <button onClick={props.inputHandleSubmit}>Search</button>
        
        </div>
    )

    
}

export default SearchBar

//<button onClick={() => props.inputHandleSubmit(props.input)}>Search</button>