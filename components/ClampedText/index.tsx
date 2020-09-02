import { useRef, useState, useCallback, useEffect } from "react";
import getMaxLines from "utils/get-max-lines";

// Use case: a piece of text in a card that needs to be clamped, like an excerpt in a blogpost card
// But you don't always know the number of lines available
// You know the height available (calculated at runtime probably)

// Yeah, very specific... but i won't remember it if i don't upload it to gists

type Props = {
  children: React.ReactNode;
  availableHeight: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

const ClampedText = ({
  availableHeight,
  children,
  ...paragraphProps
}: Props) => {
  const excerptRef = useRef<HTMLParagraphElement>(null);
  const [excerptMaxLines, setExcerptMaxLines] = useState<number>();

  const getExcerptMaxLines = useCallback(() => {
    if (!!excerptRef.current) return;
    const maxLines = getMaxLines(excerptRef.current, availableHeight);

    // This tipically needs some specific tweaking. Maybe it's a calculation error in the getMaxLines function?
    setExcerptMaxLines(maxLines - 1);
  }, [availableHeight, excerptRef]);

  useEffect(() => {
    getExcerptMaxLines();
    window.addEventListener("resize", getExcerptMaxLines);

    return () => window.removeEventListener("resize", getExcerptMaxLines);
  }, [getExcerptMaxLines]);

  return (
    <p
      {...paragraphProps}
      ref={excerptRef}
      style={{
        ...paragraphProps.style,
        textOverflow: "ellipsis",
        WebkitLineClamp: excerptMaxLines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        display: excerptMaxLines <= 0 ? "none" : "-webkit-box"
      }}
    >
      {children}
    </p>
  );
};

export default ClampedText;
