import { FunctionComponent } from "react";
import Text from "./Text";

const Button: FunctionComponent<any> = (props) => {
  const label = props.label;
  const onClick = props.onClick;

  return (
    <button
      onClick={onClick}
      className="bg-primary text-sm py-2 px-3 w-full h-auto max-h-[36px] rounded-md inline-flex justify-center items-center"
    >
      <Text color="text-white" content={label} />
    </button>
  );
};

export default Button;
