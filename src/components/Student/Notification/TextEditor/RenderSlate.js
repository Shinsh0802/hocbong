export default function renderSlate(data) {
  function renderLeaf(item) {
    // console.log(item.text);
    if (item.content === "") return <br />;
    return (
      <span
        style={{
          fontWeight: item.bold ? "bold" : "normal",
          fontStyle: item.italic ? "italic" : "normal",
          textDecoration: item.underline ? "underline" : "none",
        }}
      >
        {item.text}
      </span>
    );
  }
  return (
    <>
      {data.map((item) => {
        // console.log(item);
        if (!item.typeText) {
          return renderLeaf(item);
        }
        switch (item.typeText) {
          case "paragraph":
            return (
              <div>
                <p align="justify">{renderSlate(item.children)}</p>
              </div>
            );
          case "heading-two":
            return <h2>{renderSlate(item.children)}</h2>;
          case "bulleted-list":
            return <ul>{renderSlate(item.children)}</ul>;
          case "list-item":
            return <li>{renderSlate(item.children)}</li>;
          case "numbered-list":
            return <ol>{renderSlate(item.children)}</ol>;
          default:
            return null;
        }
      })}
    </>
  );
}
