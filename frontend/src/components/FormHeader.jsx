import React from "react";

const FormHeader = () => {
  return (
    <div className="flex flex-row justify-around items-center border-b-[1px] border-[#ddd] py-2 mb-8">
      <h1 className="text-[#475569] text-2xl font-bold">Ecommerce</h1>
      <div className="h-12 w-12">
        <img src={""} alt="logo" />
      </div>
    </div>
  );
};

export default FormHeader;
