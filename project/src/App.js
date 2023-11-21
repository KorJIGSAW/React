import React, { Component } from 'react';

class User {
  constructor(nickname) {
    this.nickname = nickname;
    this.score = 0;
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };
  }

  render() {
    return (
      <div>
        <h1>Score: {this.state.score}</h1>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div style={{padding: '10px', border: '1px solid black'}}>Dino</div>
          <div style={{padding: '10px', border: '1px solid black'}}>Obstacle</div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      currentUser: null,
      signupForm: {
        nickname: '',
        password: ''
      },
      loginForm: {
        nickname: '',
        password: ''
      },
      gameStarted: false // 게임 시작 상태
    };
  }

  handleSignupChange = (e) => {
    this.setState({ 
      signupForm: {
        ...this.state.signupForm,
        [e.target.name]: e.target.value 
      }
    });
  }

  handleLoginChange = (e) => {
    this.setState({ 
      loginForm: {
        ...this.state.loginForm,
        [e.target.name]: e.target.value 
      }
    });
  }

  handleSignup = (e) => {
    e.preventDefault();
    const newUser = new User(this.state.signupForm.nickname);
    this.setState({ 
      users: [...this.state.users, newUser],
      signupForm: {
        nickname: '',
        password: ''
      }
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    const user = this.state.users.find((user) => user.nickname === this.state.loginForm.nickname);
    this.setState({ 
      currentUser: user,
      loginForm: {
        nickname: '',
        password: ''
      }
    });
  }

  handleStartGame = () => {
    this.setState({ gameStarted: true }); // 게임 시작 상태 변경
  }

  render() {
    return (
      <div className="App">
        {this.state.currentUser ? 
          (this.state.gameStarted ? 
            <Game user={this.state.currentUser} /> : // 게임 시작 시 게임 화면 출력
            <div> 
              <button onClick={this.handleStartGame}>게임 시작</button> {/* 게임 시작 버튼 */}
              <button onClick={this.handleDescriptGame}>게임 설명: 장애물을 피해 점수를 획득하는 게임입니다.</button> {/* 게임 설명 */}
              <button OnClick={this.handleRankingGame}>게임 랭킹: 랭킹 정보를 여기에 출력할 수 있습니다.</button> {/* 게임 랭킹 */}
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
