import React, { useContext, useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Modal, Typography, makeStyles } from "@material-ui/core";
import AuthContext from "../context/auth";

const useStyles = makeStyles({
  simpleForm: {
    minHeight: "100vh",
    alignItems: "center",
    "& > .MuiGrid-root.MuiGrid-item": {
      boxShadow: "0 .7rem 2.5rem -5px rgba(0,0,0,.1)",
      textAlign: "center",
      padding: "2rem",
      justifyContent: "center",
    },
    "& > .MuiGrid-root.MuiGrid-item > .MuiGrid-root.MuiGrid-container": {
      marginBottom: "2rem",
    },
  },
});

const SimpleForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [company, setCompany] = useState();
  const [isLogged, setLogged] = useState(false);
  const { setAuthState } = useContext(AuthContext);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      client_name: name,
      client_email: email,
      client_phone: phone,
      client_company: company,
    };

    axios
      .post(`${process.env.REACT_BASE_URL}api/contact`, data)
      .then((res) => {
        console.log("login res", res);
        if (res.status === 200) {
          const isNewUser = res.data.isNewUser;
          if (isNewUser) setAuthState((prev) => ({ ...prev, isNewUser }));
          setLogged(true);
          ////////////////save uuid in redux
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { value, id } = e.target;
    switch (id) {
      case "client_name":
        setName(value);
      case "client_email":
        setEmail(value);
      case "client_phone":
        setPhone(value);
      case "client_company":
        setCompany(value);
      default:
        return null;
    }
  };

  return (
    <Grid container className={classes.simpleForm}>
      <Grid item onSubmit={handleSubmit}>
        <Grid
          container
          justifyContent="center"
          sx={{ display: "flex", marginTop: "100px" }}
          spacing={3}
        >
          <Grid item md={6}>
            <TextField
              variant="outlined"
              required
              onChange={handleChange}
              id="client_name"
              label="Name"
              margin="normal"
              sx={{ border: "solid 1px grey" }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              inputProps={{ style: { color: "white" } }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              variant="outlined"
              required
              onChange={handleChange}
              id="client_email"
              label="Email"
              margin="normal"
              sx={{ border: "solid 1px grey" }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              inputProps={{ style: { color: "white" } }}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              variant="outlined"
              required
              onChange={handleChange}
              id="client_phone"
              label="Phone"
              sx={{ border: "solid 1px grey" }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              inputProps={{ style: { color: "white" } }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              variant="outlined"
              required
              onChange={handleChange}
              id="client_company"
              label="Company"
              sx={{ border: "solid 1px grey" }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              inputProps={{ style: { color: "white" } }}
            />
          </Grid>
        </Grid>
        <Button
          sx={{
            color: "#f1783f",
            width: "100px",
            border: "solid 3px #f1783f",
            margin: "2px",
            display: "block",
            margintop: "24px",
            marginLeft: "auto",
          }}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Grid>

      <Modal open={isLogged}>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Success!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You can now proceed to the link sent to you the phone number you
            provided
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
};
export default SimpleForm;
