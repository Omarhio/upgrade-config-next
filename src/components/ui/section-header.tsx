interface Props {
  title: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, action }: Props) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <h2 className="font-[family-name:var(--font-syne)] text-base font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
        {title}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-[hsl(var(--border))] to-transparent" />
      {action}
    </div>
  );
}
