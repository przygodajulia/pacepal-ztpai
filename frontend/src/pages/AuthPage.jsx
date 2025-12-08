import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import MobileRegister from "../components/Auth/MobileRegister";

function AuthPage() {
  return (
    <div>
      {/* Header */}
      <div className="simple-login-header">
        <header>
          <img className="header-img" src="/img/running_girl.png" alt="main logo image" />
          <div className="logo-login-page">
            <h1 className="default-header-text">Pacepal</h1>
          </div>
        </header>
      </div>

      {/* Main */}
      <main>
        <div className="login-forms-main-container">
          <LoginForm />
          <RegisterForm />
          <MobileRegister />
        </div>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Pacepal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AuthPage;
