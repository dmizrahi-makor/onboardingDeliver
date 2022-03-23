import React, { useContext, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import validator from "validator";
import StyledButton from "../components/StyledButton";
import axios from "axios";
import { Typography, Snackbar } from "@material-ui/core";
import AuthContext from "../context/auth";
import { useStyles } from "../styles/SmallForm";
import DialPhoneAutoComplete from "./DialPhoneAutoComplete";
import FormContext from "../context/form";
import { END_POINT, BASE_URL } from "../constants";

const SimpleForm = () => {
  // const [info, setInfo] = useState({
  //   company: "",
  //   name: "",
  //   email: "",
  //   phone: "",
  //   dialCode: "",
  // });

  const [errors, setErrors] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
  });

  const { authState, setAuthState } = useContext(AuthContext);
  const { formState, setFormState } = useContext(FormContext);
  const classes = useStyles();
  const [isSubmitted, setSubmitted] = useState(false);

  useEffect(() => {}, [formState]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formState.name,
      email: [formState.email],
      phone: [
        {
          dialing_code: formState.dialCode,
          number: formState.phone,
        },
      ],
      client_company_legal_name: formState.company,
    };

    console.log("data", data);
    setSubmitted(true);
    axios
      .post(
        `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.ONBOARDINGSIMPLEFORM}`,
        data
      )
      .then((res) => {
        if (res.status === 200) {
          const isNewUser = res.data.isNewUser;
          if (isNewUser) setAuthState((prev) => ({ ...prev, isNewUser }));
          ////////////////save uuid in redux
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { value, id } = e.target;

    const truncId = id.substr(7);
    console.log("FORM FIELD", formState, value, truncId);
    console.log(
      "🚀 ~ file: SimpleForm.js ~ line 97 ~ handleBlur ~ truncId",
      e.target.id
    );
    setFormState((prev) => ({
      ...prev,
      [truncId]: value,
    }));

    if (validator.isEmpty(value)) {
      setErrors((prev) => ({
        ...prev,
        [truncId]: "Field is empty",
      }));

      return;
    }

    switch (truncId) {
      case "name":
        if (!validator.isAlpha(value)) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: "Must contain only letters.",
          }));

          return;
        }
        break;
      case "email":
        if (!validator.isEmail(value)) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: "Not a valid email address.",
          }));

          return;
        }
        break;
      case "phone":
        if (validator.isAlpha(value)) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: "Not a valid phone number.",
          }));

          return;
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [truncId]: "",
    }));
  };

  const handleBlur = (e) => {
    const truncId = e.target.id.substr(7);
    console.log(
      "🚀 ~ file: SimpleForm.js ~ line 97 ~ handleBlur ~ truncId",
      e.target.id
    );

    if (validator.isEmpty(formState && formState[truncId])) {
      setErrors((prev) => ({
        ...prev,
        [truncId]: "Field is empty",
      }));

      return;
    }

    switch (truncId) {
      case "name":
        if (!validator.isAlpha(formState && formState[truncId])) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: "Must contain only letters.",
          }));

          return;
        }
        break;
      case "email":
        if (!validator.isEmail(formState && formState[truncId])) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: "Not a valid email address.",
          }));

          return;
        }
        break;
      case "phone":
        if (validator.isAlpha(formState && formState[truncId])) {
          setErrors((prev) => ({
            ...prev,
            [truncId]: "Not a valid phone number.",
          }));

          return;
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [truncId]: "",
    }));
  };

  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };
  const handleDialCode = (e) => {
    setFormState((prev) => ({
      ...prev,
      dialingCode: e.dialing_code,
    }));
  };
  console.log("FORM STATE", formState);
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container className={classes.simpleForm}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.clientInformation}>
                Client Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ marginTop: "20px" }} spacing={2}>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    // onBlur={handleCh}
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    id="client_company"
                    label="Company Legal Name"
                    className={classes.inputFields}
                    error={!!errors.company}
                    helperText={errors.company}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    // onBlur={handleCh}
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange}
                    id="client_name"
                    label="Name"
                    // multiline
                    // maxRows={9}
                    // rows='9'
                    className={classes.inputFields}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItemContainer}>
                  <TextField
                    // onBlur={handleCh}
                    type="email"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange}
                    id="client_email"
                    label="Email"
                    className={classes.inputFields}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid container className={classes.dialAutoCompleteContainer}>
                    <Grid className={classes.dialAutoComplete} item>
                      <DialPhoneAutoComplete
                        handleChange={handleDialCode}
                        // handleBlur={handleCh}
                        // loggedUserCountry={userCountry}
                      />
                    </Grid>
                    <Grid item className={classes.dialAutoCompleteNumber}>
                      <TextField
                        // onBlur={handleCh}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={handleChange}
                        id="client_phone"
                        label="Phone"
                        className={classes.inputFields}
                        error={!!errors.phone}
                        helperText={errors.phone}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.gridItemButtonContainer}>
                  <StyledButton
                    // type="submit"
                    className={classes.sendButton}
                    type="submit"
                  >
                    Send
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isSubmitted}
          onClose={handleCloseSnackbar}
          message="Please proceed via the link sent to your email address."
          key={"snackbarKey"}
          autoHideDuration={5000}
        />

        {/* <Modal className={classes.ModalContainer} open={isLogged}>
          <Box className={classes.ModalBoxContainer}>
            <Typography
              className={classes.modalTextFontTitle}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Success!
            </Typography>

            <Typography
              className={classes.modalTextFont}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              You can now proceed to the link sent to you the phone number you
              provided
            </Typography>
            <StyledButton
              onClick={() => {
                setLogged(false);
              }}
              className={classes.modalButton}
            >
              Close
            </StyledButton>
          </Box>
        </Modal> */}
      </Grid>
    </Box>
  );
};
export default SimpleForm;
