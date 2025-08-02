import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import styles from "./login.module.css";
import LoginForm from "../../components/common/loginForm";
import LoginLeft from "../../components/common/loginLeft";

function AdminLogin() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulated delay
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className={styles.loader}>
      <Spin size="large" tip="Yüklənir..." className="custom-spin"  />
    </div>
  ) : (
    <div className={styles.container}>
      <LoginLeft />
      <LoginForm />
    </div>
  );
}

export default AdminLogin;
