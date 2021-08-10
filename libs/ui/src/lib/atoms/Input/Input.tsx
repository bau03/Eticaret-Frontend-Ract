import React from 'react';
import { ErrorMessage } from '../ErrorMessage';


type InputProps = {
  errors?: Record<string, any>;
} & JSX.IntrinsicElements['input'];

export const Input: React.FC<InputProps> = React.forwardRef((props, ref) => {
  const { errors, name, className, ...rest } = props;

  return (
    <>
      <input ref={ref} name={name} {...rest} className={`form-control ${errors[name] && 'is-invalid'} ${className}`} />
      {errors && <ErrorMessage errors={errors} name={name} />}
    </>
  );
});
