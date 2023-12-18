const Spinner = () => {
  return (
    <div className="fixed left-[50%] right-[50%] top-[50%] bottom-[50%] items-center bg-white-500 w-screen  h-screen">
      <div className="w-24 h-24 border-8 rounded-full border-blue-500 border-t-8 border-t-green-500 fixed  animate-spin"></div>
    </div>
  );
};
export default Spinner;
