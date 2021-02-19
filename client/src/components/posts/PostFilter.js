import React, {useContext, useRef, useEffect} from 'react';
import PostContext from '../../context/post/postContext';

const PostFilter = () => {
    const postContext = useContext(PostContext);
    const text = useRef('');

    const {filterPosts, clearFilter, filtered} = postContext;

    useEffect(() => {
        if(filtered === null){
            text.current.value = '';
        }
    })

    const onChange = e => {
        if(text.current.value !== ''){
            filterPosts(e.target.value);
        } else {
            clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder={'Filter Posts...'} onChange={onChange}/>
        </form>
    );
};

export default PostFilter;
