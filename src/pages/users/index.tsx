import { useEffect, useState } from "react";
import Table from "../../components/custom/Table";
import { Layout } from "../../layout";
import { getUsers } from "../../services/fetchData";
import type { User } from "../../interface";
import { useSearchStore } from "../../store/SearchStore";

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const { text: searchText } = useSearchStore();
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    const res = await getUsers();
    console.log(res);

    setUsers(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const filteredUser = users.filter((user) => {
    const query = searchText.toLowerCase();
    return user.full_name.toLowerCase().includes(query);
  });

  return (
    <Layout>
      <Table<User>
        title="İstifadəçilər"
        isLoading={loading}
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
