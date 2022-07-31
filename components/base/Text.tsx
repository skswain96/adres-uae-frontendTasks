import { FunctionComponent } from "react";

const Text: FunctionComponent<any> = (props) => {
  const content = props.content;
  const textAlign = props.textAlign || "text-left";
  const color = props.color || "text-dark";
  const size = props.size || "text-sm";

  return <span className={`${color} ${textAlign} ${size}`}>{content}</span>;
};

export default Text;
