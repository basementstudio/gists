import { useState, createRef } from "react"

const useRefs = (args, v = null) =>
  useState(() => {
    const isArray = Array.isArray(args)
    const values = isArray ? args : new Array(args).fill(null)
    return values.map(arg => createRef(isArray ? arg : v))
  })[0]

export default useRefs
