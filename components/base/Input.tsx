import { FunctionComponent } from "react";

const Input: FunctionComponent<any> = (props) => {
  return (
    <input
      className="ring-1 ring-gray-300 rounded-md px-3 py-2 text-sm text-dark"
      {...props}
    />
  );
};

export default Input;
