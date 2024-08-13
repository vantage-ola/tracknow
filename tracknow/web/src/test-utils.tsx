import * as React from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ChakraProvider, theme } from "@chakra-ui/react"

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)
/*
describe('Time format', () => {
  test('Time format is 00:00:00.000', () => {
    expect(UserAddLaptimes("00:00:00.000")).toBe("00:00:00.000")
  })
})
*/
const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
