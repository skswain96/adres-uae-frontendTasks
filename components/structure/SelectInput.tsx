import { FunctionComponent } from "react";
import Select from "react-select";
import { customSelectStyles } from "@/styles/select.style";

import { OptionType } from "@/types/select";

import Label from "../base/Label";

const SelectInput: FunctionComponent<any> = (props) => {
  const placeholder = props.placeholder;
  const label = props.label;
  const onChange = props.onChange;
  const options: Array<OptionType> = props.options;
  const instanceId = props.instanceId;

  return (
    <div className="inline-flex flex-col justify-start items-start space-y-1 w-full">
      <Label label={label} />
      <Select
        styles={customSelectStyles}
        instanceId={instanceId}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectInput;
