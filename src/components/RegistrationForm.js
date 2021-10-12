import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";

import axios from "axios";
import { Button } from "@material-ui/core";

import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

import { changeFetching } from "../store/actions/auth";
import { withSnackbar } from "notistack";

import { withRouter } from "react-router-dom";
import { Width } from "devextreme-react/chart";

const baseUrl = process.env.API_URL;

const listOfQualification = [
  "10th Pass",
  "In Secondary Education",
  "12th Pass/Fail",
  "Graduate",
  "Post Graduate",
  "Dropout",
  "Other",
];
const infoAboutNG = [
  "Info session/Webinar",
  "Social Media Post",
  "Friends/family",
  "Posters/hoardings",
  "Website/Youtube",
  "Other",
];
const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: "30px",
    // maxWidth: 400,
  },
  email: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: "20px",
    maxWidth: 400,

  },
  margin: {
    marginRight: "20px",
    width: 200,
  },
  twoFields: {
    marginLeft: "30px",
    marginRight: "30px",
    width: 250,
  },
  divContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    maxWidth: 200,
    margin: "1px",
  },
  root: {
    maxWidth: 700,
    margin: "auto",
    marginTop: "20px",
  },

  addIcon: {
    position: "absolute",
    marginLeft: "60%",
    top: "9px",
  },
  text: {
    marginBottom: theme.spacing(1),
    color: "black",
  },
  btn: {
    marginTop: theme.spacing(4),
    marginLeft:theme.spacing(25),
  },
});

