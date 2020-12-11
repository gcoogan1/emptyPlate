//Form
import * as Yup from "yup";

//YUP SCHEMAS (Auth & Meal)
//{note: a schema must match the intialValues in Formik}

//Auth Schemas

//Signup
export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .required("Your name is required.")
    .min(3, "Too short.")
    .max(25, "Too long."),
  email: Yup.string()
    .email("Invalid email.")
    .required("Your email is required."),
  password: Yup.string()
    .required("Password must be at least 8 characters long.")
    .min(8, "Password is too short."), //Firebase needs 8 characters
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], `Password doesn't match`) //Ref to password(above) to check against
    .required("You need to confirm your password.")
});

//Login
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email.") //error message
    .required("Your email is required."),
  password: Yup.string()
    .required("Your password is required.")
    .min(8, "Too short.")
});

//Reset Password
export const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email.") //error message
    .required("Your email is required.")
});

//Edit Profile
export const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required("Your first name is required.")
    .min(3, "Too short.")
    .max(25, "Too long."),
  email: Yup.string()
    .email("Invalid email.")
    .required("The email is required.")
});

//Update Password
export const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password must be at least 8 characters long.")
    .min(8, "Password is too short."), //Firebase needs 8 characters
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], `Password doesn't match.`) //Ref to password(above) to check against
    .required("You need to confirm your password.")
});

//Create Meal
export const MealSchema = Yup.object().shape({
  name: Yup.string()
    .required("The meal is required.")
    .min(4, "Too short.")
    .max(25, "Too long."),
  meal: Yup.string()
  .required("Time is required."),
  ingredients: Yup.string()
    .required("Ingredients are required.")
    .min(8, "Too short."),
  instructions: Yup.string()
    .required("Instructions are required.")
    .min(10, "Too short.")
});

//Edit Meal
export const EditMealSchema = Yup.object().shape({
  name: Yup.string()
    .required("The meal is required.")
    .min(4, "Too short.")
    .max(25, "Too long."),
  meal: Yup.string().required("Time is required."),
  ingredients: Yup.string()
    .required("Ingredients are required.")
    .min(8, "Too short."),
  instructions: Yup.string()
    .required("Instructions are required.")
    .min(10, "Too short.")
});
