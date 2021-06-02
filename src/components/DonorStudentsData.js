import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import StudentService from "../services/StudentService";
import { withRouter } from "react-router-dom";

import MainLayout from "./MainLayout";

const baseUrl = process.env.API_URL;

class DonorStudentsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.fetching();
  }

  fetching = async () => {
    const dataURL =
      baseUrl + `donor/progress_made/${this.props.match.params.donorId}`;
    const response = await axios.get(dataURL);
    const studentData = response.data.data.map((student) => {
      return {
        ...student,
        gender: student.gender == 1 ? "Female" : "Male",
        loggedInUser: this.props.loggedInUser.mail_id,
      };
    });
    this.setState({ data: studentData });
    console.log(this.state.data, "data");
    console.log(this.props.match.params, "response");
  };
  render() {
    // console.log(this.state.data, "params");
    console.log(this.props.loggedInUser.mail_id, "props");
    console.log(this.state.data, "komal");
    // console.log(StudentService["DonorData"], "dataTyoe");
    return (
      <MainLayout
        columns={StudentService["DonorData"]}
        data={this.state.data}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  loggedInUser: state.auth.loggedInUser,
});
export default withRouter(connect(mapStateToProps)(DonorStudentsData));
