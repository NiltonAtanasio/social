import { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, byUserService, updateService, eraseService, likeNewsService, deleteLikeNewsService, addCommentService, deleteCommentService } from '../service/news.service.js'

const create = async (req, res) => {
  try {

    const { title, text, banner } = req.body

    if (!title || !text || !banner) {
      res.status(400).send({
        meddage: "Submit all fields for registratrion"
      })
    }

    const { id } = await createService({
      title,
      text,
      banner,
      user: req.userId
    })

    res.status(201).send({
      message: "Post created successfully!",
      post: { id, title, banner, text },
    });
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query

    limit = Number(limit)
    offset = Number(offset)

    if (!limit) {
      limit = 5
    }

    if (!offset) {
      offset - 0
    }

    const news = await findAllService(offset, limit)
    const total = await countNews()
    const currentUrl = req.baseUrl

    const next = offset + limit
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}$offset=${next}` : null

    const previous = offset - limit < 0 ? null : offset - limit
    const previousUrl =
      previous != null ? `${currentUrl}?limit=${limit}$offset=$previous}` : null

    if (news.length === 0) {
      return res.status(400).send({
        message: "There are no registered news"
      })
    }
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: news.map(item => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar
      }))
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const topNews = async (req, res) => {
  try {
    const news = await topNewsService()

    if (!news) {
      return res.status(400).send({
        message: "There are no registered news"
      })
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar
      }

    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const findById = async (req, res) => {
  try {
    const { id } = req.params

    const news = await findByIdService(id)

    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar
      }

    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query

    const news = await searchByTitleService(title)

    if (news.length === 0) {
      return res.status(400).send({
        message: "There are no news with this title"
      })
    }

    return res.send({
      results: news.map(item => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar
      }))
    })

  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const byUser = async (req, res) => {
  try {
    const id = req.userId
    const news = await byUserService(id)

    return res.send({
      results: news.map(item => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar
      }))
    })
  } catch (error) {
    res.status(500).send({ message: error.message })

  }
}

const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body
    const { id } = req.params

    if (!title && !text && !banner) {
      res.status(400).send({
        meddage: "Submit at least one field to update the News"
      })
    }

    const news = await findByIdService(id)

    if (String(news.user._id) !== req.userId) {
      return res.status(400).send({
        message: "You didn't update this News"
      })
    }

    await updateService(id, title, text, banner)

    return res.send({
      message: "News successfully updated!"
    })

  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const erase = async (req, res) => {
  try {
    const { id } = req.params

    const news = await findByIdService(id)

    if (String(news.user._id) !== req.userId) {
      return res.status(400).send({
        message: "You didn't delete this News"
      })
    }

    await eraseService(id)

    return res.send({
      message: "News deleted successfully"
    })
  } catch (error) {
    res.status(500).send({ message: error.message })

  }
}

const likeNews = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const newsLiked = await likeNewsService(id, userId)

    if(!newsLiked){
      await deleteLikeNewsService(id, userId)
      return res.status(200).send({
        message: "Like successfully removed"
      })
    }

    res.send({
      message: "Like done successfully"
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }

}

const addComment = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId
    const { comment } = req.body

    if(!comment){
      return res.status(400).send({
        message: "Write a message to comment"
      })
    }

    await addCommentService(id, comment, userId)

    res.send({
      message: "Comment successfully competed!"
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const deleteComment = async (req, res) => {
  try {
    const { idNews, idComment } = req.params
    const userId = req.userId
  
    const commentDeleted = await deleteCommentService(
      idNews, 
      idComment, 
      userId
    )

    const commentFinder = commentDeleted.comments.find(comment => comment.idComment === idComment)
    
    if(!commentFinder){
      return res.status(400).send({
        message: "Comment not found"
      })
    }

    if(commentFinder.userId !== userId) {
      return res.status(400).send({
        message: "You can't delete this comment"
      })
    }
    res.send({
      message: "Comment successfully removed!"
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
export { create, findAll, topNews, findById, searchByTitle, byUser, update, erase, likeNews, addComment, deleteComment }