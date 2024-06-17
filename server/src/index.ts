import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import multer from 'multer'
import { bucket } from './googleCloudStorage'
import Song, { ISong } from './routes/auth/models/Song' 
import Artist, { IArtist } from './routes/auth/models/Artist' 
import path from 'path'

connectDB()

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true 
  })
)

app.use(express.json())
app.use(logger)

const upload = multer({ storage: multer.memoryStorage() })

app.use('/api/v5', globalRouter)

app.post(
  '/api/v5/songs',
  upload.fields([{ name: 'song' }, { name: 'image' }]),
  async (req, res) => {
    try {
      const { title, artist, album } = req.body

      if (!req.files || !req.files['song'] || !req.files['image']) {
        return res.status(400).json({ message: 'Missing files' })
      }

      const songFile = req.files['song'][0] as Express.Multer.File
      const imageFile = req.files['image'][0] as Express.Multer.File

      const songBlob = bucket.file(
        `songs/${Date.now()}_${songFile.originalname}`
      )
      const imageBlob = bucket.file(
        `images/${Date.now()}_${imageFile.originalname}`
      )

      const songBlobStream = songBlob.createWriteStream({ resumable: false })
      const imageBlobStream = imageBlob.createWriteStream({ resumable: false })

      songBlobStream.end(songFile.buffer)
      imageBlobStream.end(imageFile.buffer)

      await new Promise((resolve, reject) => {
        songBlobStream.on('finish', resolve)
        songBlobStream.on('error', reject)
        imageBlobStream.on('finish', resolve)
        imageBlobStream.on('error', reject)
      })

      const newSong: ISong = new Song({
        title,
        artist,
        album,
        songUrl: `https://storage.googleapis.com/${bucket.name}/${songBlob.name}`,
        imageUrl: `https://storage.googleapis.com/${bucket.name}/${imageBlob.name}`
      })

      await newSong.save()

      res.status(200).json({
        message: 'Song and image uploaded successfully',
        songUrl: newSong.songUrl,
        imageUrl: newSong.imageUrl,
        title,
        artist,
        album
      })
    } catch (error) {
      console.error('Error uploading files:', error)
      res.status(500).json({ message: 'Error uploading files' })
    }
  }
)

app.get('/api/v5/songs', async (req, res) => {
  try {
    const songs = await Song.find({}, { _id: 0, __v: 0 }) 

    res.status(200).json(songs)
  } catch (error) {
    console.error('Error getting songs:', error)
    res.status(500).json({ message: 'Error getting songs' })
  }
})

app.put('/api/v5/songs/:id', async (req, res) => {
})

app.delete('/api/v5/songs/:id', async (req, res) => {
  try {
    const songId = req.params.id
    await Song.findByIdAndDelete(songId)

    res.status(200).json({ message: 'Song deleted successfully' })
  } catch (error) {
    console.error('Error deleting song:', error)
    res.status(500).json({ message: 'Error deleting song' })
  }
})

// Add an artist
app.post('/api/v5/artists', async (req, res) => {
  try {
    const { name, description, imageUrl, songIds } = req.body

    const songs = await Song.find({ _id: { $in: songIds } })

    const newArtist: IArtist = new Artist({
      name,
      description,
      imageUrl,
      songs: songs.map(song => song._id)
    })

    const savedArtist = await newArtist.save()
    res.status(201).json(savedArtist)
  } catch (error) {
    console.error('Error creating artist:', error)
    res.status(500).json({ message: 'Error creating artist' })
  }
})

app.get('/api/v5/artists/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate('songs')
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' })
    }
    res.status(200).json(artist)
  } catch (error) {
    console.error('Error getting artist:', error)
    res.status(500).json({ message: 'Error getting artist' })
  }
})

app.get('/api/v5/artists', async (req, res) => {
  try {
    const artists = await Artist.find().populate('songs')
    res.status(200).json(artists)
  } catch (error) {
    console.error('Error getting artists:', error)
    res.status(500).json({ message: 'Error getting artists' })
  }
})

const server = createServer(app)

server.listen(5000, () => {
  console.log('server running at http://localhost:5000/api/v5')
})
