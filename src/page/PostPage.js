import React, { useEffect } from "react";
import Post from "../components/post/Post";
import Header from "../common/Header";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { read_post } from "../modules/post";
import { logout } from "../modules/user";

const PostPage = (props) => {
  const { postId } = useParams();
  const { post, postError, readLoading, user } = props;
  const { read_post, logout } = props;
  console.log(post);

  useEffect(() => {
    read_post(postId);
  }, [read_post, postId]);

  return (
    <div>
      <Header user={user} logout={logout} />
      <Post post={post} postError={postError} readLoading={readLoading} />
    </div>
  );
};

export default connect(
  (state) => ({
    user: state.user.user,
    post: state.post.post,
    postError: state.post.postError,
    readLoading: state.loading.readLoading,
  }),
  {
    read_post,
    logout,
  }
)(PostPage);
