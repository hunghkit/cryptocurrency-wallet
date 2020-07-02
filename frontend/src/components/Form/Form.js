import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Label,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { ErrorMessage } from 'react-hook-form';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const FormField = ({
  className,
  addonType,
  icon,
  errors,
  label,
  isNumber,
  mask,
  ...props
}) => {
  const children = useMemo(() => {
    const items = [];
    if (addonType === 'prepend') {
      items.push(
        <InputGroupAddon key="prepend" addonType="prepend">
          <InputGroupText>
            <i className={icon}></i>
          </InputGroupText>
        </InputGroupAddon>,
      );
    }

    if (isNumber || mask) {
      items.push(
        <TextMask
          key="center"
          mask={
            mask ||
            createNumberMask({
              prefix: '',
              decimalLimit: 5,
              allowDecimal: true,
            })
          }
          Component={InputAdapter}
          className="form-control"
          {...props}
        />,
      );
    } else {
      items.push(<Input key="center" {...props} />);
    }

    if (addonType === 'append') {
      items.push(
        <InputGroupAddon key="append" addonType="append">
          <InputGroupText>
            <i className={icon}></i>
          </InputGroupText>
        </InputGroupAddon>,
      );
    }

    return items;
  }, [addonType, mask, isNumber, icon, props]);

  return (
    <FormGroup className={className}>
      {label && <Label for={props.name}>Input without validation</Label>}
      {children.length > 1 ? <InputGroup>{children}</InputGroup> : children}
      <ErrorMessage errors={errors || []} name={props.name}>
        {({ message }) => <p className="text-danger">{message}</p>}
      </ErrorMessage>
    </FormGroup>
  );
};

FormField.propTypes = {
  mask: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  isNumber: PropTypes.bool,
  addonType: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ),
};

FormField.defaultProps = {};
