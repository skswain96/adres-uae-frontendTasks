import { StylesConfig } from "react-select";
import { OptionType, IsMulti } from "@/types/select";

export const customSelectStyles: StylesConfig<OptionType, IsMulti> = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "#fff" : "#2f3941",
    padding: 12,
    fontSize: 12,
    width: "auto",
    background: state.isSelected ? "#0f489b" : "#fff",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    width: "auto",
  }),
  container: (provided: any, state: any) => ({
    ...provided,
    width: "100%",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: "#2f3941",
    fontSize: 12,
  }),
  indicatorsContainer: () => ({
    display: "inline-flex",
    position: "absolute",
    top: 0,
    width: `100%`,
    zIndex: 99,
    justifyContent: `flex-end`,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  control: () => ({
    height: 37,
    borderRadius: `0.375rem`,
    border: "1px solid #d1d5db",
    position: "relative",
  }),
};
