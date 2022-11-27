import { Router } from "express";

const router = Router();

// Site routes

router.get('/site', (req, res) => {
  res.json({message: "all sites"})
})
router.get('/site/:id', (req, res) => {
  res.json({message: "single site"})
})
router.post('/site', (req, res) => {
  res.json({message: "create site"})
})
router.put('/site/:id', (req, res) => {
  res.json({message: "update site"})
})
router.delete('/site/:id', (req, res) => {
  res.json({message: "delete site"})
})

export default router;
