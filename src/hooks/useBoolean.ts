import {useCallback, useState} from "react";

type Out = [boolean, () => void, () => void]

export function useBoolean(defaultValue: boolean = false): Out {
  const [value, setValue] = useState(defaultValue),
    on = useCallback(() => setValue(true), []),
    off = useCallback(() => setValue(false), [])

  return [value, on, off]
}
