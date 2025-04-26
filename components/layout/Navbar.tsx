export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div  className="flex-shrink-0 flex items-center">
              <span className="text-blue-900 font-bold text-2xl">
                AussieDormReviews
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-gray-600 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium">
                Browse
              </span>
            </div>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-gray-600 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium">
                Review
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
