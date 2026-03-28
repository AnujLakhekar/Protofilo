import Skeleton from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 md:px-16">
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-40 w-full" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </main>
  );
}
