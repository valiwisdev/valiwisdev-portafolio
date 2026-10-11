declare module '@jsonresume/schema' {
  type ValidationError = {
    name: string
    property: string
    message: string
    stack: string
  }

  type JsonResumeSchema = {
    validate(
      resume: unknown,
      callback: (errors: ValidationError[] | null, valid: boolean) => void,
    ): void
    schema: Record<string, unknown>
    jobSchema: Record<string, unknown>
  }

  const jsonResumeSchema: JsonResumeSchema
  export default jsonResumeSchema
}
