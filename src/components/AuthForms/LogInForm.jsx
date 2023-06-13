import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { TweetBtn } from "../../UI/Buttons/Buttons";
import "../../css/LogInForm.css";

export const LogInForm = () => {
  const { logIn } = useAuth();
  const history = useNavigate();

  const onSubmit = async (values) => {
    await logIn(values);
  };

  return (
    <div>
      <Formik
        initialValues={{ text: "", password: "" }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="text"></label>
            <Field
              type="text"
              name="text"
              placeholder="Enter username"
              className="Field"
            />
            <ErrorMessage name="text" component="div" />
            <label htmlFor="password"></label>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
              className="Field"
            />
            <ErrorMessage name="password" component="div" />
            <TweetBtn type="submit" disabled={isSubmitting} text="Login" />
          </Form>
        )}
      </Formik>
    </div>
  );
};
