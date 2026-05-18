export function CardSkeleton() {
  return (
    <div className="p-6 rounded-lg border border-border bg-card animate-pulse">
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-1/3"></div>
        <div className="h-8 bg-muted rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="p-6 rounded-lg border border-border bg-card animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-1/3"></div>
        <div className="flex gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex-1 h-32 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 rounded-lg border border-border bg-card animate-pulse">
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-3 bg-muted rounded w-full"></div>
            <div className="h-3 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
