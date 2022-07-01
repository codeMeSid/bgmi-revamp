import { Autocomplete, TextField } from "@mui/material";

type Props = {
  options?: Array<any>;
  multiple?: boolean;
  value?: any;
  onChange: (value: any) => void;
  label?: string;
  styleOveride?: any;
  getOptionLabel?: (option: any) => any;
  renderOption?: (props: any, option: any) => any;
};

export default function AutoComplete(props: Props) {
  return (
    <Autocomplete
      autoHighlight
      multiple={!!props.multiple}
      value={props.value}
      sx={{ ...props.styleOveride }}
      options={props?.options || []}
      onChange={(event: any, value: any) => props.onChange(value)}
      getOptionLabel={props.getOptionLabel}
      renderOption={props.renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={props.label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
