// Credits: https://gist.github.com/rauchg/49a7bcf064c68d82f8351648d2d30f18

import hash from "string-hash"
import color from "tinycolor2"

// If you want it as a real, downloadable image, put it in an /api. See './optional-for-api.js'

export default ({ uid = "defaultuid", size = 200 }) => {
  const n = hash(uid)
  const c1 = color({ h: n % 360, s: 0.95, l: 0.5 })
  const c1_ = c1.toHexString()
  const c2 = c1.triad()[1].toHexString()

  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 80 80"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id={uid}>
          <stop stopColor={c1_} offset="0%"></stop>
          <stop stopColor={c2} offset="100%"></stop>
        </linearGradient>
      </defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <rect
          id="Rectangle"
          fill={`url(#${uid})`}
          x="0"
          y="0"
          width="80"
          height="80"
        ></rect>
      </g>
    </svg>
  )
}
