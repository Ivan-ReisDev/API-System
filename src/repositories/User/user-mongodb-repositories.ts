import { Post } from "../../entities/Post";
import notion from "../database/notionClient"; // Importa o cliente do Notion
import { IPostRepository } from "./IPosts-repositories";

export class PostNotionRepositoryes implements IPostRepository {
    
    private notionDatabaseId = process.env.NOTION_DATABASE_ID || ""; // ID do banco de dados no Notion

    async getByTitle(title: string): Promise<Post[] | boolean> {
        try {
            // Faz a consulta ao Notion para buscar páginas com o título especificado
            const response = await notion.databases.query({
                database_id: this.notionDatabaseId,
                filter: {
                    property: "Title",
                    title: {
                        equals: title,
                    },
                },
            });

            // // Formata a resposta para retornar uma lista de objetos `Post`
            // const posts: Post[] = response.results.map((page) => {
            //     return {
            //         id: page.id,
            //         title: page.properties.Title.title[0]?.text.content || "",
            //         content: page.properties.Content.rich_text[0]?.text.content || "",
            //         // Adicione outras propriedades conforme necessário
            //     } as Post;
            // });

            return response;
        } catch (error) {
            console.error("Erro ao buscar dados no Notion:", error);
            return false;
        }
    }
}
