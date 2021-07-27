
// props: register, attr, label, options
export default function SelectField(props) {

  const getId = () => {
    return 'select-' + props.attr;
  }

  const getOptions = () => {
    return (props.options.map((option) =>
      <option value={option.value} key={option.value} >{option.label}</option>
    ));
  }

  const onChange = () => {
    if (props.onChange) {
      props.onChange(document.getElementById(getId()).value);
    }
  }

  return (
    <select
      {...props.register(props.attr)}
      id={getId(props.attr)}
      className="form-select form-select-lg mb-4"
      aria-label="Default select example"
      required={props.required}
      onChange={onChange}>
      {/* <option>{props.label}</option> */}
      { getOptions() }
    </select>
  );
}