import { INPUT_TYPE_MAX_LENGTH, INPUT_TYPE_MIN_LENGTH } from "./constants";

export const getFieldValidationMessage = (
  fieldName: string,
  type: "input" | "invalid" | "required"
): string => {
  return {
    input: () =>
      `${fieldName} length should be between ${INPUT_TYPE_MIN_LENGTH} and ${INPUT_TYPE_MAX_LENGTH}`,
    invalid: () => `${fieldName} is not valid`,
    required: () => `${fieldName} is required`,
  }[type]();
};
