import { useFormik } from "formik";
import  { useEffect, useState } from "react";
import * as Yup from "yup";
import styles from "./form.module.css";
import Button from "../../custom/Button";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router";
import { ROUTER } from "../../../constant/router";
import { loginData } from "../../../services/login";
import toast from "react-hot-toast";

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate(ROUTER.ORDERS);
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Telefon nömrəsi vacibdir")
        .matches(
          /^\+994(50|51|55|70|77|10)[0-9]{7}$/,
          "Düzgün nömrə forması daxil edin"
        ),
      password: Yup.string().required("Parol vacibdir"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await loginData(values.phone, values.password);
        const token = res?.data?.tokens.access_token;
        if (token) {
          localStorage.setItem("access_token", token);
          setTimeout(() => {
            toast.success("Giriş uğurlu oldu!");
            navigate(ROUTER.ORDERS);
          }, 1000);
        } else {
          toast.error("Token alınmadı. Giriş uğursuz.");
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Giriş zamanı xəta baş verdi.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Panel</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <label>Telefon</label>
        <input
          type="text"
          name="phone"
          placeholder="telefon"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          disabled={loading}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className={styles.error}>{formik.errors.phone}</div>
        )}

        <label>Parol</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
            disabled={loading}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeIcon}
          >
            {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
          </span>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className={styles.error}>{formik.errors.password}</div>
        )}

        <Button
          title={loading ? "Gözlənilir..." : "Daxil ol"}
          variant="button_type1"
          disabled={loading}
          type="submit"
        />
      </form>
    </div>
  );
}

export default LoginForm;
