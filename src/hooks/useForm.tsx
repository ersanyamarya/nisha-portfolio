import React, { useMemo, useReducer, useState } from 'react'

interface ErrorState {
  [key: string]: string
}
interface Validator {
  [key: string]: (value: string) => string
}
interface Action {
  type: string
  field?: string
  value?: string
}

const reducer = (state: Record<string, any>, action: Action) => {
  switch (action.type) {
    case 'updateFieldValue':
      if (action.field) return { ...state, [action.field]: action.value }
      return state

    case 'reset':
    default:
      return {}
  }
}

export default function useForm<IState extends Record<string, any>>(initial: IState) {
  const [state, dispatch] = useReducer(reducer, initial || {})
  const [errors, setErrors] = useState<ErrorState>({})
  const validators = React.useRef<Validator>({})

  const updateFieldValue = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event?.preventDefault()
    const value = e.target.value
    if (validators.current[field]) {
      const error = validators.current[field](value)

      if (error) setErrors({ ...errors, [field]: error })
      else {
        delete errors[field]
        setErrors({ ...errors })
      }
    }
    dispatch({ type: 'updateFieldValue', field, value })
  }

  const reset = () => {
    dispatch({ type: 'reset' })
    setErrors({})
    validators.current = {}
  }

  const noErrors = useMemo(() => {
    return Object.keys(errors).length === 0
  }, [errors])

  const valueExists = (field: string[]) => {
    return field.every(field => state[field])
  }

  const registerField = (
    key: string,
    options?: {
      validator?: (value: string) => string
    }
  ) => {
    if (options?.validator) validators.current[key] = options.validator
    return {
      value: state[key],
      onChange: updateFieldValue(key),
      error: errors[key] || '',
      autoComplete: key,
      placeholder: key,
      name: key,
      'aria-label': key,
      'aria-invalid': errors[key] ? true : false,
      'aria-describedby': errors[key] ? `${key}-error` : undefined,
      className: errors[key] ? 'error' : '',
    }
  }
  return {
    state,
    errors,
    noErrors,
    registerField,
    reset,
    valueExists,
  }
}
