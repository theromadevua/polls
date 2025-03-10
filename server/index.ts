import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config';
import { authRouter } from './modules/auth/routes/auth.routes';
import fileUpload from 'express-fileupload'
import { surveyRouter } from './modules/survey/routes/survey.routes';

const app = express();

const corsOptions = {
  origin: [config.CLIENT_URL, config.SERVER_URL], 
  credentials: true,
};

app.use(cors(corsOptions)); 
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(express.static('public'));

app.use('/auth', authRouter);
app.use('/survey', surveyRouter);

const start = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    app.listen(config.PORT, () => {
      console.log(`Server started on port ${config.PORT}`);
    });
  } catch (e) { 
    console.error('Server error:', e);
  }
};

start(); 