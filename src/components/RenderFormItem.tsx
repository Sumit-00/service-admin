import { FORM_FIELD_TYPES } from '@/constants/enums';
import { RadioGroupProps } from '@radix-ui/react-radio-group';
import { SelectProps, SelectValueProps } from '@radix-ui/react-select';
import FormFieldArray, { FormFieldArrayProps } from './FormFieldArray';
import FormInput from './FormInput';
import FormMultiSelect from './FormMultiSelect';
import FormRadio, { FormRadioItemProps } from './FormRadio';
import FormSelect, { SelectItem } from './FormSelect';
import FormTextArea from './FormTextArea';
import { InputProps } from './ui/input';
import { MultiSelectFormFieldProps } from './ui/multi-select';
import { TextareaProps } from './ui/textarea';
import FormCheckbox, { FormCheckboxProps } from './FormCheckbox';
import FormUpload, { FormUploadType } from './FormUpload';
import FormTimePicker, { FormTimePickerProps } from './FormTimepicker';
import { CalendarProps } from './ui/calendar';
import { TimePickerProps } from './ui/timepicker';
import FormDatePicker, { FormDatePickerProps } from './FormDatepicker';
import React, { Attributes } from 'react';
import FormSwitch, { FormSwitchProps } from './FormSwitch';
import { SwitchProps } from '@radix-ui/react-switch';

export type FormFieldTypeMapping = {
  [FORM_FIELD_TYPES.TEXT]: InputProps;
  [FORM_FIELD_TYPES.EMAIL]: InputProps;
  [FORM_FIELD_TYPES.PASSWORD]: InputProps;
  [FORM_FIELD_TYPES.NUMBER]: InputProps;
  [FORM_FIELD_TYPES.TEXT_AREA]: TextareaProps;
  [FORM_FIELD_TYPES.RADIO]: RadioGroupProps;
  [FORM_FIELD_TYPES.SELECT]: SelectProps & {
    options: Array<SelectItem>;
    selectValue: SelectValueProps;
  };
  [FORM_FIELD_TYPES.MULTI_SELECT]: MultiSelectFormFieldProps;
  [FORM_FIELD_TYPES.CHECKBOX]: FormCheckboxProps;
  [FORM_FIELD_TYPES.TIME_PICKER]: FormTimePickerProps;
  [FORM_FIELD_TYPES.DATE_PICKER]: FormDatePickerProps;
  [FORM_FIELD_TYPES.CUSTOM_COMPONENT]: Attributes;
  [FORM_FIELD_TYPES.UPLOAD]: FormUploadType;
  [FORM_FIELD_TYPES.SWITCH]: FormSwitchProps;
  [FORM_FIELD_TYPES.FIELD_ARRAY]: FormFieldArrayProps<keyof FormFieldTypeMapping>;
};

export type FormFieldProps<T extends FORM_FIELD_TYPES> = FormFieldTypeMapping[T];

export interface RenderFormItemProps<T extends FORM_FIELD_TYPES> {
  type: T;
  name: string;
  componentsProps?: FormFieldProps<T>;
  formItemProps?: React.HTMLAttributes<HTMLDivElement>;
  label?: string;
  nestedFields?: Array<RenderFormItemProps<T>>;
  className?: string;
  CustomComponent?: JSX.Element;
}

export interface GridProps {
  gridColumn?: number;
  gridRow?: number;
}

export type RenderGridFormItemProps<T extends FORM_FIELD_TYPES> = RenderFormItemProps<T> &
  GridProps;

/**
 * RenderFormItem is a component that renders a form field based on the provided config.
 * The config object should have the following properties:
 * - type: The type of form field to render
 * - name: The name of the form field
 * - componentsProps: Additional props to pass to the form field component
 * - formItemProps: Additional props to pass to the form item wrapper div
 * - label: The label to display for the form field
 * - nestedFields: An array of config objects for nested form fields
 * - className: Additional CSS classes to apply to the form item wrapper div
 * - CustomComponent: A custom component to render instead of the form field
 */
