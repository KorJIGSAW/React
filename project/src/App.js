import React, { Component } from 'react';

// 사용자 정보를 관리하는 클래스
class User {
  constructor(nickname) {
    this.nickname = nickname; // 사용자의 닉네임
    this.score = 0; // 사용자의 점수
  }
}

// 게임을 실행하는 클래스
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0, // 게임 점수
      // 여기에 게임에 필요한 상태들을 작성하면돼! 예를 들면, 점프 여부나 장애물 위치 등등? 생각나는거 작성해봥
    };
  }

  //여기에는 게임 메소드를 작성하면돼 이것도 예를 들자면, 공룡이 점프하는 메소드나 장애물이 오는 속도 메소드, 장애물 충돌여부?

  // 게임 화면을 출력하는 메소드
  render() {
    return (
      <div>
        {/* 게임 화면 출력 */}
        <h1>Score: {this.state.score}</h1> {/* 점수 출력 */}
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div style={{padding: '10px', border: '1px solid black'}}>Dino</div> {/* 공룡 표시 */}
          <div style={{padding: '10px', border: '1px solid black'}}>Obstacle</div> {/* 장애물 표시 */}
        </div>
      </div>
    );
  }
}

// App메인 클래스
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [], // 등록된 사용자들
      currentUser: null, // 현재 로그인한 사용자
      signupForm: { // 회원가입 폼의 상태
        nickname: '',
        password: ''
      },
      loginForm: { // 로그인 폼의 상태
        nickname: '',
        password: ''
      },
      gameStarted: false // 게임 시작 상태
    };
  }

  // 회원가입 폼의 입력을 처리하는 메소드
  handleSignupChange = (e) => {
    this.setState({ 
      signupForm: {
        ...this.state.signupForm,
        [e.target.name]: e.target.value 
      }
    });
  }

  // 로그인 폼의 입력을 처리하는 메소드
  handleLoginChange = (e) => {
    this.setState({ 
      loginForm: {
        ...this.state.loginForm,
        [e.target.name]: e.target.value 
      }
    });
  }

  // 회원가입을 처리하는 메소드
  handleSignup = (e) => {
    e.preventDefault();
    const newUser = new User(this.state.signupForm.nickname); // 새 User 인스턴스 생성
    this.setState({ 
      users: [...this.state.users, newUser], // 새 사용자 추가
      signupForm: {
        nickname: '',
        password: ''
      }
    });
  }

  // 로그인을 처리하는 메소드
  handleLogin = (e) => {
    e.preventDefault();
    const user = this.state.users.find((user) => user.nickname === this.state.loginForm.nickname); // 닉네임이 일치하는 사용자 찾기
    this.setState({ 
      currentUser: user, // 현재 사용자 설정
      loginForm: {
        nickname: '',
        password: ''
      }
    });
  }

  // 게임 시작을 처리하는 메소드
  handleStartGame = () => {
    this.setState({ gameStarted: true }); // 게임 시작 상태 변경
  }

  // 화면을 출력하는 메소드
  render() {
    return (
      <div className="App">
        {this.state.currentUser ? 
          (this.state.gameStarted ? 
            <Game user={this.state.currentUser} /> : // 로그인한 경우, 게임 시작 시 게임 화면 출력
            <div> 
              <button onClick={this.handleStartGame}>게임 시작</button> {/* 게임 시작 버튼 */}
              <p>게임 설명: 장애물을 피해 점수를 획득하는 게임입니다.</p> {/* 게임 설명 */}
              <p>게임 랭킹: 랭킹 정보를 여기에 출력할 수 있습니다.</p> {/* 게임 랭킹 */}
            </div>
          ) : (
            <div>
              <form onSubmit={this.handleSignup}>
                <h2>회원가입</h2>
                <input type="text" name="nickname" value={this.state.signupForm.nickname} onChange={this.handleSignupChange} placeholder="닉네임을 입력하세요" />
                <input type="password" name="password" value={this.state.signupForm.password} onChange={this.handleSignupChange} placeholder="비밀번호를 입력하세요" />
                <button type="submit">회원가입</button>
              </form>
              <form onSubmit={this.handleLogin}>
                <h2>로그인</h2>
                <input type="text" name="nickname" value={this.state.loginForm.nickname} onChange={this.handleLoginChange} placeholder="닉네임을 입력하세요" />
                <input type="password" name="password" value={this.state.loginForm.password} onChange={this.handleLoginChange} placeholder="비밀번호를 입력하세요" />
                <button type="submit">로그인</button>
              </form>
            </div>
        )}
      </div>
    );
  }
}

export default App;
