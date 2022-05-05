const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to mongoDB');
});

const workoutSchema = new mongoose.Schema({
  name: { type: String },
  sets: Number,
  reps: Number,
  restTime: Number,
  date: { type: Date, default: Date.now }
});

const workoutStatusSchema = new mongoose.Schema({
  name: { type: String },
  message: String,
});

const WorkoutData = mongoose.model('WorkoutData', workoutSchema);

const WorkoutStatus = mongoose.model('WorkoutStatus', workoutStatusSchema);

module.exports = {
  WorkoutData: WorkoutData,
  WorkoutStatus: WorkoutStatus,
  save: function(reqObj) {
    const document = new WorkoutData({
      name: reqObj.name,
      sets: reqObj.sets,
      reps: reqObj.reps,
      restTime: reqObj.restTime,
    })
    return document.save();
  },
  saveStatus: function(reqObj) {
    const document = new WorkoutStatus({
      name: reqObj.name,
      message: reqObj.message,
    })
    return document.save();
  }
};
