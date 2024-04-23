import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import palette from "../../common/palette";
import TagList from "./TagList";

const TagBoxDiv = styled.div`
    width: 100%;
    border-top: 1px solid ${palette.Gray[2]};
    padding-top: 2rem;
    h4{
        color: ${palette.Gray[8]};
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
`;

const TagForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    width: 256px;
    border: 1px solid ${palette.Gray[9]};
    input, button{
        outline: none;
        border: none;
        font-size: 1rem;
    }
    input{
        padding: 0.5rem;
        flex: 1;
        min-width: 0;
    }
    button{
        cursor: pointer;
        padding-right: 1rem;
        padding-left: 1rem;
        border: none;
        background: ${palette.Gray[8]};
        color: white;
        font-weight: bold;
        &:hover{
            background: ${palette.Gray[6]};
        }
    }
`;

const TagBox = (props) => {
    const {tagList} = props;
    const {change_field} = props;
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([])

    const onChange = useCallback((e) =>{
        setInput(e.target.value)
    },[input])

    const onRemove=useCallback((tag)=>{
        const newTags = tags.filter(item=>item!==tag)
        setTags(newTags);
        change_field('tags', newTags)
    },[tags])

    const insert_tag = useCallback((tag) =>{
        if(!tag) return;
        if(tags.includes(tag)) return;
        const newTags = [...tags, tag]
        setTags(newTags);
        change_field('tags', newTags)
    },[tags, change_field])

    const onSubmit =useCallback((e) =>{
        e.preventDefault();
        insert_tag(input.trim())
        setInput('');
    },[input, insert_tag])

    useEffect(() => {
        setTags(tagList)
    }, [tagList]);

    return (
        <TagBoxDiv>
            <h4>태그</h4>
            <TagForm onSubmit={onSubmit}>
                <input
                    value={input}
                    onChange={onChange}
                    placeholder="태그를 입력하세요."
                />
                <button type="submit">추가</button>
            </TagForm>
            <TagList
                tags={tags}
                onRemove={onRemove}
            />
        </TagBoxDiv>
    );
};

export default TagBox;
