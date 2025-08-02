import { Outlet } from "react-router";
import Navbar from "../../components/custom/Navbar";
import Sidebar from "../../components/custom/Sidebar";
// import Tablee from "../../common/components/Table";
// import Tablee from "../../common/components/Table";

function MainPage() {
  return (
    <div style={{ backgroundColor: "#F6F5FB"  }}>
      <Navbar />
      <main
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sidebar />
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainPage;
