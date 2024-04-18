import React, { useCallback, useEffect, useState } from "react";
import Button from "../../common/Button";
import TagList from "./TagList";
import styled from "styled-components";
import palette from "../../common/palette";

const TagBoxDiv = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.Gray[2]};
  padding-top: 2rem;
  h4 {
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
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }
  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }
  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${palette.Gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.Gray[6]};
    }
  }
`;
const TagBox = (props) => {
  const { tagList } = props;
  const { chang_field } = props;
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);

  const onChange = useCallback((e) => {
    const newInput = e.target.value;
    setInput(newInput);
  }, []);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (tags.includes(input)) return;
      if (!input) return;
      console.log(tags);
      const newTags = [...tags, input.trim()];
      // setTags(newTagList && newTagList);
      setTags(newTags);
      setInput("");
      chang_field("tags", newTags);
    },
    [tags, input, chang_field]
  );
  useEffect(() => {
    setTags(tagList);
  }, [tagList]);

  const onRemove = useCallback(
    (tag) => {
      const newTags = tags.filter((item) => item !== tag);
      setTags(newTags);
      chang_field("tags", newTags);
    },
    [tags, chang_field]
  );
  return (
    <TagBoxDiv>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={input}
          placeholder="태그를 입력하세요."
        />
        <Button type="submit">추가</Button>
      </TagForm>
      <TagList tags={tags} onRemove={onRemove} />
    </TagBoxDiv>
  );
};

export default TagBox;
