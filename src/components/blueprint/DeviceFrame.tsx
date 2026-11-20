import Image from "next/image";

/**
 * An iPhone 17 Pro drawn around a full-screen simulator screenshot.
 * The screenshot already contains the status bar and the Dynamic Island, so the
 * frame only adds the body: titanium band, thin black bezel, rounded screen and
 * the side buttons (action, volume ×2 on the left; side button and Camera Control
 * on the right). Everything is sized in container units, so it scales with width.
 */
export function PhoneFrame({ src, alt, width, height, priority = false, className = "" }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`iphone ${className}`}>
      <span className="iphone-btn left-0 top-[17%] h-[4.2%]" aria-hidden="true" />
      <span className="iphone-btn left-0 top-[25%] h-[7.5%]" aria-hidden="true" />
      <span className="iphone-btn left-0 top-[34.5%] h-[7.5%]" aria-hidden="true" />
      <span className="iphone-btn right-0 top-[27%] h-[11%]" aria-hidden="true" />
      <span className="iphone-btn iphone-cam right-0 top-[56%] h-[6.5%]" aria-hidden="true" />
      <div className="iphone-body">
        <div className="iphone-bezel">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="iphone-screen"
            sizes="(max-width: 600px) 30vw, 200px"
          />
        </div>
      </div>
    </div>
  );
}
