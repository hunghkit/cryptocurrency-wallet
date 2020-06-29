import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

export const database = mongoose;
