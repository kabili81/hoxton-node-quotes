import express from 'express'
import cors from 'cors'

const quotes = [
    {
        id:1,
        name: 'Aristoteli',
        quote:'We are what we constantly do; Therefore, brilliance is not an action, but a habit'
    },
    {
        id:2,
        name: 'Jim Rohn',
        quote:'Discipline is the bridge between goals and achievement'
    },
    {
        id:3,
        name: 'Mark Twain',
        quote:'There are a thousand excuses for failure, but never a good reason'
    }
]

const app = express()
app.use(cors())
const port = 6789

app.get('/', (req, res) => {
  res.send('Quote!')
})

app.get('/quotes', (req, res) => {
    res.send(quotes)
  })

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})