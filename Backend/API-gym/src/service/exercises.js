const db = require('../configuration/database.js').db;

const findAllExercises = (async () => {
    return await db('exercises').select('*');
});

const findExercise = (async(id) => {
    return await db('exercises').select('*').where({id: id}).first();
});

const addExercise = (async(name, duration, difficulty, calories, date, active, notes) => {
    return await db('exercises').insert({
        name: name,
        duration: duration,
        difficulty: difficulty,
        calories: calories,
        date: date,
        active: active,
        notes: notes
    });
});

const modifyExercise = (async(id, name, duration, difficulty, calories, date, active, notes) => {
    await db('exercises').where({id: id}).update({
        name: name,
        duration: duration,
        difficulty: difficulty,
        calories: calories,
        date: date,
        active: active,
        notes: notes
    });
});

const removeExercise = (async(id) => {
    await db('exercises').where({id: id}).del();
});

const exerciseExistsById = (async(id) => {
    const exercise = await db('exercises').select('*').where({id: id}).first();
    return exercise != null;
});

const exerciseExistsByName = (async(name) => {
    const exercise = await db('exercises').select('*').where({name: name}).first();
    if (exercise === undefined) {
        return false;
    } else {
        return true;
    }
});



module.exports = {
    findAllExercises,
    findExercise,
    addExercise,
    modifyExercise,
    removeExercise,
    exerciseExistsById,
    exerciseExistsByName
}