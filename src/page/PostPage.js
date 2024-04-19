import React, { useCallback, useEffect } from "react";
import Post from "../components/post/Post";
import Header from "../common/Header";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { read_post, remove_post } from "../modules/post";
import { logout } from "../modules/user";
import PostActionButtons from "../components/post/PostActionButton";
import { set_post } from "../modules/write";

const PostPage = (props) => {
  const { postId } = useParams();
  const { post, postError, readLoading, user } = props;
  const { read_post, logout, set_post, remove_post } = props;
  const navigate = useNavigate();

  const onEdit = useCallback(() => {
    set_post(post);
    navigate(`/write/${postId}`);
  }, []);
  const onRemove = useCallback(() => {
    remove_post(postId);
    navigate("/");
  }, [remove_post, navigate, postId]);
  useEffect(() => {
    read_post(postId);
  }, [read_post, postId]);

  return (
    <div>
      <Header user={user} logout={logout} />
      <Post post={post} postError={postError} readLoading={readLoading} />
      <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
    </div>
  );
};

export default connect(
  (state) => ({
    title: state.write.title,
    user: state.user.user,
    post: state.post.post,
    postError: state.post.postError,
    readLoading: state.loading.readLoading,
  }),
  {
    read_post,
    logout,
    set_post,
    remove_post,
  }
)(PostPage);
