import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import Container from "@material-ui/core/Container";
//Local
import "./index.css";
import * as actions from "../../store/actions/index";
import { EditMealSchema } from "../../schema/index";
import Error from "../../shared/components/Messages/Error";
import Success from "../../shared/components/Messages/Success";
import RedBtn from "../../shared/components/Buttons/RedBtn";
import Input from "../../shared/components/Form/Input";
import Select from "../../shared/components/Form/Select";
import TextArea from "../../shared/components/Form/TextArea";
import Close from "../../assets/Icon_Close.svg";


 

function Edit({
  meals,
  ing,
  inst,
  editMeal,
  loading,
  close,
  cleanMeals,
  name,
  error,
  success
}) {

  useEffect(() => {
    cleanMeals();
  }, [cleanMeals]);
  return (
    <>
      <Formik
        initialValues={{
          id: meals.id,
          name: name,
          meal: meals.meal, //meal time is brought in
          ingredients: ing,
          instructions: inst
        }}
        validationSchema={EditMealSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await editMeal(meals.id, values);
          setSubmitting(false);
          console.log(success);
          setTimeout(() => cleanMeals(), 3000);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <>
            <Container maxWidth="md" className="mealView-container">
              <div className="edit-top">
                <img
                  style={{ cursor: "pointer" }}
                  src={Close}
                  alt="x"
                  onClick={() => {
                    close();
                  }}
                />

              </div>
              <div className="edit-content">
              <div style={{ position: "absolute"}}>
                {error ? <Error>{error}</Error> : null}
                {success ? <Success>{success}</Success> : null}
              </div>
                <div className="create-header padding">
                  <h1>Edit Recipe</h1>
                  <hr className="hr3" />
                </div>
                <Form className="create-form">
                  <h4 className="create-form-label">Name</h4>
                  <Field type="name" name="name" adjust component={Input} />
                  <h4 className="create-form-label">Meal</h4>
                  <Field type="meal" name="meal" adjust component={Select}>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </Field>
                  <h4 className="create-form-label">Ingredients</h4>
                  <Field
                    type="ingredients"
                    name="ingredients"
                    adjust
                    component={TextArea}
                  />
                  <h4 className="create-form-label">Instructions</h4>
                  <Field
                    type="instructions"
                    name="instructions"
                    adjust
                    component={TextArea}
                  />
                  <div className="edit-btn-wrapper">
                    <RedBtn
                      disabled={!isValid || isSubmitting}
                      loading={loading ? "Saving..." : null}
                      adjust
                      type="submit"
                    >
                      Save changes
                    </RedBtn>
                  </div>
                </Form>
              </div>
            </Container>
          </>
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
  editMeal: actions.editMeal,
  cleanMeals: actions.cleanMeals
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
