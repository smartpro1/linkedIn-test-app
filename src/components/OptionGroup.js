import React from 'react'

export default function OptionGroup({handleChange, option, index}) {
    const id = `option-${index}`;
    const {correct, value} = option;
    return (
        <div className="option-group">
        <input 
           type="radio"
           className="radio-buttons" 
           name="options"
           id={id} 
           value={value}
           onChange={handleChange}
           correct={correct.toString()}
           data-correct={correct}
         />
        <label htmlFor="option-1">{option.value}</label>
      </div>
    )
}
