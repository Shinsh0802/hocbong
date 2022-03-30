import React, { useCallback, useState, useRef, useEffect } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
import { FaBold, FaItalic, FaUnderline, FaHeading } from "react-icons/fa";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { formatTime } from "../../../../utils/utils";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const RichTextExample = (props) => {
  //state
  const [value, setValue] = useState(initialValue);

  //slate
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const [type, setLevel] = useState("Thường");
  const editorRef = useRef();
  if (!editorRef.current) editorRef.current = withReact(createEditor());
  const editor = editorRef.current;
  //Toggle header
  const enterHeading = (key) => {
    if (key === "Enter" && isBlockActive(editor, "heading-two"))
      toggleBlock(editor, "heading-two");
  };

  useEffect(() => {
    const input = document.querySelector(".noti-card");
    input.addEventListener("keyup", (e) => {
      enterHeading(e.key);
    });
  }, []);
  //function
  function handlePost(e) {
    console.log("abcd");
    function standardlize(num) {
      if (num < 10) return "0" + num;
      else return num;
    }
    let today = new Date();
    let dateTime = formatTime(today, "en-US");

    // let dateTime =
    //   today.toLocaleDateString("en-US") +
    //   " " +
    //   today.toLocaleTimeString("en-US");

    props.post({
      content: JSON.stringify(value),
      type: type,
    });
  }
  //render
  return (
    <div className="noti-card">
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >


        <div className="edit-bar">
          <FloatingLabel label="Mức độ">
            <Form.Select
              style={{ display: "inline" }}
              onChange={(e) => {
                setLevel(e.target.value);
              }}
              aria-label="Chọn mức độ khẩn cấp"
            >
              <option value="Thường">Thường</option>
              <option value="Khẩn">Khẩn</option>
              <option value="Quan trọng">Quan trọng</option>
            </Form.Select>
          </FloatingLabel>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />

        </div>

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={props?.nameplaceholder}
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            paddingTop: "5px",
            borderTop: "1px solid black",
          }}
        >
          <Button style={{ width: "100%" }} onClick={handlePost}>
            {props?.nameButton}
          </Button>
          {/* <Button style={{ width: "100%" }} onClick={handlePost}>Đăng thông báo</Button> */}
        </div>
      </Slate>
    </div>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.typeText
      ),
    split: true,
  });
  const newProperties = {
    typeText: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { typeText: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.typeText === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.typeText) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      className="edit-button"
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon === "looks_two" ? (
        <FaHeading size={15} />
      ) : icon === "format_list_numbered" ? (
        <AiOutlineOrderedList size={20} />
      ) : icon === "format_list_bulleted" ? (
        <AiOutlineUnorderedList size={20} />
      ) : null}
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      className="edit-button"
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon === "format_bold" ? (
        <FaBold size={15} />
      ) : icon === "format_italic" ? (
        <FaItalic size={15} />
      ) : icon === "format_underlined" ? (
        <FaUnderline size={15} />
      ) : null}
      {/* <Icon>{icon}</Icon> */}
    </Button>
  );
};

const initialValue = [
  {
    typeText: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];
window.Editor = initialValue;
export default RichTextExample;
