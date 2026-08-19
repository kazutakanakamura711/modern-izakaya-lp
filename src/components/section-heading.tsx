import type { ReactNode } from 'react';

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  inverse?: boolean;
};

export const SectionHeading = ({
  id,
  eyebrow,
  title,
  inverse = false,
}: SectionHeadingProps) => (
  <div className={inverse ? 'text-ivory' : 'text-charcoal'}>
    <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em]">
      <span className={inverse ? 'bg-copper-light h-px w-8' : 'bg-copper h-px w-8'} />
      {eyebrow}
    </p>
    <h2
      id={id}
      className="font-serif-jp text-[clamp(2.25rem,4.2vw,4.25rem)] leading-[1.32] tracking-[0.04em]"
    >
      {title}
    </h2>
  </div>
);
