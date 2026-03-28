import Skeleton from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 md:px-16">
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="h-12 w-72" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </main>
  );
}
