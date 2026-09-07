import { Router } from "express";
import { fans } from "../data/fans";

const router = Router();

// GET /api/fans
// Returns the whole catalogue as a JSON array.
router.get("/", (req, res) => {
  const catalogue = fans.slice(0, 5);
  res.json(catalogue);
});

// GET /api/fans/:id
// Returns a single fan, or a 404 if we do not sell it.
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const fan = fans.find((f) => f.id === id);

  if (!fan) {
    res.status(404).json({ error: "Fan not found" });
    return;
  }

  res.json(fan);
});

export default router;
