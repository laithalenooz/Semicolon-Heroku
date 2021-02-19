import React, {useContext, useEffect} from 'react';
import Posts from "../posts/Posts";
import PostForm from "../posts/PostForm";
import PostFilter from "../posts/PostFilter";
import AuthContext from "../../context/auth/authContext";

const Profile = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div>
                <PostForm />
            </div>
            <div>
                <PostFilter />
                <Posts />
            </div>
        </div>
    );
};

export default Profile;
