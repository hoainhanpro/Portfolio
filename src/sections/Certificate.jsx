import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import { certificates } from "../constants";
import OptimizedImage from "../components/OptimizedImage";
const firstRow = certificates.slice(0, certificates.length / 2);
const secondRow = certificates.slice(certificates.length / 2);

const CertificateCard = ({ img, name, issuer, score, date, href }) => {
  const content = (
    <>
      <div className="flex flex-row items-center gap-2">
        <div className="rounded-full bg-white/10 overflow-hidden">
          <OptimizedImage
            src={img}
            alt={`${name} certificate`}
            width={32}
            height={32}
            className="rounded-full"
            priority={false}
          />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-white/40">{issuer}</p>
        </div>
      </div>
      <div className="mt-2 text-sm">
        {score && <p className="text-white/80">Score: {score}</p>}
        {date && <p className="text-white/60 text-xs mt-1">{date}</p>}
      </div>
      {href && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <img src="/assets/arrow-up.svg" className="w-4 h-4" alt="View certificate" />
        </div>
      )}
    </>
  );

  const className = twMerge(
    "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-50/[.1] bg-gradient-to-r bg-indigo to-storm hover:bg-royal hover-animation group"
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return <figure className={className}>{content}</figure>;
};

export default function Certificate() {
  return (
    <div className="items-start mt-25 md:mt-35 c-space">
      <h2 className="text-heading">My Certifications</h2>
      <div className="relative flex flex-col items-center justify-center w-full mt-12 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((cert) => (
            <CertificateCard key={cert.name} {...cert} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((cert) => (
            <CertificateCard key={cert.name} {...cert} />
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-gradient-to-r from-primary"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-gradient-to-l from-primary"></div>
      </div>
    </div>
  );
}
