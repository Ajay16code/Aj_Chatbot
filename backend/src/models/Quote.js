import mongoose from 'mongoose'

const QuoteSchema = new mongoose.Schema({
  text: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Quote', QuoteSchema)
