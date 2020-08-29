const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// Get all exercises, return as JSON. If error, return the error message as JSON

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add exercise

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
    .then(() => res.json('Exercise Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// '/:id' is like a variable.
// it is a mongoDB object id
// exercises/objectid with a get request returns info on just this exercise
// req.params.id gets that info from the url with json

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
})

// delete by id

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update by id

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);


            exercise.save()
                .then(() => res.json('Exercise Added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;