//Step1
// import React from 'react';

// const Navigation = () => {
//     return (
//         <nav>
//             <p>Sign Out</p>
//         </nav>
//     );
// }
// export default Navigation;

//Step2
/*import React from 'react';

const Navigation = () => {
    return (
        <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <p>Sign Out</p>
        </nav>
    );
}
export default Navigation;
*/
//Step3
import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
   
    if (isSignedIn) {
        return(
            <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className = 'f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
               <p onClick={() => onRouteChange('signin')} className = 'f3 link dim black underline pa3 pointer'>Sign In</p>
               <p onClick={() => onRouteChange('register')} className = 'f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
            
        );
    }
   
}
export default Navigation;