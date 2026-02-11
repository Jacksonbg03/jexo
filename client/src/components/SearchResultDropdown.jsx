import { useNavigate } from "react-router-dom";

const SearchResultDropdown = ({ results = [], onClose }) => {
  const navigate = useNavigate();
//   if (!results.length) return null;

  return (
    <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border z-50">
      <ul className="max-h-60 overflow-y-auto divide-y">
        {results.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">No results found</div>
        ) :
        results.map((task) => (
          <li
            key={task._id}
            onClick={() => {
              navigate(`/task/${task._id}`);
              onClose();
            }}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            <p className="text-sm font-medium text-gray-800 truncate">
              {task.title}
            </p>
            <p className="text-xs text-gray-500">
              {task.stage} • {task.priority}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultDropdown;