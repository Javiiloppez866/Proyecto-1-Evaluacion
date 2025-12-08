const express = require('express');
const router = express.Router();

const { getExercises, getExercise, postExercise, putExercise, deleteExercise } = require('../controller/exercises');

router.get('/exercises', getExercises);
router.get('/exercises/:id', getExercise);
router.post('/exercises', postExercise);
router.put('/exercises/:id', putExercise);
router.delete('/exercises/:id', deleteExercise);

module.exports = router;