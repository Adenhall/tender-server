import express from 'express'
const router = express.Router()

// TO DO: Implement authentication
router.get('/', (_req, res) => {
    res.send('Hello worldddd')
})

export default router