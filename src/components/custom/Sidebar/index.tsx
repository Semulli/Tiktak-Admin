import { NavLink, useNavigate, useLocation } from "react-router";
import { Layout, Menu } from "antd";
import { ROUTER } from "../../../constant/router";
import styles from "./Sidebar.module.css";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate(ROUTER.LOGIN);
    window.location.reload();
  };

  const menuItems = [
    {
      key: ROUTER.ORDERS,
      label: (
        <NavLink
          to={ROUTER.ORDERS}
          style={{ fontSize: "16px", padding: "12px 0", display: "block" }}
        >
          Sifarişlər
        </NavLink>
      ),
    },
    {
      key: ROUTER.COMPANIES,
      label: (
        <NavLink
          to={ROUTER.COMPANIES}
          style={{ fontSize: "16px", padding: "12px 0", display: "block" }}
        >
          Kampaniyalar
        </NavLink>
      ),
    },
    {
      key: ROUTER.CATEGORIES,
      label: (
        <NavLink
          to={ROUTER.CATEGORIES}
          style={{ fontSize: "16px", padding: "12px 0", display: "block" }}
        >
          Kategoriyalar
        </NavLink>
      ),
    },
    {
      key: ROUTER.PRODUCTS,
      label: (
        <NavLink
          to={ROUTER.PRODUCTS}
          style={{ fontSize: "16px", padding: "12px 0", display: "block" }}
        >
          Məhsullar
        </NavLink>
      ),
    },
    {
      key: ROUTER.USERS,
      label: (
        <NavLink
          to={ROUTER.USERS}
          style={{ fontSize: "16px", padding: "12px 0", display: "block" }}
        >
          İstifadəçilər
        </NavLink>
      ),
    },

    {
      key: "logout",
      label: (
        <span
          onClick={handleLogout}
          style={{
            fontSize: "16px",
            paddingTop: "10px",
            display: "block",
            cursor: "pointer",
          }}
        >
          Çıxış
        </span>
      ),
    },
  ];

  return (
    <Sider
      width={240}
      style={{
        background: "#fff",
        height: 445,
        paddingTop: 25,
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        className={styles.menu}
        style={{
          borderRight: 0,

        }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
