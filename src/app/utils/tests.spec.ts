import { timeFormatConverter } from './utils';


describe('timeFormatConverter', () =>
{
    it("it should convert to AM/PM format", ()=> 
    {
    const result = timeFormatConverter("14:10");
    expect(result).toBe("02:10 PM")
    })
})