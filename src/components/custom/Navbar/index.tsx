import { useSearchStore } from "../../../store/SearchStore";

const Navbar = () => {
  const { text, setText } = useSearchStore();

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="w-[240px]">
          <h1 className="text-[20px] font-extrabold tracking-wide text-[#262B40] uppercase">
            Tik Tak Admin
          </h1>
        </div>

        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Axtarış"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-[400px] h-[40px] px-4 py-2 rounded-xl bg-[#F6F5FB] outline-none text-sm text-[#262B40]"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;