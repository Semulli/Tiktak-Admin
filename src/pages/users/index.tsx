import  { useEffect, useState } from "react";
import Table from "../../components/custom/Table";
import { Layout } from "../../layout";
import { getUsers } from "../../services/fetchData";
import type { User } from "../../interface";

function Users() {
  const [users, setUsers] = useState([]);
  const fetchUser = async () => {
    const res = await getUsers();
    console.log(res);

    setUsers(res.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  
  return (
    <Layout>
      <Table<User>
        title="İstifadəçilər"
        data={users}
        columns={[
          { key: "id", label: "ID" },
          { key: "full_name", label: "Ad Soyad" },
          { key: "phone", label: "Telefon" },
          { key: "created_at", label: "Yaranma Tarixi" },
        ]}
      />
    </Layout>
  );
}
export default Users;
