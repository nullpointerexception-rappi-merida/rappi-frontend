import React from 'react';

function Input({ className, placeholder, value, onChange, type, name, label, required}){
    return(
   
            <input type={type} 
            placeholder={placeholder}
            name={name}
            value={value}
            className={className}
            onChange={onChange} 
            required={required} />
  
    );
}

export default Input;