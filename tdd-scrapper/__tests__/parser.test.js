const parser = require('../parser');
const fs = require('fs');

let html;

beforeAll(() => { 
   html = fs.readFileSync('./test.html')
})



it('should return 4', () => {
    const res = parser.add(2,2);
    expect(res).toBe(4);
}); 


