import Image from "next/image";

/** A phone drawn as a line frame, holding a real screenshot. */
export function PhoneFrame({ src, alt, width, height, priority = false, className = "" }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative rounded-[22px] border-[1.5px] border-ink bg-paper p-[5px] ${className}`}>
      <span aria-hidden="true" className="absolute top-[9px] left-1/2 z-[1] h-[5px] w-[30%] -translate-x-1/2 rounded-full border border-ink bg-paper" />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="block h-auto w-full rounded-[17px]"
        sizes="(max-width: 600px) 30vw, 180px"
      />
    </div>
  );
}
