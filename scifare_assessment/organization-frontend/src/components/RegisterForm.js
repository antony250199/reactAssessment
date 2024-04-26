import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
// import BootstrapInput from '@material-ui/core/BootstrapInput';
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import userService from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  nation: {
    border: "1px solid black",
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "user",
    organization: "",
  });
  const [userType, setUserType] = useState("User");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setUser({ ...user, [name]: value });
  };

  const signUp = (e) => {
    e.preventDefault();

    userService
      .registerUser(user)
      .then((res) => {
        if (res.data.status) {
          navigate("/");
        } else {
          let message =
            typeof res?.data?.message != "string"
              ? res?.data?.message[0]
              : res?.data?.message;
          toast.error(message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={signUp}
    >
      <div>
        <h1 id="RegisterForm">Register Form</h1>
        <TextField
          required
          id="outlined-required"
          label="Username"
          variant="outlined"
          defaultValue={user.username}
          name="username"
          onChange={handleChange}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          variant="outlined"
          defaultValue={user.password}
          name="password"
          onChange={handleChange}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
          <Select
            native
            value={user.role}
            onChange={handleChange}
            name="role"
            label="Role"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
        </FormControl>
        {/* {user.role == "Admin" && ( */}
        <TextField
          id="outlined-required"
          label="Organization"
          variant="outlined"
          defaultValue={user.organization}
          name="organization"
          onChange={handleChange}
        />
        {/* )} */}

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
