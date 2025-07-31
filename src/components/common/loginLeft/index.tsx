// import React from "react";
import ControlPAnel from "../../../assets/images/login.svg";
import styles from "./leftPart.module.css";
function LoginLeft() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TIK TAK ADMIN</h1>
      <figure className={styles.image}>
        <img src={ControlPAnel} alt="Control Panel" />
      </figure>
    </div>
  );
}

export default LoginLeft;
