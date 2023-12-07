import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

interface TextInputProps extends InputProps {
  label?: string;
  errorText?: string | string[];
  helperText?: string;
}

const TextInput = forwardRef(
  ({ label, errorText, helperText, ...props }: TextInputProps, ref) => {
    const errorMsg = Boolean(errorText) && (
      <FormErrorMessage>{errorText}</FormErrorMessage>
    );

    const helperMsg = Boolean(helperText) && (
      <FormHelperText>{helperText}</FormHelperText>
    );

    return (
      <FormControl isInvalid={Boolean(errorText)}>
        {Boolean(label) && <FormLabel htmlFor={props.name}>{label}</FormLabel>}
        <Input id={props.name} size="lg" {...props} ref={ref} />
        {errorText ? errorMsg : helperMsg}
      </FormControl>
    );
  }
);

export default TextInput;
