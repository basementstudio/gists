// Credits: https://gist.github.com/rauchg/49a7bcf064c68d82f8351648d2d30f18

import hash from "string-hash"
import color from "tinycolor2"

export default async (req, res) => {
  const { uid = "defaultuid", size = 200 } = req.query

  try {
    const n = hash(uid)
    const c1 = color({ h: n % 360, s: 0.95, l: 0.5 })
    const c1_ = c1.toHexString()
    const c2 = c1.triad()[1].toHexString()

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${size}px" height="${size}px" viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="g">
        <stop stop-color="${c1_}" offset="0%"></stop>
        <stop stop-color="${c2}" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect id="Rectangle" fill="url(#g)" x="0" y="0" width="80" height="80"></rect>
    </g>
  </svg>`

    // Very important
    res.setHeader("Content-Type", "image/svg+xml")
    return res.status(200).send(svg)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
