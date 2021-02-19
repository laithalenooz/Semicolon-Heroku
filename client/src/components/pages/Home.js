import React, {Fragment, useContext, useEffect, useState} from 'react';
import axios from "axios";
import AuthContext from "../../context/auth/authContext";



const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
    let [posts, setPosts] = useState('');
    let config = {
        'headers': {
            'Content-Type': 'application/json',
        }
    }

        axios.get('/api/posts/all', {config}).then((response) => {
            setPosts(response.data);
        })

    return (
        <Fragment>
                    {posts && posts.map(post => (
                                <Fragment>
                                    {post.type === 'public' ? <div key={post._id} className={'card bg-light'}>
                                        <h3 className="text-primary text-left">
                                            {post.title}{' '}
                                            <span style={{float: 'right'}} className={'badge ' +
                                            (post.type === 'public' ? 'badge-success' : 'badge-danger')}
                                            >
                                            {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                                            </span>
                                        </h3>
                                        <h3>
                                            <ul className="list">
                                                {post.description && (<li>
                                                    {post.description}
                                                </li>)}
                                            </ul>
                                        </h3>
                                    </div> : ''}

                                </Fragment>))}
        </Fragment>
    );
};

export default Home;