const RenderFormItem = (config: RenderGridFormItemProps<keyof FormFieldTypeMapping>) => {
  // Destructure the config object to get the necessary properties
  const {
    type = FORM_FIELD_TYPES.TEXT,
    name = '',
    label = '',
    componentsProps = {},
    formItemProps = {},
    CustomComponent = null,
    ...rest
  } = config;

  // Destructure the FORM_FIELD_TYPES object to get the constants
  const {
    TEXT,
    EMAIL,
    PASSWORD,
    NUMBER,
    TEXT_AREA,
    RADIO,
    SELECT,
    MULTI_SELECT,
    FIELD_ARRAY,
    CHECKBOX,
    UPLOAD,
    TIME_PICKER,
    DATE_PICKER,
    CUSTOM_COMPONENT,
    SWITCH,
  } = FORM_FIELD_TYPES;

  /**
   * getFormItem returns the appropriate form field component based on the type property in the config object.
   * This function uses a switch statement to return the appropriate form field component based on the type property.
   * Each form field component is passed the necessary props from the config object.
   */
  const getFormItem = () => {
    switch (type) {
      // Render a text input field
      case TEXT:
      case EMAIL:
      case PASSWORD:
      case NUMBER:
        return (
          <FormInput
            name={name}
            label={label}
            type={type}
            formItemProps={formItemProps}
            {...rest}
            {...(componentsProps as InputProps)}
          />
        );
      // Render a textarea input field
      case TEXT_AREA:
        return (
          <FormTextArea
            name={name}
            label={label}
            formItemProps={formItemProps}
            {...rest}
            {...(componentsProps as TextareaProps)}
          />
        );
      // Render a radio group input field
      case RADIO:
        return (
          <FormRadio
            name={name}
            label={label}
            formItemProps={formItemProps}
            {...rest}
            {...(componentsProps as RadioGroupProps & { options: Array<FormRadioItemProps> })}
          />
        );
      // Render a select input field
      case SELECT:
        return (
          <FormSelect
            name={name}
            label={label}
            formItemProps={formItemProps}
            {...rest}
            {...(componentsProps as SelectProps & {
              options: Array<SelectItem>;
              selectValue: SelectValueProps;
            })}
          />
        );
      // Render a multi-select input field
      case MULTI_SELECT:
        return (
          <FormMultiSelect
            name={name}
            label={label}
            formItemProps={formItemProps}
            {...rest}
            {...(componentsProps as MultiSelectFormFieldProps)}
          />
        );
      // Render a checkbox input field
      case CHECKBOX:
        return (
          <FormCheckbox
            name={name}
            label={label}
            formItemProps={formItemProps}
            componentsProps={componentsProps as FormCheckboxProps['componentsProps']}
            {...rest}
          />
        );
      case UPLOAD:
        return <FormUpload name={name} label={label} formItemProps={formItemProps} {...rest} />;

      // Render a time picker input field
      case TIME_PICKER:
        return (
          <FormTimePicker
            name={name}
            label={label}
            formItemProps={formItemProps}
            {...rest}
            {...(componentsProps as TimePickerProps)}
          />
        );

      // Render a date picker input field
      case DATE_PICKER:
        return (
          <FormDatePicker
            mode="default"
            name={name}
            label={label}
            formItemProps={formItemProps}
            {...rest}
            {...(componentsProps as CalendarProps & { disabled?: boolean })}
          />
        );

      // Render a switch field
      case SWITCH:
        return (
          <FormSwitch
            name={name}
            label={label}
            formItemProps={formItemProps}
            {...rest}
            {...(componentsProps as SwitchProps)}
          />
        );

      // Render nested form fields
      case FIELD_ARRAY:
        return <FormFieldArray {...rest} name={name} />;

      // Render a custom component
      case CUSTOM_COMPONENT:
        // If the custom component is a valid React element, clone it and return it
        if (React.isValidElement(CustomComponent)) {
          return React.cloneElement(CustomComponent);
        } else {
          // Otherwise, return an error message
          return new Error('Custom component not found or invalid');
        }

      // If the type property is not recognized, log an error message and return an empty fragment
      default:
        console.log('form field of type ' + type + ' not implemented');
        return <></>;
    }
  };

  // Return the appropriate form field component based on the type property in the config object
  return <>{getFormItem()}</>;
};

export default RenderFormItem;
