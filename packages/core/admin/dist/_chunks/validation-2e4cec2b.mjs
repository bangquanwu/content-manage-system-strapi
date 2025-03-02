import { translatedErrors } from "@strapi/helper-plugin";
import * as yup from "yup";
const COMMON_USER_SCHEMA = {
  firstname: yup.string().trim().required(translatedErrors.required),
  lastname: yup.string(),
  email: yup.string().email(translatedErrors.email).lowercase().required(translatedErrors.required),
  username: yup.string().nullable(),
  password: yup.string().min(8, translatedErrors.minLength).matches(/[a-z]/, "components.Input.error.contain.lowercase").matches(/[A-Z]/, "components.Input.error.contain.uppercase").matches(/\d/, "components.Input.error.contain.number"),
  confirmPassword: yup.string().min(8, translatedErrors.minLength).oneOf([yup.ref("password"), null], "components.Input.error.password.noMatch").when("password", (password, passSchema) => {
    return password ? passSchema.required(translatedErrors.required) : passSchema;
  })
};
export {
  COMMON_USER_SCHEMA as C
};
//# sourceMappingURL=validation-2e4cec2b.mjs.map
