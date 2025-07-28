export const required = (message?: string) => ({
  required: message || "Trường này là bắt buộc",
});

export const minLength = (length: number, message?: string) => ({
  minLength: { value: length, message: message || `Tối thiểu ${length} ký tự` },
});

export const maxLength = (length: number, message?: string) => ({
  maxLength: { value: length, message: message || `Tối đa ${length} ký tự` },
});

export const emailPattern = () => ({
  pattern: {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "Email không hợp lệ",
  },
});
