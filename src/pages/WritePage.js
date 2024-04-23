import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Responsive from "../common/Responsive";
import Write from "../components/write/Write";
import TagBox from "../components/write/TagBox";
import WriteActionButton from "../components/write/WriteActionButton";
import {
  reset_write,
  change_field,
  write_post,
  update_post,
} from "../modules/write";
import { read_post, set_post } from "../modules/post";
import Header from "../common/Header";

const WritePage = (props) => {
  const { title, body, tags, post, postId, postError, writeLoading } = props;
  console.log("123", post);
  const {
    reset_write,
    change_field,
    write_post,
    update_post,
    read_post,
    set_post,
  } = props;
  const navigate = useNavigate();

  const onWrite = () => {
    // console.log(postId)
    if (postId) {
      update_post(postId, title, body, tags);
      read_post(postId);
      return;
    }
    write_post(title, body, tags);
  };
  const onCancel = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (!post) {
      return;
    }
    if (post && post.user.username) {
      set_post(post);
      const { _id } = post;
      navigate(`/${post.user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);

  useEffect(() => {
    return () => {
      reset_write();
    };
  }, [read_post, post, set_post]);

  if (writeLoading) return <div>loading...</div>;

  return (
    <>
      <Header />
      <Responsive>
        <Write change_field={change_field} title={title} body={body} />
        <TagBox tagList={tags} change_field={change_field} />
        <WriteActionButton
          onWrite={onWrite}
          onCancel={onCancel}
          isEdit={postId}
        />
      </Responsive>
    </>
  );
};

export default connect(
  (state) => ({
    title: state.write.title,
    body: state.write.body,
    tags: state.write.tags,
    username: state.auth.username,
    post: state.write.post,
    postId: state.write.postId,
    postError: state.write.postError,
    writeLoading: state.loading.writeLoading,
  }),
  {
    reset_write,
    change_field,
    write_post,
    update_post,
    read_post,
    set_post,
  }
)(WritePage);
