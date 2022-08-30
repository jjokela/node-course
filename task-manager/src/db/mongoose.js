import mongoose from 'mongoose'


function connect() {
  const url = `mongodb+srv://dev-user:${process.env.MONGO_PWD}@mongocluster.rchnsme.mongodb.net/task-manager-api`

  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected"),
  );
}

export { connect }
