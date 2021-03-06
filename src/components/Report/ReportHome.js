import React, {Component} from 'react'
import axios from "axios";
import ReportStudent from './ReportStudent.js'
import ReportAdmin from './ReportAdmin.js'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class ReportHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      kakaoID: "",
      profile: "",
      isAdmin: null,
      backdropopen: true,
    }
  }
  componentDidMount(){
    const GetID = this;
    window.Kakao.API.request({
        url: "/v2/user/me",
        success: function ({ id, kakao_account }) {
            GetID.setState({
            kakaoID: id,
            profile: kakao_account.profile_image_url
            });
            //id로 유저 정보 받아옴
            axios.get(`/api/user/${id}`)
            .then(response => { 
                console.log(response.data.isAdmin);
                console.log(GetID.state.kakaoID);
                GetID.setState({isAdmin: response.data.isAdmin});
            });
        },
        fail: function (error) {
            console.log(error);
        },
    });
  }
  handleClose = () => {
    this.setState({backdropopen: false});
  };
    
  render(){
    const {kakaoID, profile, isAdmin, backdropopen } = this.state;

    if(isAdmin == null) {
      return (
      <div>
      <Backdrop open={backdropopen} onClick={this.handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      </div>
      );
    }
    

    return (
      <div>
        {
          isAdmin ?
          <ReportAdmin/> :
          <ReportStudent></ReportStudent>
        }
      </div>
        
    );
    
  }
}
export default ReportHome;

