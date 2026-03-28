import Skeleton from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 md:px-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-black/10 bg-white p-8">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="mt-4 h-5 w-1/2" />
        <div className="mt-8 flex gap-3">
          <Skeleton className="h-11 w-36" />
          <Skeleton className="h-11 w-36" />
        </div>
      </div>
    </main>
  );
}
