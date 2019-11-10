import React from 'react';
import './ImageLinkForm.scss';

const ImageLinkForm = ({ onInputChange, btnClick }) => {
    return (
        <div>
            <p className='f3'>
                {'Deze magische app detecteert gezichten in je foto. Probeer maar.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input onChange={onInputChange} className='f4 pa2 w-70 center' type="text" />
                    <button 
                        onClick={btnClick} 
                        style={{border: 'none'}} 
                        className='w-30 grow f4 link ph3 pv2 dib bg-light-blue'>
                    Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;