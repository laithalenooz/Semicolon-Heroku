import React, {useContext, useEffect} from 'react';
import AuthContext from "../../context/auth/authContext";

const About = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            <h1>About This App</h1>
            <p className="my-1">
                This is a full stack React app for Socializing
            </p>
            <p className="bg-dark p">
                <strong>Version: </strong> 1.0.0
            </p>
        </div>
    );
};

export default About;
