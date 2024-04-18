import React, { useCallback, useEffect } from "react";
import Write from "../components/write/Write";
import { connect } from "react-redux";
import { reset_write, chang_field, write_post } from "../modules/write";
import { useNavigate } from "react-router-dom";
import TagBox from "../components/write/TagBox";
import Responsive from "../common/Responsive";
import WriteActionButton from "../components/write/WriteActionButton";
import Header from "../common/Header";

const WritePage = (props) => {
  const { title, body, tags, writer, writerError, writeLoading } = props;
  const { reset_write, chang_field, write_post } = props;
  const navigate = useNavigate();

  const onWrite = useCallback(() => {
    write_post(title, body, tags);
  }, [write_post, title, body, tags]);
  const onCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (writer) {
      const { _id } = writer; //post
      navigate(`/${writer.user.username}/${_id}`); //postPage;
    }
    if (writerError) {
      console.log(writerError);
      return;
    }
  }, [navigate, writer, writerError]);

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
        <WriteActionButton onWrite={onWrite} onCancel={onCancel} />
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
  }
)(WritePage);
