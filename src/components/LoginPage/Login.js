import React from 'react';
import GetUser from './GetUser';
import Logout from './Logout';

class Login extends React.Component {
    state = {
    loginResult: false,// 로그인 여부에 따라 페이지를 편집하기 위해 추가
    dormitory: '',
    kakaoID: ''
  };

  getInfo = (dorm, kakaoID) => {
    this.setState({dormitory: dorm, kakaoID: kakaoID});
    this.props.getInfo(dorm,kakaoID);
  }
componentDidMount() {
    	/*
	**  scope는 수집할 사용자 정보를 명시한다.
	**  Kakao.Auth.login함수의 인자로 쓴다.
	**  사용자 동의 후 수집할 수 있다. 
	*/
    const scope = "profile_nickname, profile_image"; 
    const home = this;
    let loginResult = false;
// Kakao.Auth.login는 인증에 성공하면 success call back이 실행된다.
    window.Kakao.Auth.login({
      scope,
      // success는 인증 정보를 응답(response)으로 받는다. 
      success: function (response) {
       //카카오 SDK에 사용자 토큰을 설정한다.
        window.Kakao.Auth.setAccessToken(response.access_token);
        //console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);
        loginResult = true;
        // 성공 사항에 따라 페이지를 수정하기 위한 setState
        home.setState({ loginResult });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  render() {
        // 등록된 앱의 JavaScript key
    const jsKey = "f486e195f10981eaa578efffee17ea1e";

    // SDK는 한 번만 초기화해야 한다.
    // 중복되는 초기화를 막기 위해 isInitialized()로 SDK 초기화 여부를 판단한다.
    if (!window.Kakao.isInitialized()) {
      // JavaScript key를 인자로 주고 SDK 초기화
      window.Kakao.init(jsKey);
      // SDK 초기화 여부를 확인하자.
      console.log(window.Kakao.isInitialized());
    }
    /*
    <h1>kakologin{this.state.loginResult ? <GetUser getInfo={this.getInfo}/> : " not yet"}</h1>
        <Logout/>
    */
    return(
      <div>
        <h1>kakologin{this.state.loginResult ? <GetUser getInfo={this.getInfo}/> : " not yet"}</h1>
        <Logout/>
      </div>
    );
  }
}
export default Login;