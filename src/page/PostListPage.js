import React, { useEffect } from "react";
import Header from "../common/Header";
import { connect } from "react-redux";
import { logout } from "../modules/user";
import PostList from "../components/postList/PostList";
import { list_post } from "../modules/postList";
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../components/postList/Pagination";
const PostListPage = (props) => {
  const [searchParams] = useSearchParams();
  const { username } = useParams();
  const { user } = props;
  const { logout } = props;
  const { posts, postsError, listLoading, lastPage } = props;
  const { list_post } = props;
  const tag = searchParams.get("tag") || "";
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    list_post(page, username, tag);
  }, [list_post, searchParams, username, user, tag, page]);

  if (listLoading) return <div>loading....</div>;
  return (
    <>
      <Header user={user} logout={logout} />
      <PostList user={user} posts={posts} postsError={postsError} />
      <Pagination
        page={page}
        lastPage={lastPage}
        tag={tag}
        username={username}
      />
    </>
  );
};

export default connect(
  (state) => ({
    user: state.user.user,
    posts: state.postList.posts,
    postsError: state.postList.postsError,
    lastPage: state.postList.lastPage,
    listLoading: state.loading.listLoading,
  }),
  {
    logout,
    list_post,
  }
)(PostListPage);
