import { useState } from 'react';

const Blog = (props) => {
  const [blogInfoVisibility, setBlogInfoVisibility] = useState(false);

  const blogStyle = {
    border: 'solid',
    borderWidth: 0.5,
    padding: 5,
    margin: 10,
  };

  const toggleVisible = () => {
    setBlogInfoVisibility(!blogInfoVisibility);
  };

  const likeBlogHandler = () => {
    props.onLike({
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes + 1,
      id: props.blog.id,
    });
  };

  const deleteBlogHandler = () => {
    props.onDelete(props.blog.id, props.blog.title);
  };

  return (
    <div style={blogStyle} className="main">
      <div className="initial">
        {props.blog.title} - <strong>{props.blog.author}</strong>
        <button onClick={toggleVisible} className="viewButton">
          {blogInfoVisibility ? 'Hide' : 'View'}
        </button>
        {props.user && props.blog.user.username === props.user.username && (
          <button onClick={deleteBlogHandler}>Delete</button>
        )}
      </div>
      {blogInfoVisibility && (
        <div className="hidden">
          <p>{props.blog.url}</p>
          <p>
            Likes: {props.blog.likes}
            <button onClick={likeBlogHandler} className="likeButton">
              Like
            </button>
          </p>
          <p>Posted by {props.blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
