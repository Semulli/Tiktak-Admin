import  { useEffect, useState } from "react";
import Table from "../../components/custom/Table";
import { Layout } from "../../layout";
import { getUsers } from "../../services/fetchData";
import type { User } from "../../interface";
import { useSearchStore } from "../../store/SearchStore";

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const { text: searchText } = useSearchStore();
  const fetchUser = async () => {
    const res = await getUsers();
    console.log(res);

    setUsers(res.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const filteredUser = users.filter((user) => {
    const query = searchText.toLowerCase();
    return (
      user.full_name.toLowerCase().includes(query) 
    );
  });

  
  return (
    <Layout>
      <Table<User>
        title="İstifadəçilər"
        data={filteredUser}
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