export class RegistrationForm extends React.Component {
  async addPartner() {
    const { name, email, notes, slug, districts } = this.state;
    let removeExtraDistricts = districts.filter(
      (district) => district.length > 0
    );

    try {
      this.props.fetchingStart();
      const dataURL = baseUrl + "partners";
      const response = await axios.post(
        dataURL,
        {
          name: name,
          email: email,
          notes: notes,
          slug: slug,
          districts: removeExtraDistricts,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );

      this.props.fetchingFinish();
      this.props.history.push("/partners");
    } catch (e) {
      console.log(e);
      this.props.enqueueSnackbar(
        "All fields are mandatory Or Slug should be unique",
        { variant: "error" }
      );
      this.props.fetchingFinish();
    }
  }

  editPartner = (value) => {
    const { name, email, notes, slug, districts } = this.state;
    let removeExtraDistricts = districts.filter(
      (district) => district.length > 0
    );
    axios
      .put(`${baseUrl}partners/${value}`, {
        name: name,
        email: email ? email : null,
        notes: notes,
        districts:
          removeExtraDistricts.length > 0 ? removeExtraDistricts : null,
      })
      .then((response) => {
        this.props.enqueueSnackbar("Partner details Successfull edit", {
          variant: "success",
        });
      })
      .catch((e) => {
        this.props.enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      });
  };

  onSubmit = () => {
    const { value } = this.props;
    if (value) {
      this.editPartner(value);
    } else {
      this.addPartner();
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      slug: "",
      notes: "",
      districts: [""],
    };
  }
  componentDidMount() {
    if (this.props.value) {
      const dataURL = `${baseUrl}partners/${this.props.value}`;
      axios.get(dataURL).then((response) => {
        const data = response.data.data;
        this.setState({
          name: data.name ? data.name : "",
          email: data.email ? data.email : "",
          slug: data.slug ? data.slug : "",
          notes: data.notes ? data.notes : "",
          districts: data.districts ? data.districts : [""],
        });
      });
    }
  }

  addState = () => {
    this.setState({ districts: [...this.state.districts, ""] });
  };

  handleChange = (name) => (event) => {
    let valChange = {};
    valChange[name] = event.target.value;
    this.setState(valChange);
  };

  changeHandler = (index) => {
    const districts = this.state.districts;
    if (event.target.value) {
      districts[index] = event.target.value;
    } else {
      districts.splice(index, 1);
    }
    this.setState({ districts: districts.length < 1 ? [""] : districts });
  };

  render = () => {
    const { classes, value } = this.props;

    return (
      <Card className={classes.root}>
        <Typography component="div" variant="h3" align="center">
          Registration Form
        </Typography>

        <form>
          <div className={classes.container}>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="partnerName">First Name</InputLabel>

              <Input
                id="partnerName"
                aria-describedby="my-helper-text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange("name")}
                required
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Apka First Name
              </FormHelperText>
            </FormControl>

            <FormControl className={classes.margin}>
              <InputLabel htmlFor="partnerEmail">Middle Name</InputLabel>

              <Input
                id="partnerEmail"
                aria-describedby="my-helper-text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange("email")}
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Apka Middle Name
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="partnerNotes">Last Name</InputLabel>
              <Input
                id="partnerNotes"
                aria-describedby="my-helper-text"
                name="notes"
                value={this.state.notes}
                onChange={this.handleChange("notes")}
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Apka Last Name
              </FormHelperText>
            </FormControl>
          </div>
          <div className={classes.container}>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="partnerNotes">Whatsapp Number</InputLabel>
              <Input
              type="number"
                id="partnerNotes"
                aria-describedby="my-helper-text"
                name="notes"
                disabled={value ? true : false}
                value={this.state.slug}
                onChange={this.handleChange("slug")}
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Guardian's Number
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="partnerNotes">Alternative Number</InputLabel>
              <Input
              type="number"
                id="partnerNotes"
                aria-describedby="my-helper-text"
                name="notes"
                disabled={value ? true : false}
                value={this.state.slug}
                onChange={this.handleChange("slug")}
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Guardian's Number
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="partnerNotes">Guardian's Number</InputLabel>
              <Input
              type="number"
                id="partnerNotes"
                aria-describedby="my-helper-text"
                name="notes"
                disabled={value ? true : false}
                value={this.state.slug}
                onChange={this.handleChange("slug")}
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Guardian's Number
              </FormHelperText>
            </FormControl>
          </div>
          <div className={classes.container}>
            <FormControl className={classes.margin}>
              <Select
                name="ownerName"
                //   value={ownerName && { value: ownerId, label: ownerName }}
                onChange={this.handleChange("ownerName")}
                // options={infoAboutNG.map((x) => {
                //   return { value: x, label: x};
                // })}
                placeholder={"Select State"}
                isClearable={false}
                closeMenuOnSelect={true}
                isSearchable={true}
              //   isDisabled={isEdit ? true : false}
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Please select State
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.margin}>
              <Select
                name="ownerName"
                //   value={ownerName && { value: ownerId, label: ownerName }}
                onChange={this.handleChange("ownerName")}
                //   options={data.map((x) => {
                //     return { value: x.id, label: x.user };
                //   })}
                placeholder={"Select Districts"}
                isClearable={false}
                closeMenuOnSelect={true}
                isSearchable={true}
              //   isDisabled={isEdit ? true : false}
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Please select Districts
              </FormHelperText>
            </FormControl>
            <FormControl
              style={{
                marginRight: 0,
              }}
              className={classes.margin}
            >
              <Select
                name="ownerName"
                //   value={ownerName && { value: ownerId, label: ownerName }}
                onChange={this.handleChange("ownerName")}
                //   options={data.map((x) => {
                //     return { value: x.id, label: x.user };
                //   })}
                placeholder={"Select City"}
                isClearable={false}
                closeMenuOnSelect={true}
                isSearchable={true}
              //   isDisabled={isEdit ? true : false}
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Please select City
              </FormHelperText>
            </FormControl>
          </div>
          <div className={classes.container}>
            <FormControl
              // style={{
              //   marginTop: "20px",
              // }}
              className={classes.margin}

            >
              <Select
                name="ownerName"
                //   value={ownerName && { value: ownerId, label: ownerName }}
                onChange={this.handleChange("ownerName")}
                options={listOfQualification.map((x) => {
                  return { value: x, label: x };
                })}
                placeholder={"Select Owner"}
                isClearable={false}
                closeMenuOnSelect={true}
                isSearchable={true}
              //   isDisabled={isEdit ? true : false}
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Please select latest education qualification
              </FormHelperText>
            </FormControl>
            <FormControl
              // style={{
              //   marginBottom: "20px",
              // }}
              className={classes.margin}
            >

              <Select
                name="ownerName"
                //   value={ownerName && { value: ownerId, label: ownerName }}
                onChange={this.handleChange("ownerName")}
                options={["Yes", "No"].map((x) => {
                  return { value: x, label: x };
                })}
                placeholder={"Select Owner"}
                isClearable={false}
                closeMenuOnSelect={true}
                isSearchable={true}
              //   isDisabled={isEdit ? true : false}
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Are you interested in the program?
              </FormHelperText>
            </FormControl>
            <FormControl
              // style={{
              //   marginBottom: "20px",
              // }}
              className={classes.margin}
              style={{
                marginRight: 0,
              }}
            >

              <Select
                name="ownerName"
                //   value={ownerName && { value: ownerId, label: ownerName }}
                onChange={this.handleChange("ownerName")}
                options={infoAboutNG.map((x) => {
                  return { value: x, label: x };
                })}
                placeholder={"Select Owner"}
                isClearable={false}
                closeMenuOnSelect={true}
                isSearchable={true}
              //   isDisabled={isEdit ? true : false}
              />
              <FormHelperText className={classes.text} id="my-helper-text">
                Where did you hear about us ?
              </FormHelperText>
            </FormControl>
          </div>

          <FormControl

          >
            <InputLabel htmlFor="partnerNotes">Email Id</InputLabel>
            <Input
              id="partnerNotes"
              aria-describedby="my-helper-text"
              name="notes"
              disabled={value ? true : false}
              value={this.state.slug}
              onChange={this.handleChange("slug")}
            />
          </FormControl>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            onClick={this.onSubmit}
            className={classes.btn}
            size="large"
          >
           Please Register Yourself

          </Button>
        </form>
      </Card>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchingStart: () => dispatch(changeFetching(true)),
  fetchingFinish: () => dispatch(changeFetching(false)),
});

export default withSnackbar(
  withRouter(
    withStyles(styles)(connect(undefined, mapDispatchToProps)(RegistrationForm))
  )
);
