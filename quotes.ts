import express from 'express'
import cors from 'cors'
import { authors, quotesData } from './data'

let quotes = quotesData



const app = express()
app.use(cors())
app.use(express.json())

const port = 6789

app.get('/', (req, res) => {
  res.send(`<h1>quotes/authors API</h1><ul><li><a href="/quotes">Qoute</a></li><li><a href="/authors">Author</a></li></ul>`)
})



app.get('/quotes', (req, res) => {

  // let quoteToSend = quotes

  // if (req.query.includeAuthor === 'true') {
  //   quoteToSend = quotes.map(quote => {
  //     let author = authors.find(author => author.id ===quote.authorId)
  //     return {...quote, author}
  //   })
  // } 

  let quoteToSend = quotes.map(quote => {
        let author = authors.find(author => author.id ===quote.authorId)
        return {...quote, author}
      })
    

  res.send(quoteToSend)

  res.send(quotes)
  let itemsToSend = quotes

   if (req.query.age) {
    itemsToSend = itemsToSend.filter(
      item => item.authorId === Number(req.query.authorId)
    )
   }

   if (req.query.name !== undefined) {
    itemsToSend = itemsToSend.filter(
      // @ts-ignore
      item => item.name.toLowerCase().includes(req.query.name.toLowerCase())
    )
   }
    res.send(itemsToSend)
  })

  app.post('/quotes', (req, res) => {
    let errors: string[] = []

   

    if (typeof req.body.authorId !== 'number') {
      errors.push('Author Id not provided or not a number.')
    }

    if (typeof req.body.quote !== 'string') {
      errors.push('Quote not provided or not a string.')
    }

    let author = authors.find(author => author.id === req.body.authorId)
    if (!author) {
      errors.push("Author doesn'n exist")
    }
    if (errors.length === 0) {
      const newItem = {
        id: quotes.length === 0 ? 1 : quotes[quotes.length -1].id + 1,
        authorId: req.body.authorId,
        quote: req.body.quote
       }
     quotes.push(newItem)  
    res.send(newItem)
  } else {
    res.status(400).send({errors: errors})
  }
  })

  app.delete('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const indexToDelete = quotes.findIndex(quote => quote.id === id)

    if (indexToDelete > -1) {
      quotes = quotes.filter(quote => quote.id !== id)
      res.send({ message: 'Quote deleted successfully'})
    } else {
      res.status(404).send({ error: 'quote not found.'});
      
    }
    
  })

  app.patch('/quotes/:id', (req, res) => {
    let id = Number(req.params.id)
    let match = quotes.find(quote => quote.id === id)

    if (match) {

       if (req.body.authorId) {
        match.authorId = req.body.authorId
       }

      if (req.body.quote) {
        match.quote = req.body.quote
       }

      res.send(match)
    } else {
      res.status(404).send({ error: 'Quoote not found'})
    }
  })

  app.get('/authors', (req, res) => {
    let authorsToSend = authors.map(author => {
      const foundQoutes = quotes.filter(quote => quote.authorId === author.id)
      return {...author, qoutes: foundQoutes}
    })
    res.send(authorsToSend)
  })

  app.post('/authors', (req, res) => {
    let errors: string[] = []

    if (typeof req.body.name !== 'string') {
      errors.push('Author name not provided or not a string.')
    }

    if (typeof req.body.age !== 'number') {
      errors.push('Age  not provided or not a number.')
    }

    if (typeof req.body.image !== 'string') {
      errors.push('Image not provided or not a string.')
    }

 
    if (errors.length === 0) {
      const newItem = {
        id: quotes[quotes.length -1].id + 1,
        name: req.body.name,
        age: req.body.age,
        image: req.body.image
       }
     authors.push(newItem)
    res.send(newItem)
  } else {
    res.status(400).send({errors: errors})
  }
  })
  
  app.get('/queryStuff', (req, res) => {
    console.log(req.query)
    res.send({message: 'Hello lovely'})
  })

  app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const match = quotes.find(item => item.id === id)

    if (match) {
      res.send(match)
    } else {
      res.status(404).send({error: 'Item not found.'});
      
    }
    
  })

  app.get('/rendomQuoteItem', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const randomItem = quotes[randomIndex]
    res.send(randomItem)
  })

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})