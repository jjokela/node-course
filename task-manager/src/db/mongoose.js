import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const url = `mongodb+srv://jjokela:${process.env.MONGO_PWD}@mongocluster.rchnsme.mongodb.net/task-manager-api`

mongoose.connect(url)

mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected"),
  );
