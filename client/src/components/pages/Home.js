import React, {Fragment, useContext, useEffect, useState} from 'react';
import axios from "axios";
import AuthContext from "../../context/auth/authContext";
import { Segment, Image, Button, Comment, Form } from 'semantic-ui-react';

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
           <Fragment key={post._id}>
               {post.type === 'public' ?
               <Segment>
                   <span className={'badge badge-success'}>{post.type} {' '} {post.date}</span>
                 <h3>{post.title}</h3>
                 <p>
                    {post.description}
                 </p>
             </Segment> : ''}
           </Fragment>))}
        </Fragment>
    );
}

export default Home;
