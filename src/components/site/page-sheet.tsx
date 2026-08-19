/**
 * One section, one sheet. Sections stack down the ground as separate pages
 * rather than running together inside a single long document.
 */
export function PageSheet({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`sheet mx-auto w-full max-w-[82rem] overflow-x-clip ${className}`}>
      {children}
    </div>
  );
}
