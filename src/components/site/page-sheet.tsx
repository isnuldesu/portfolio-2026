/**
 * One section of a page: a centred column with generous vertical rhythm.
 * Square draws no frame around content, so this is spacing only.
 */
export function PageSheet({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[76rem] overflow-x-clip px-5 py-16 sm:px-8 md:py-24 ${className}`}>
      {children}
    </div>
  );
}
