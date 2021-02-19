import React, {Fragment, useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import PostItem from "./PostItem";
import Spinner from "../layout/Spinner";
import PostContext from '../../context/post/postContext';

const Posts = () => {
    const postContext = useContext(PostContext);

    const {posts, filtered, getPosts, loading} = postContext;

    useEffect(() => {
        getPosts();
        //eslint-disable-next-line
    }, [])

    if(posts !== null && posts.length === 0 && !loading){
        return <h4>Please add a post</h4>
    }

    return (
        <Fragment>
            {posts !== null && !loading ? (
                <TransitionGroup>
                    {filtered !== null ? filtered.map(post => (
                            <CSSTransition key={post._id} timeout={500} classNames={'item'}>
                                <PostItem post={post} />
                            </CSSTransition>))
                        : posts.map(post => (
                            <CSSTransition key={post._id} timeout={500} classNames={'item'}>
                                <PostItem post={post} />
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            ) : <Spinner />}

        </Fragment>
    );
};

export default Posts;
