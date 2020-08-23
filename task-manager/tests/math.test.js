const { calculateTip, add } = require('./math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)

    expect(total).toBe(13)
})

// test('Async test', (done) => {

//     setTimeout(() => {
//         expect(1).toBe(1)
//         done()
//     }, 2000)

// })

test('Async add two numbers', async() => {

    const value = await add(2, 3)

    expect(value).toBe(5)

})