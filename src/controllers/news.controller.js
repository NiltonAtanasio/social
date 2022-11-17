import { createService, findAllService } from '../service/news.service.js'
import { ObjectId } from 'mongoose'

const create = async ( req, res ) => {
  try {
    const { title, text, banner } = req.body
    
    if(!title || !text || !banner){
      res.status(400).send({
        meddage: "Submit all fields for registratrion"
      })
    }

    await createService({
      title,
      text,
      banner,
      user: {_id: "6368656382e68839af256291"}
    })

    res.status(201)
  } catch (error) {
    res.status(500).send({ message: error.message})
  }
}

const findAll = async ( req, res ) => {
  const news = await findAllService()

  if(news.length === 0){
    return res.status(400).send({
      message: "There are no registered news"
    })
  }
  res.send(news)
}

export { create, findAll }