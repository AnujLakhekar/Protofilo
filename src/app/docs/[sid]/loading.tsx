import Skeleton from "@/components/ui/skeleton";

export default function DocDetailLoading() {
  return (
    <div className="min-h-screen px-6 py-12 md:px-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-14 w-2/3" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}
