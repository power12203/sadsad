import React, {useCallback, useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import Post from "../components/post/Post";
import Header from "../common/Header";
import PostActionButtons from "../components/post/PostActionButtons";
import {connect} from "react-redux";
import {read_post} from "../modules/post";
import {set_post} from "../modules/write";
import {remove_post} from "../modules/api/posts";
import AskRemoveModal from "../components/post/AskRemoveModal";


const PostPage = (props) => {
    const {user, post, postError, readLoading} = props;
    const {read_post, set_post} = props;
    const {postId} = useParams();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false)

    const onRemoveClick = () =>{
        setModal(true);
    }

    const onRemove = async ()=>{
        // setModal(true);
        try{
            await remove_post(postId)
            navigate('/')
        }catch(e){
            console.log(e)
        }
    };

    const onCancel = ()=>{
        setModal(false);
    }
    const onConfirm = () =>{
        setModal(false);
        onRemove();
    }

    const onEdit = useCallback(()=>{
        set_post(post);
        navigate('/write')
    },[navigate, set_post, post])

    const isOwner = (user && user.id) === (post && post.user.id)

    useEffect(() => {
            read_post(postId)
    }, [postId, read_post]);


    return (
        <>
            <Header/>
            <Post
                post={post}
                postError={postError}
                readLoading={readLoading}
                actionButtons={
                    isOwner && <PostActionButtons
                        onEdit={onEdit}
                        onRemoveClick={onRemoveClick}
                    />
            }
            />
            <AskRemoveModal
                visible={modal}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </>
    );
};

export default connect(
    state => ({
        user: state.user.user,
        post: state.post.post,
        postError: state.post.postError,
        readLoading: state.loading.readLoading
    }),
    {
        read_post,
        set_post,
    }
)(PostPage);
