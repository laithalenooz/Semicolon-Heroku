import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import PostContext from '../../context/post/postContext';

const PostItem = ({post}) => {
    const postContext = useContext(PostContext);
    const {deletePost, setCurrent, clearCurrent} = postContext;

    const {_id, title, description, image, type} = post;

    const onDelete = () => {
        deletePost(_id);
        clearCurrent();
    }

    return (
        <div className={'card bg-light'}>
            <h3 className="text-primary text-left text-center">
                {title}{' '}
                <span style={{float: 'right'}} className={'badge ' +
                    (type === 'public' ? 'badge-success' : 'badge-danger')}
                    >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
                <h3>
                    <ul className="list">
                        {description && (<li>
                            {description}
                        </li>)}
                        {image && (<li>
                            <img src={image} alt="" height={'300'}/>
                        </li>)}
                    </ul>
                    <p>
                        <button className="btn btn-dark btn-sm" onClick={() => setCurrent(post)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
                    </p>
                </h3>
        </div>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
}

export default PostItem;
