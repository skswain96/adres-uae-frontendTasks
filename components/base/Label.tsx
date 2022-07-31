import { FunctionComponent } from "react";
import Text from "../base/Text";

const Label: FunctionComponent<any> = (props) => {
  const label = props.label;

  return (
    <label>
      <Text content={label} />
    </label>
  );
};

export default Label;
