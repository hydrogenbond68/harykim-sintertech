// src/components/LoadingSkeleton.jsx

function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64 mb-4"></div>
      <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4 mb-2"></div>
      <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-1/2"></div>
    </div>
  );
}

export default LoadingSkeleton;