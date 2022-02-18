// creating a re-usable validation functionality
//validation
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validatabeInput: Validatable) {
  let isValid = true;
  if (validatabeInput.required) {
    isValid = isValid && validatabeInput.value.toString().trim().length !== 0;
  }
  if (
    validatabeInput.minLength != null &&
    typeof validatabeInput.value == 'string'
  ) {
    isValid =
      isValid && validatabeInput.value.length >= validatabeInput.minLength;
  }
  if (
    validatabeInput.maxLength != null &&
    typeof validatabeInput.value === 'string'
  ) {
    isValid =
      isValid && validatabeInput.value.length <= validatabeInput.maxLength;
  }
  if (
    validatabeInput.min != null &&
    typeof validatabeInput.value === 'number'
  ) {
    isValid = isValid && validatabeInput.value >= validatabeInput.min;
  }
  if (
    validatabeInput.max != null &&
    typeof validatabeInput.value === 'number'
  ) {
    isValid = isValid && validatabeInput.value <= validatabeInput.max;
  }
  return isValid;
}
