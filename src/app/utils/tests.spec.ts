
import { isValidDate } from "./utils";

describe("isValidDate", ()=> 
{
    it("it must return true ", ()=> 
    {
        const result = isValidDate("2024-03-13");
        expect(result).toBe(true)
    }),
    it("it must return false", ()=> 
    {
        const result = isValidDate("34");
        expect(result).toBe(false)
    })
})

