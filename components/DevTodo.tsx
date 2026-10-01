/**
 * Shows open content questions while developing (`npm run dev`).
 * Renders nothing in production, so unfinished notes never go live.
 */
export function DevTodo({ items, title = "To complete" }: { items?: string[]; title?: string }) {
  if (process.env.NODE_ENV === "production" || !items?.length) return null;
  return (
    <aside className="my-8 border border-dashed border-amber-600/60 bg-amber-50 p-4 text-sm text-amber-900">
      <p className="label !text-amber-800">Dev only · {title}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
