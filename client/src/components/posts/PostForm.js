import React, {useState, useContext, useEffect} from 'react';
import PostContext from '../../context/post/postContext';
import {ADD_POST} from "../../context/types";
import postContext from "../../context/post/postContext";


const PostForm = () => {
    const postContext = useContext(PostContext);

    const {addPost, updatePost, clearCurrent, current} = postContext;

    useEffect(() => {
        if(current !== null) {
            setPost(current);
        } else {
            setPost({
                title: '',
                description: '',
                type: 'public'
            });
        }
    }, [postContext, current]);

    const [post, setPost] = useState({
        title: '',
        description: '',
        type: 'public'
    });

    const {title, description, image, type} = post;

    const onChange = e => setPost({
        ...post, [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        if(current === null) {
            addPost(post);
        } else {
            updatePost(post);
        }
        setPost({
            title: '',
            description: '',
            type: 'public'
        });
    };

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Post' : 'Add Post'}</h2>
            <input type="text" placeholder={'title'} name={'title'} value={title} onChange={onChange}/>
            <textarea placeholder={'description'} name={'description'} value={description} onChange={onChange}/>
            <h5>Post Type</h5>
            <input type="radio" name="type" value={'public'} checked={type === 'public'} onChange={onChange}/> Public{' '}
            <input type="radio" name="type" value={'private'} checked={type === 'private'} onChange={onChange}/> Private
            <div>
                <input type="submit" value={current ? 'Update Post' : 'Add Post'} className={'btn btn-primary' +
                ' btn-block'}/>
            </div>
            {current && <div>
                <button className="btn btn-white btn-block" onClick={clearAll}>
                    Clear
                </button>
            </div>}
        </form>
    );
};

export default PostForm;
