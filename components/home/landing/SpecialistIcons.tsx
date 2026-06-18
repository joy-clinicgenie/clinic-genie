import { cn } from "@/lib/cn";

type SpecialistIconProps = {
  id: string;
  className?: string;
};

function IconFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      {children}
    </svg>
  );
}

export function SpecialistIcon({ id, className }: SpecialistIconProps) {
  switch (id) {
    case "endocrinology":
      return (
        <IconFrame className={className}>
          <path
            d="M16 6c4.2 0 7.5 3.1 7.5 7.1 0 3.1-1.8 5.7-4.4 7l-.6 8.4h-4.8l-.6-8.4c-2.6-1.3-4.4-3.9-4.4-7C8.5 9.1 11.8 6 16 6Z"
            stroke="#217B8E"
            strokeWidth="1.6"
          />
          <path d="M13 12h6M13 16h4" stroke="#18C4D9" strokeWidth="1.5" strokeLinecap="round" />
        </IconFrame>
      );
    case "cardiology":
      return (
        <IconFrame className={className}>
          <path
            d="M16 26s-8.5-5.4-8.5-11.2C7.5 10.8 10.4 8 13.8 8c2 0 3.7 1 4.2 2.5C18.5 9 20.2 8 22.2 8c3.4 0 6.3 2.8 6.3 6.8C28.5 20.6 16 26 16 26Z"
            stroke="#217B8E"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M13.5 15.5 15.2 17l3.8-4.2" stroke="#18C4D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </IconFrame>
      );
    case "dermatology":
      return (
        <IconFrame className={className}>
          <circle cx="16" cy="13" r="6.5" stroke="#217B8E" strokeWidth="1.6" />
          <path d="M10 24c1.8-3.2 4.2-4.8 6-4.8s4.2 1.6 6 4.8" stroke="#18C4D9" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="19" cy="11.5" r="1" fill="#18C4D9" />
        </IconFrame>
      );
    case "dental":
      return (
        <IconFrame className={className}>
          <path
            d="M11 10c0-2.8 2.2-5 5-5s5 2.2 5 5v3.5c0 4.2-1.2 7.8-2.4 9.8-.8 1.3-2.4 1.3-3.2 0-.8-1.3-1.6-1.3-2.4 0-.8 1.3-2.4 1.3-3.2 0C12.2 21.3 11 17.7 11 13.5V10Z"
            stroke="#217B8E"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M13.5 12h5" stroke="#18C4D9" strokeWidth="1.5" strokeLinecap="round" />
        </IconFrame>
      );
    case "ophthalmology":
      return (
        <IconFrame className={className}>
          <path
            d="M6 16s4.5-7 10-7 10 7 10 7-4.5 7-10 7-10-7-10-7Z"
            stroke="#217B8E"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="3.2" stroke="#18C4D9" strokeWidth="1.6" />
          <circle cx="16" cy="16" r="1.2" fill="#18C4D9" />
        </IconFrame>
      );
    case "paediatrics":
      return (
        <IconFrame className={className}>
          <circle cx="16" cy="10" r="4" stroke="#217B8E" strokeWidth="1.6" />
          <path d="M10 24c1.2-4.2 3.4-6 6-6s4.8 1.8 6 6" stroke="#217B8E" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M22 12v4M24 14h-4" stroke="#18C4D9" strokeWidth="1.5" strokeLinecap="round" />
        </IconFrame>
      );
    case "acne":
      return (
        <IconFrame className={className}>
          <circle cx="16" cy="14" r="7" stroke="#217B8E" strokeWidth="1.6" />
          <circle cx="13" cy="13" r="1" fill="#18C4D9" />
          <circle cx="18.5" cy="16" r="0.9" fill="#18C4D9" />
          <circle cx="15" cy="17.5" r="0.7" fill="#78E2DD" />
        </IconFrame>
      );
    case "neurology":
      return (
        <IconFrame className={className}>
          <path
            d="M12 8c2 0 3.5 1.2 4 3 1-.8 2.4-1.2 3.8-.8 2.2.7 3.4 2.8 3 5-.5 2.5-2.6 4.2-5 4.5-1.2.1-2.3-.2-3.2-.8-.8 2.2-2.8 3.8-5.2 3.8-3.1 0-5.6-2.5-5.6-5.6C3.8 11.2 7.6 8 12 8Z"
            stroke="#217B8E"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M11 13.5c1 .8 2.2 1.2 3.5 1M17 12c.8.6 1.7.9 2.7.8" stroke="#18C4D9" strokeWidth="1.3" strokeLinecap="round" />
        </IconFrame>
      );
    case "aquatic-physio":
      return (
        <IconFrame className={className}>
          <path d="M6 20c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 7.5 0" stroke="#18C4D9" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6 24c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 7.5 0" stroke="#78E2DD" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
          <circle cx="16" cy="11" r="3.5" stroke="#217B8E" strokeWidth="1.6" />
          <path d="M16 14.5v3" stroke="#217B8E" strokeWidth="1.6" strokeLinecap="round" />
        </IconFrame>
      );
    default:
      return (
        <IconFrame className={className}>
          <circle cx="16" cy="16" r="8" stroke="#217B8E" strokeWidth="1.6" />
          <path d="M16 10v12M10 16h12" stroke="#18C4D9" strokeWidth="1.5" strokeLinecap="round" />
        </IconFrame>
      );
  }
}
