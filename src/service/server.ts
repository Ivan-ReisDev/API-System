import express  from "express";
import config from "config";
import router from "../routers/router";
import { prismaCliente } from "../repositories/database/prisma";

const port = config.get<number>("PORT");

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(port, async () => {
        console.log(`Application online : http://localhost:${port}`)
        try {
            await prismaCliente.$connect();
            console.log("Conectado ao banco de dados com Prisma");
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error);
        }
});