import LoginForm from "../../components/common/loginForm";
import styles from "./login.module.css";
import LoginLeft from "../../components/common/loginLeft";

function AdminLogin() {
  return (
    <div className={styles.container}>
      <LoginLeft />
      <LoginForm />
    </div>
  );
}

export default AdminLogin;
