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
    <div className={`sheet mx-auto w-full max-w-[82rem] overflow-x-clip px-5 py-12 sm:px-8 md:px-12 md:py-16 ${className}`}>
      {children}
    </div>
  );
}
