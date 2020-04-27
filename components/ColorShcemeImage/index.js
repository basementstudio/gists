const ColorSchemedImage = ({ source = { dark: "", light: "" }, alt }) => {
  return (
    <picture>
      <source srcSet={source.dark} media="(prefers-color-scheme: dark)" />
      <img src={source.light} alt={alt} />
    </picture>
  )
}

export default ColorSchemedImage
