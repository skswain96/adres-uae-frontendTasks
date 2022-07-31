import { FunctionComponent } from "react";

const Link: FunctionComponent<any> = (props: any) => {
  const label = props.label;
  const path = props.path || "#!";
  const color = props.color || "text-primary";

  return (
    <span className={`${color} text-sm hover:underline`}>
      <a href={path}>{label}</a>
    </span>
  );
};

export default Link;
