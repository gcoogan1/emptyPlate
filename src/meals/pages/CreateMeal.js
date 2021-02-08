import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import Container from "@material-ui/core/Container";
//Local
import "./index.css";
import * as actions from "../../store/actions/index";
import { MealSchema } from "../../schema/index";
import BackgroundColor from "../../shared/components/BackgroundColor/BackgroundColor";
import Left from "../../assets/Path 3.svg";
import Error from "../../shared/components/Messages/Error";
import Success from "../../shared/components/Messages/Success";
import RedBtn from "../../shared/components/Buttons/RedBtn";
import Input from "../../shared/components/Form/Input";
import Select from "../../shared/components/Form/Select";
import TextArea from "../../shared/components/Form/TextArea";

function CreateMeal({ cleanMeals, loading, error, addMeal, success }) {
  const history = useHistory();

  useEffect(() => {
    cleanMeals();
    window.scrollTo(0, 0);
  }, [cleanMeals]);
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          meal: "",
          ingredients: "",
          instructions: ""
        }}
        validationSchema={MealSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await addMeal(values);
          setSubmitting(false);
          resetForm();
          setTimeout(() => (cleanMeals() && history.goBack()), 3000);   
        }}
      >
        {({ isSubmitting, isValid }) => (
          <BackgroundColor darker>
            <div className="create-alert">
              {error ? <Error>{error}</Error> : null}
              {success ? <Success>{success}</Success> : null}
            </div>
            <div className="mealTime-arrow">
              <img
                src={Left}
                onClick={() => {
                  history.goBack();
                }}
                alt="arrow"
              />
            </div>
            <Container className="create-container" maxWidth="md">
              <div className="create-content">
                <div className="create-header">
                  <h1>New Recipe</h1>
                  <hr className="hr3" />
                </div>
                <Form className="create-form">
                  <h4 className="create-form-label">Name</h4>
                  <Field
                    type="name"
                    name="name"
                    placeholder="Mom’s Spaghetti"
                    component={Input}
                  />
                  <h4 className="create-form-label">Meal</h4>
                  <Field type="meal" name="meal" component={Select}>
                    <option>Choose a time...</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </Field>
                  <h4 className="create-form-label">Ingredients</h4>
                  <Field
                    type="ingredients"
                    name="ingredients"
                    placeholder="Seperate ingredients with a (,)"
                    component={TextArea}
                  />
                  <h4 className="create-form-label">Instructions</h4>
                  <Field
                    type="instructions"
                    name="instructions"
                    placeholder="Seperate ingredients with a (,)"
                    component={TextArea}
                  />
                  <RedBtn
                    disabled={!isValid || isSubmitting}
                    loading={loading ? "Creating..." : null}
                    type="submit"
                  >
                    Create Recipe
                  </RedBtn>
                </Form>
              </div>
            </Container>
          </BackgroundColor>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ meals }) => ({
  loading: meals.loading,
  error: meals.error,
  success: meals.success
});

const mapDispatchToProps = {
  addMeal: actions.addMeal,
  cleanMeals: actions.cleanMeals
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMeal);
