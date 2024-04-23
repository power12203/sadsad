import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";
import Header from "../common/Header";
import Pagination from "../components/postList/Pagination";
import PostList from "../components/postList/PostList";
import {list_post} from "../modules/postList";


const PostListPage = (props) => {
    const {user, posts, postsError, lastPage, listLoading} = props;
    const {list_post} = props;
    const {username} = useParams();
    const [searchParams]=useSearchParams();
    const tag = searchParams.get('tag') || '';
    const page = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        list_post(page, username, tag);
    }, [list_post, searchParams, username, user, page, tag]);

    return (
        <>
            <Header />
            <PostList
                listLoading={listLoading}
                postsError = {postsError}
                posts = {posts}
                user = {user}
            />
            <Pagination
                page={Number(page)}
                tag={tag}
                username={username}
                lastPage={Number(lastPage)}
                />
        </>
    );
};

export default connect(
    state=>({
        user: state.user.user,
        posts: state.postList.posts,
        postsError: state.postList.postsError,
        lastPage: state.postList.lastPage,
        listLoading: state.loading.listLoading
    }),
    {
        list_post,
    }
)(PostListPage);
