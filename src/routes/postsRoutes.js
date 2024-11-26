import express from "express"; // Importa o módulo express
import multer from "multer"; // Importa o módulo multer
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionSuccessStatus: 200
}

// Importa as funções controladoras do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
  // Define o destino para armazenamento dos arquivos enviados
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo armazenado
  filename: function (req, file,) {
    cb(null, file.originalname);
  }
})

// Configura o middleware multer para usar o armazenamento definido em 'storage'
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  // Permite que o servidor receba dados no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (tratada pela função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (tratada pela função postarNovoPost) 
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware 'upload.single("imagem")' 
  // e chama a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;