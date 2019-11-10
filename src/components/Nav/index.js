import React from 'react';
import './nav.scss';

const Nav = ({onRouteChange, isSignedIn}) => {
        if (isSignedIn) {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signout')} className='f3 link dim underline pa3 pointer'>Uitloggen</p>
                </nav>
            );
        } else {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim underline pa3 pointer'>Inloggen</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim underline pa3 pointer'>Registreren</p>
                </nav>
            );
        }
}

export default Nav;