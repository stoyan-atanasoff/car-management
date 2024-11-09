import React from 'react';

export const SkeletonLoaders = ({ num = 5 }: { num?: number }) => (
  <div className="p-2 text-sm text-gray-500">
    {[...Array(num)].map((_, index) => (
      <div key={index} className="h-4 bg-gray-300 dark:bg-[#313131] animate-pulse rounded mb-2 w-full"></div>
    ))}
  </div>
)