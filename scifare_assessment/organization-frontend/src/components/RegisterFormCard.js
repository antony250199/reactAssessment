import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import RegisterForm from "./RegisterForm";

const RegisterFormCard = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{
            backgroundColor: "white",
            height: "auto",
            width: "600px",
            padding: "20px",
            border: "5px solid blue ",
            marginTop: "50px",
            marginLeft: "150px",
            borderRadius: "20px",
          }}
        >
          <RegisterForm />
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default RegisterFormCard;
