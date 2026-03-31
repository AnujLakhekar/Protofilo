import Skeleton from "@/components/ui/skeleton";

export default function DocsLoading() {
  return (
    <div className="min-h-screen px-6 py-12 md:px-16">
      <div className="mx-auto max-w-5xl space-y-6">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-16 w-full" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
        </div>
      </div>
    </div>
  );
}
