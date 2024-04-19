import React, { useCallback, useEffect } from "react";
import Write from "../components/write/Write";
import { connect } from "react-redux";
import {
  reset_write,
  chang_field,
  write_post,
  update_post,
  set_post,
} from "../modules/write";
import { useNavigate, useParams } from "react-router-dom";
import TagBox from "../components/write/TagBox";
import Responsive from "../common/Responsive";
import WriteActionButton from "../components/write/WriteActionButton";
import Header from "../common/Header";

const WritePage = (props) => {
  const { title, body, tags, writer, writerError, writeLoading, set_post } =
    props;
  const { reset_write, chang_field, write_post, update_post } = props;
  const { postId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // 만약 postId가 존재한다면, 해당 postId를 가진 포스트를 불러옵니다.
    if (postId) {
      set_post(postId);
    }
  }, [postId, set_post]);

  console.log("postId", postId);
  const onWrite = () => {
    if (postId) {
      update_post(postId, title, body, tags);
    } else {
      write_post(title, body, tags);
    }
    navigate(-1);
  };
  const onCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  console.log("writer", writer);

  useEffect(() => {
    reset_write();
    if (writer) {
      const { _id } = writer; //post
      navigate(`/${writer.user.username}/${_id}`); //postPage;
    }
    if (writerError) {
      console.log(writerError);
      return;
    }
  }, [navigate, writer, writerError, reset_write]);

  useEffect(() => {
    reset_write();
  }, [reset_write]);
  if (writeLoading) return <div>loading...</div>;
  return (
    <>
      <Header />
      <Responsive>
        <Write title={title} body={body} chang_field={chang_field} />
        <TagBox tagList={tags} chang_field={chang_field} />
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
    user: state.user.user,
    title: state.write.title,
    body: state.write.body,
    tags: state.write.tags,
    writer: state.write.writer,
    writerError: state.write.writerError,
    writeLoading: state.loading.writeLoading,
  }),
  {
    reset_write,
    chang_field,
    write_post,
    update_post,
    set_post,
  }
)(WritePage);
