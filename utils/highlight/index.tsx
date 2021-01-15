import { Fragment } from "react";

type Highlighter = {
  separator: "**" | "__" | "<br>";
  style?: React.CSSProperties;
  breaksBefore?: boolean;
  breaksAfter?: boolean;
};

type HighlightProps = {
  input: string;
  highlighters: Highlighter[];
  level: number;
};

function highlight({
  input,
  highlighters,
  level,
}: HighlightProps): JSX.Element | string {
  const highlighter = highlighters[level];
  if (!highlighter) return input;
  const splitted = input.split(highlighter.separator); // ['The', 'data API', 'etc...']

  return (
    <>
      {splitted.map((part, i) => {
        if (i % 2 !== 0) {
          // Specific treatment for line breaks
          if (highlighter.separator === "<br>") {
            return (
              <Fragment key={i}>
                <br />
                {highlight({
                  input: part,
                  highlighters,
                  level: level + 1,
                })}
              </Fragment>
            );
          }
          return (
            <Fragment key={i}>
              {highlighter.breaksBefore && <br />}
              <b style={highlighter.style}>
                {highlight({
                  input: part,
                  highlighters,
                  level: level + 1,
                })}
              </b>
              {highlighter.breaksAfter && <br />}
            </Fragment>
          );
        }
        return (
          <Fragment key={i}>
            {highlight({
              input: part,
              highlighters,
              level: level + 1,
            })}
          </Fragment>
        );
      })}
    </>
  );
}

type Options = {
  highlighters?: Highlighter[];
};

// TODO adapt highlighter options here.
const defaultHighlighters: Highlighter[] = [
  { separator: "__", style: { fontWeight: 500, color: "var(--color-violet)" } },
  { separator: "**", style: { fontWeight: 700 } },
  { separator: "<br>" },
];

const withHighlightedText = (
  text: string | null | undefined,
  { highlighters = defaultHighlighters }: Options = {}
) => {
  if (!text) return "";
  return highlight({ input: text, highlighters, level: 0 });
};

export default withHighlightedText;
export { defaultHighlighters };
