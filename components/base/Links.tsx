import { FunctionComponent } from "react";

const Link: FunctionComponent<any> = (props: any) => {
  const label = props.label;
  const path = props.path || "#!";

  return (
    <span className="text-primary text-sm">
      <a href={path}>{label}</a>
    </span>
  );
};

export default Link;
