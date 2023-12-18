import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
  const { keyword: urlKeyword } = useParams();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const handleSubmit = () => {
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="text-sm">
      <input
        type="text"
        placeholder="Search product"
        className="border p-2 outline-none"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.trim())}
      />
      <button
        onClick={handleSubmit}
        className="bg-green-700 p-2 text-white rounded-r-md outline-none border-green-700"
      >
        Submit
      </button>
    </div>
  );
};

export default SearchBox;
