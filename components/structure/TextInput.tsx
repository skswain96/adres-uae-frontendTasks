import { FunctionComponent } from "react";
import Input from "../base/Input";
import Label from "../base/Label";

const TextInput: FunctionComponent<any> = (props) => {
  const placeholder = props.placeholder;
  const label = props.label;
  const onChange = props.onChange;
  const type = props.type || "input";

  return (
    <div className="inline-flex flex-col justify-start items-start space-y-1 w-full">
      <Label label={label} />
      <Input
        placeholder={placeholder}
        onChange={(e: any) => onChange(e.target.value)}
        type={type}
      />
    </div>
  );
};

export default TextInput;
