const { findAllExercises, exerciseExistsById, exerciseExistsByName, modifyExercise, addExercise, removeExercise, findExercise } = require('../service/exercises');

const getExercises = (async (req, res) => {
    const exercises = await findAllExercises();

    res.status(200).json(exercises);
});

const getExercise = (async (req, res) => {
    const id = req.params.id;

    if (! await exerciseExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'the exercise does not exist'
        });
    }

    const exercise = await findExercise(id);

    res.status(200).json(exercise);
});

const postExercise = (async (req, res) => {
    const name = req.body.name;
    const duration = req.body.duration;
    const difficulty = req.body.difficulty;

    if (!name || duration === undefined || !difficulty) {
        return res.status(400).json({
            code: 400,
            title: 'bad-request',
            message: 'name, duration and difficulty are required'
        });
    }

    if (typeof duration !== 'number' || (req.body.calories !== undefined && typeof req.body.calories !== 'number')) {
        return res.status(400).json({
            code: 400,
            title: 'bad-request',
            message: 'duration and calories must be numbers'
        });
    }

    if (await exerciseExistsByName(name)) {
        return res.status(409).json({
            code: 409,
            title: 'conflict',
            message: 'an exercise already exists with that name'
        });
    }
    
    const calories = req.body.calories;
    const date = req.body.date;
    const active = req.body.active;
    const notes = req.body.notes;
    const order = req.body.order;
    
    const newExercise = await addExercise(name, duration, difficulty, calories, date, active, notes, order);
    res.status(201).json(newExercise);
});

const putExercise = (async (req, res) => {
    const id = req.params.id;
    
    if (!await exerciseExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'the exercise does not exist'
        });
    }

    const name = req.body.name;
    const duration = req.body.duration;
    const difficulty = req.body.difficulty;

    if (!name || duration === undefined || !difficulty) {
        return res.status(400).json({
            code: 400,
            title: 'bad-request',
            message: 'name, duration and difficulty are required'
        });
    }

    if (typeof duration !== 'number' || (req.body.calories !== undefined && typeof req.body.calories !== 'number')) {
        return res.status(400).json({
            code: 400,
            title: 'bad-request',
            message: 'duration and calories must be numbers'
        });
    }

    const calories = req.body.calories;
    const date = req.body.date;
    const active = req.body.active;
    const notes = req.body.notes;
    const order = req.body.order

    await modifyExercise(id, name, duration, difficulty, calories, date, active, notes, order);

    res.status(204).end();
});

const deleteExercise = (async (req, res) => {
    const id = req.params.id;
    
    if (!await exerciseExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'the exercise does not exist'
        });
    }
    await removeExercise(id);
    
    res.status(204).end();
});

module.exports = {
    getExercises,
    getExercise,
    postExercise,
    putExercise,
    deleteExercise
}