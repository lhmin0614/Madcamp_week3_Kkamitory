import React, {Component} from 'react'
import axios from "axios";
import "./ReportStudent.css"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
}
class ReportStudent extends Component {
  constructor(props){
        super(props);
        this.state={
          isLogin : false,
          name : "",
          bChecked : false,
          report_name : "",
          alertsave: false,
          alertlogin: false,
          alertinput: false,
        }
    }

    componentDidMount = () => {

      
      const GetUser = this;
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: function ({ kakao_account }) {
          const { profile } = kakao_account;
          // 수집한 사용자 정보로 페이지를 수정하기 위해 setState
          GetUser.setState({
            name: profile.nickname,
          });
          if(profile.nickname != null){
            GetUser.setState({
                isLogin: true
              });
          }
          else{
            GetUser.setState({
                isLogin: false
            });
          }
        },
        fail: function (error) {console.log(error);},
      });
    }

    checkHandler = (e) => {
      if(e.checked==false){
        this.setState({bChecked: true})
      }else{
        this.setState({bChecked:false})
      }
    };
    
    
    saveBtnClicked = () => {
      if(this.title.value==="" || this.content.value==="" || this.address.value===""){ //빈칸 존재
        console.log("이혜민 고쳤다!!!!"); //이혜민이혜민이혜민이혜민이혜민이혜민이혜민이혜민이혜민
        this.setState({alertinput: true})
      }
      else{
        if(this.state.bChecked){                  //익명처리
          this.setState({report_name : ""})
        }else{
          this.setState({report_name : this.state.name})  //카카오 이름 그대로
        }
        const data = {
                    report_name : this.state.report_name,
                    report_title : this.title.value,
                    report_content : this.content.value,
                    report_address : this.address.value
        }
        console.log(data);
        this.setState({alertsave: true})
        axios.post(`/api/report/add`, data).then(response => {console.log(response.data);});
      }
        
    }
    handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      this.setState({
          alertsave: false,
          alertlogin: false,
          alertinput: false
      });
  }
    
  render(){
    const {  } = this.state;
    return (
      <div>
        <h3 className= "page_title">
                        <img className = "main_img" src= "/img/alert.png"></img>
                        <em className="main_text">
                            신고하기
                        </em>
                        <span className="detail_text">
                            실시간 신고 접수
                        </span>
          </h3> 
          <form  name = "report_upload" class = "report_form_box" onSubmit={this.handleSubmit}>
                <div class = "checkbox_wrapper">
                  <input type="checkbox" name="anonymous" onChange = {(e) => this.checkHandler(e)}></input>
                  <span class = "checkbox_text">익명</span>
                </div> 
                <div>
                  <div class = "report_text">제목</div>
                  <input class = "report_form_box_category" placeholder="title" ref={node => this.title = node}/>
                </div>
                <div>
                  <div class = "report_text">기숙사 / 호수</div>
                  <input class = "report_form_box_category" placeholder="address" ref ={node => this.address = node}/>
                </div>
                <div>
                  <div class = "report_text">신고내역</div>
                  <input class = "report_form_box_category report_content" placeholder="content" ref={node => this.content = node}/>
                </div>
                <div class = "submitbutton_wrapper">
                  <div class = "submitbutton" onClick = {this.saveBtnClicked}>Save</div> 
                </div>
                
            </form>
            <Snackbar open={this.state.alertsave} autoHideDuration={3000} onClose={this.handleCloseAlert}>
                <Alert onClose={this.handleCloseAlert} severity="success">
                접수가 완료되었습니다
                </Alert>
            </Snackbar>
            <Snackbar open={this.state.alertlogin} autoHideDuration={3000} onClose={this.handleCloseAlert}>
                <Alert onClose={this.handleCloseAlert} severity="warning">
                로그인이 되어 있지 않습니다
                </Alert>
            </Snackbar>
            <Snackbar open={this.state.alertinput} autoHideDuration={3000} onClose={this.handleCloseAlert}>
                <Alert onClose={this.handleCloseAlert} severity="warning">
                입력되지 않는 칸이 있습니다
                </Alert>
            </Snackbar>
      </div>
    );
  }
}
export default ReportStudent;

