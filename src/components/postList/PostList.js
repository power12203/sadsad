import React from 'react';
import PostItem from "./PostItem";
import styled from "styled-components";
import Button from "../../common/Button";
import palette from "../../common/palette";
import Responsive from "../../common/Responsive";

const PostListResponsive = styled(Responsive)`
    margin-top: 3rem;
`
const PostListDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostList = (props) => {
    const {user, posts, postsError, listLoading} = props;
    return (
        <PostListResponsive>
            {user && <PostListDiv>
                <Button orange to="/write">새 글 작성하기</Button>
            </PostListDiv>}
            {!listLoading && posts && (
                <div>
                    {posts.map(post=>(
                        <PostItem post={post} key={post._id}/>
                        ))
                    }
                </div>
            )}


        </PostListResponsive>
    );
};

export default PostList;
