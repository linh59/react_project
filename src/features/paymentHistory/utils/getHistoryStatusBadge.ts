
export const getHistoryStatusBadge = (status: 'completed' | 'pending' | 'failed' | string) => {
  const baseClasses = "rounded-full px-3 py-1 text-sm font-medium shadow-inner";
  switch (status) {
    case 'completed':
      return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`;
    case 'pending':
      return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300`;
    case 'failed':
      return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300`;
  }
};
