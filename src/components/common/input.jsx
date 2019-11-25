import React from "react";

const Input = ({ type, name, label, error, ...rest }) => {
  // console.log("rest", { ...rest });
  if (type === "textarea") {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea
          {...rest}
          name={name}
          id={name}
          className="form-control"
          rows="6"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
