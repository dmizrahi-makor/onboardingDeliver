import { useContext } from "react";
import axios from "axios";
import { makeStyles, TextField } from "@material-ui/core";
import FieldContext from "../context/fields";
import AuthContext from "../context/auth";

import { useDebouncedCallback } from "use-debounce";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "0px",
    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl":
      {
        border: "0px",
      },
    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth.MuiInputBase-formControl":
      {
        borderRadius: "0",
      },
    "& .MuiInputLabel-outlined": {
      textAlign: "center",

      letterSpacing: "0px",
      color: "#8A8A8A",
      opacity: "1",
    },
  },
  textField: {
    "& > .MuiInputLabel-root": {
      [theme.breakpoints.down("sm")]: { fontSize: "13px" },
    },
  },
}));
// {"name":"11 Derech Menachem Begin","location":{"lat":100.123456,"lon":-90.987654}}

const DispatcherField = (props) => {
  const { fieldState, setFieldState } = useContext(FieldContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const classes = useStyles();

  const handleChange = async (e) => {
    let fieldToUpdate = {};
    console.log("BEFORE IG ID", e);
    if (
      e.target.id === "registration_gapi_location" ||
      e.target.id === "business_gapi_location"
    ) {
      console.log("inside the gapi condition");
      console.log("TARGET ID", e.target.id);
      fieldToUpdate = {
        field: e.target.id,
        value: [
          {
            name: "11 Derech Menachem Begin",
            location: { lat: 100.123456, lon: -90.987654 },
          },
        ],
      };
    } else {
      fieldToUpdate = {
        field: e.target.id,
        value: fieldState[e.target.id],
      };
    }

    axios
      .put(
        `http://10.0.0.191:3030/api/onboarding/${authState.uuid}`,
        fieldToUpdate
      )
      .then((res) => {
        if (res.status === 200) {
          setAuthState((prev) => ({
            ...authState,
            progress: res.data.progress,
          }));
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const debounced = useDebouncedCallback(handleChange, 400);

  return (
    <TextField
      className={classes.textField}
      id={props.id}
      fullWidth
      onChange={(e) => {
        setFieldState((prev) => {
          return {
            ...prev,
            [props.id]: e.target.value,
          };
        });
        debounced(e);
      }}
      inputProps={{ style: { padding: 2 } }}
      label={props.label}
      value={fieldState[props.id]}
      variant="outlined"
      maxRows={props.maxRows}
      rows={props.rows}
      multiline
    />
  );
};

export default DispatcherField;
