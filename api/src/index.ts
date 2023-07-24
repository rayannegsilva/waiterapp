import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import path from 'node:path';
import http from 'node:http';
import { Server } from 'socket.io';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const port = 3001;


    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    server.listen(3001, () => {
      console.log(`🚀 Server is running on http//localhost:${port}`);
    });
    console.log('✅ Conectado com o Mongo');
  }).catch(() => { console.log('❌ Erro ao se conectar com o MongoDB.'); });

