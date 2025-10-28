import { Card } from "../Card/Card.tsx";

const Skeleton = () => (
  <div className="grid grid-cols-2 gap-4">
    <Card
      children={
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
        </div>
      }
    />
    <Card
      children={
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
        </div>
      }
    />
    <Card
      children={
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
        </div>
      }
    />
    <Card
      children={
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
        </div>
      }
    />
  </div>
);

export { Skeleton };
