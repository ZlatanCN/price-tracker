'use server';

import mongoose from 'mongoose';
import chalk from 'chalk';

let isConnected = false;

const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    console.log(chalk.red.bold('MONGODB_URI is not set'));
  } else if (isConnected) {
    console.log(chalk.yellow.bold('Already connected to the database'));
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      isConnected = true;
      console.log(chalk.green.bold('Connected to the database'));
    } catch (error) {
      console.log(
        chalk.red.bold(`Failed to connect to the database: ${error.message}`));
    }
  }
};

export default connectToDB;