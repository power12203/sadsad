import React, {useRef, useEffect, useCallback} from 'react';
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'
import styled from "styled-components";
import palette from "../../common/palette";
import Responsive from "../../common/Responsive";

const WriteDiv = styled(Responsive)`
    padding-top: 5rem;
    padding-bottom: 5rem;
`;

const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom:0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.Gray[4]};
    margin-bottom: 2rem;
    width: 100%;
`;

const QuillDiv = styled.div`
    .ql-editor{
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .q1-editor.q1-blank::before{
        left: 0px;
    }
`;

const Write = (props) => {
    const {title, body} = props;
    const {change_field} = props;
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: "내용을 작성하세요...",
            modules: {
                toolbar: [
                    [{header: '1'}, {header: '2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{list: 'ordered'}, {list: 'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });

        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source)=>{
            if(source==='user'){
                change_field('body', quill.root.innerHTML)
            }
        })

    }, [change_field]);

    useEffect(()=>{
        quillInstance.current.root.innerHTML = body;
    },[])

    const onChange = useCallback((e) =>{
       change_field('title', e.target.value)
    }, [change_field])

    return (
        <WriteDiv>
            <TitleInput
                value={title}
                onChange={onChange}
                placeholder="제목을 입력하세요"
            />
            <QuillDiv>
                <div ref={quillElement}/>
            </QuillDiv>
        </WriteDiv>
    );
};

export default Write;
