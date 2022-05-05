const database = require('./db.js');

module.exports = {
  getLeaderboard: (req, res) => {
    database.WorkoutData.aggregate([
      { $group: { _id: "$name", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
      .then(result => res.send(result))
      .catch(error => console.log(error));
  },
  saveWorkout: (req, res) => {
    database.save(req.body)
      .then(() => res.send({message: 'Workout has been saved to database.'}))
      .catch(error => console.log(error))
    ;
  },
  // eslint-disable-next-line no-unused-vars
  getStatus: (req, res) => {
    database.WorkoutStatus.find({})
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  },
  saveStatus: (req, res) => {
    database.saveStatus(req.body)
      .then(() => res.send({message: 'Status has been saved to database.'}))
      .catch(error => console.log(error))
    ;
  },
  editStatus: (req, res) => {
    database.WorkoutStatus.updateOne({name: req.body.name}, {message: req.body.message})
      .then(result => res.send(result))
      .catch(error => console.log(error))
    ;
  },
  deleteStatus: (req, res) => {
    database.WorkoutStatus.deleteOne({name: req.body.name})
      .then(result => res.send(result))
      .catch(error => console.log(error))
    ;
  },
};
