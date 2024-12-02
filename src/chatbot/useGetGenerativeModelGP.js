import { useGenAi } from './useGenAi.ts'

export const useGetGenerativeModelGP = async (prompt, language) => {
  const model = await useGenAi('gemini-pro')
  const result = await model.generateContent(prompt, { language })
  const response = await result.response
  const text = response.text()

  return text
}
