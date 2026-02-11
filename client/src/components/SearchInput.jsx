import { useEffect, useState } from "react";
import { MdOutlineSearch, MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/slices/uiSlice";
import debounce from "lodash.debounce";
import SearchResultDropdown from "./SearchResultDropdown";

const SearchInput = ({ results = [] }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(setSearch(value));
      setOpen(!!value);
    }, 400);

    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="relative w-64">
      <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full gap-2">
        <MdOutlineSearch />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search tasks..."
          className="bg-transparent outline-none flex-1"
        />
      </div>

      {open && <SearchResultDropdown results={results} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default SearchInput;
