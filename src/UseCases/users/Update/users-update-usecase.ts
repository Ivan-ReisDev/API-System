import { IError } from "../../../../types/error.interface";
import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/User/IUser-repository";
import { IUpdateUserRequestDTO } from "./users-update-DTO";

//pendente comentários de explicação ao decorrer do código
export class UsersUpdateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    public async execute(data: IUpdateUserRequestDTO): Promise<IError | boolean> {
        let newData: IUpdateUserRequestDTO | IError | null = null;
        try {
            if(!data){
                return { error: "Ops! body não encontrado", status: 400 } 
            }

            switch (data.type) {
                case "account.update.status":
                    newData = await this.validateUpdateStatus(data);
                    if (newData && "error" in newData && "status" in newData) {
                        return newData;
                    }
                    break;

                case "account.update.tag":
                    newData = await this.validateUpdateTag(data);
                    if (newData && "error" in newData && "status" in newData) {
                        return newData;
                    }
                    break;

                case "account.update.team":
                    newData = await this.validateUpdateTeam(data);
                    if (newData && "error" in newData && "status" in newData) {
                        return newData;
                    }
                    break;

                case "account.update.requirements":
                    newData = await this.validateUpdateRequirements(data);
                    if (newData && "error" in newData && "status" in newData) {
                        return newData;
                    }
                    break;

                case "account.update.admins":
                    newData = await this.validateUpdateAdminOrDirector(data);
                    if (newData && "error" in newData && "status" in newData) {
                        return newData;
                    }
                    break;

                default:
                    return { error: "Ops! Type não encontrado", status: 400 }    

            }

            if (newData && ("nickname" in newData || "id" in newData)) {
                if (newData.nickname) {
                    await this.userRepository.update(newData as User);
                    return true;
                } else if (newData.id) {
                    await this.userRepository.update(newData as User);
                    return true;
                } else {
                    return { error: "Erro interno", status: 400 };
                }
            }
            return false;
        } catch (error) {
            console.error("Erro ao executar a operação:", error);
            return { error: "Erro inesperado ao executar a operação", status: 500 };
        }
    }

    private async validateUpdateStatus(data: IUpdateUserRequestDTO): Promise<IError | IUpdateUserRequestDTO> {
        if (!data.nickname || typeof data.nickname !== 'string' || !data.codeActive || !data.password) {
            return { error: "Ops! Informe todos os dados para ativação", status: 400 }
        }
        const user = await this.userRepository.findByNickname(data.nickname);
        if (user && typeof user === 'object') {
            const mottoHabbo = await this.statusHabboAPI(user.nickname);
            if (mottoHabbo && typeof mottoHabbo === 'string') {
                if (mottoHabbo === data.codeActive) {
                    const newData: IUpdateUserRequestDTO = { nickname: data.nickname, password: data.password, status: "Ativo", };
                    return newData;
                }
                return { error: "Ops! Código de verificação incorreto", status: 400 }
            }
            return typeof mottoHabbo === "object" ? mottoHabbo : data;
        }

        return { error: "Ops! Usuário não encontrado", status: 404 };

    }

    private async validateUpdateTag(data: IUpdateUserRequestDTO): Promise<IError | IUpdateUserRequestDTO> {
        if (!data.id || typeof data.id !== 'string' || !data.tag) {
            return { error: "Ops! Informe todos os dados para criação da tag", status: 400 };
        }

        const userUpdate = await this.userRepository.findById(data.id);
        if (!userUpdate || typeof userUpdate !== 'object') {
            return { error: "Ops! Usuário não encontrado", status: 404 };
        }

        if (!this.isValidTag(userUpdate.nickname, data.tag)) {
            return { error: "Tag inválida. A tag deve ter exatamente 3 caracteres e seguir o padrão do nickname.", status: 400 };
        }
        return { id: userUpdate.id, tag: data.tag }; 

    }

    //Adicionar verificação de lider e vice líder de equipe quando o useCase Teams for criardo.
    private async validateUpdateTeam(data: IUpdateUserRequestDTO): Promise<IError | IUpdateUserRequestDTO> {
        if (!data.id || typeof data.id !== 'string') {
            return { error: "Ops! Informe todos os dados para atualização do usuário", status: 400 };
        }

        if (!data.teans || !Array.isArray(data.teans)) {
            return { error: "Ops! 'teans' deve ser um array", status: 400 };
        }
    

        if(data.user?.userType === "Admin" || data.user?.userType === "Diretor") {
            const user = await this.userRepository.findById(data.id);
            if(user && typeof user === 'object'){
                return { id: user.id, teans: data.teans }; 
            }
            return { error: "Ops! Usuário não encontrado", status: 404 }; 
        }
        return { error: "Ops! Erro desconhecido", status: 500 }; 
    }

        //Adicionar verificação de lider e vice líder de equipe quando o useCase Requeriments for criardo.
        private async validateUpdateRequirements(data: IUpdateUserRequestDTO): Promise<IError | IUpdateUserRequestDTO> {
            if (!data.nickname || typeof data.nickname !== 'string' || !data.patent || !data.code) {
                return { error: "Ops! Informe todos os dados para atualizar o usuário", status: 400 };
            }

                const user = await this.userRepository.findByNickname(data.nickname);
                if(user && typeof user === 'object'){

                    const userData = {
                        id: user.id,
                        patent: data.patent ?? undefined,
                        code: data.code ?? undefined,
                        warnings: data.warnings ?? undefined
                    }
                    return userData;
                }
                return { error: "Ops! Usuário não encontrado", status: 404 }; 
            }
    

    private async validateUpdateAdminOrDirector(data: IUpdateUserRequestDTO): Promise<IError | IUpdateUserRequestDTO> {
        if (!data.id || typeof data.id !== 'string') {
            return { error: "Ops! Informe todos os dados para a atualização", status: 400 }
        }  
        console.log(data)
        if (data.user?.userType === "Admin" || data.user?.userType === "Diretor") {
            const userUpdate = await this.userRepository.findById(data.id);
            if (userUpdate && typeof userUpdate === "object") {
                const updateData: Partial<IUpdateUserRequestDTO> = {};
                updateData.id = data.id;
                updateData.nickname = data.nickname ?? userUpdate.nickname ?? undefined;
                updateData.password = data.password ?? userUpdate.password ?? undefined;
                updateData.patent = data.patent ?? userUpdate.patent ?? undefined;
                updateData.classes = data.classes ?? userUpdate.classes ?? undefined;
                updateData.teans = data.teans ?? userUpdate.teans ?? undefined;
                updateData.status = data.status ?? userUpdate.status ?? undefined;
                updateData.userType = data.userType ?? userUpdate.userType ?? undefined;
                updateData.tag = data.tag ?? userUpdate.tag ?? undefined;
                updateData.token = data.token ?? userUpdate.token ?? undefined;
                updateData.tokenActive = data.tokenActive ?? userUpdate.tokenActive ?? undefined;
                updateData.warnings = data.warnings ?? userUpdate.warnings ?? undefined;
                updateData.medals = data.medals ?? userUpdate.medals ?? undefined;
                updateData.code = data.code ?? userUpdate.code ?? undefined;

                return updateData;
            }
            return { error: "Ops! Usuário não encontrado", status: 404 };
        }

        return { error: "Ops! Permissão insuficiênte", status: 403 };

    }

    private async statusHabboAPI(nickname: string): Promise<IError | string> {
        const response = await fetch(`https://www.habbo.com.br/api/public/users?name=${nickname}`, {
            method: "GET",
        });
        const data = await response.json();
        if (data.status !== 200) {
            return { error: "Usuário não encontrado no Habbo Hotel BR/PT", status: 404 }
        }
        return data.motto.trim();
    }

    private isValidTag(nickname: string, tag: string): boolean {
        if (tag.length !== 3) {
            return false;
        }
        const validChars = new Set(nickname.split('')); 

        for (let i = 0; i < tag.length; i++) {
            if (!validChars.has(tag[i])) {
                return false; 
            }
        }
        return true; 
    }

}
