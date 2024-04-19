import React, { useCallback, useEffect } from "react";
import Post from "../components/post/Post";
import Header from "../common/Header";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { read_post } from "../modules/post";
import { logout } from "../modules/user";
import PostActionButtons from "../components/post/PostActionButton";
import { set_post } from "../modules/write";

const PostPage = (props) => {
  const { postId } = useParams();
  const { post, postError, readLoading, user } = props;
  const { read_post, logout, set_post } = props;
  const navigate = useNavigate();
  console.log(post);
  const onEdit = useCallback(() => {
    set_post(post);
    navigate("/write");
  }, []);
  useEffect(() => {
    read_post(postId);
  }, [read_post, postId]);

  return (
    <div>
      <Header user={user} logout={logout} />
      <Post post={post} postError={postError} readLoading={readLoading} />
      <PostActionButtons onEdit={onEdit} />
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
    set_post,
  }
)(PostPage);
