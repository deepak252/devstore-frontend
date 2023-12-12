import { useState } from 'react'
/**
 * Hook to validate form
 * @param validator (required) mapped object of validator functions
 * @param initialValue initial errors to show
 * @returns `{ error, validateField, validateForm, clearFormError }`
 */
function useFormValidator(validator, initialError = {}) {
  const [error, setError] = useState(initialError)

  const validateField = (field, value) => {
    if (!validator) return
    const updatedError = { ...error }
    const errorMsg = validator[field] && validator[field](value)
    if (errorMsg?.length) {
      updatedError[field] = errorMsg
    } else {
      delete updatedError[field]
    }
    setError(updatedError)
    return errorMsg
  }

  const validateForm = (data) => {
    if (!validator) return null
    if (!data) {
      data = {}
    }
    let formErrors = []
    const updatedError = { ...error }
    Object.keys(validator).forEach((key) => {
      const errorMsg = validator[key] && validator[key](data[key])
      if (errorMsg?.length) {
        updatedError[key] = errorMsg
        formErrors.push({ [key]: errorMsg })
      } else {
        delete updatedError[key]
      }
    })
    setError(updatedError)
    return formErrors
  }

  const clearFormError = () => {
    setError({})
  }
  
  return { error, validateField, validateForm, clearFormError, setError }
}
export default useFormValidator
