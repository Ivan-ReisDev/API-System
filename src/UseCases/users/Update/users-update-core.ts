// import { IError } from "../../../../types/error.interface";
// import { IRequestUser } from "../../../../types/user-interfaces";
// import { prismaCliente } from "../../../database/prisma";

// enum typeUpdate {
//     ActionAdmin = "Ação Administrativa",
//     Classroom = "Aula",
//     HumanResources = "Recursos Humanos",
//     Admin = "Admin"

// }

// interface IData {
//     id: string;
//     nickname?: string;
//     patent?: string;
//     code?: string;
//     classes?: string;
//     teans?: string;
//     status?: string;
//     tag?: string;
//     warnings?: number;
//     password?: string;
// }

// enum IStatusRequirements {
//     Pending = "Pendente", 
//     Approved ="Aprovado", 
//     Failed = "Reprovado"

// }

// export class UsersUpdateCore {
//     type: typeUpdate;
//     user: IRequestUser; 
//     data: IData;
//     statusRequirements: IStatusRequirements


//     constructor(user: IRequestUser, type: typeUpdate, data: IData, statusRequirements: IStatusRequirements) {
//         this.type = type;
//         this.user = user;
//         this.data = data;
//         this.statusRequirements = statusRequirements;
//     }

//     public async Execute(): Promise<string | boolean> {
//         try {
//             const validationError = await this.validate();
//             if (validationError) {
//                 return validationError; 
//             }
            

//             const createUserSuccess = await this.create();
//             if (createUserSuccess) {
//                 return true; 
//             }

//             return "Erro ao criar o usuário."; 
//         } catch (error) {
//             console.error("Erro ao executar a operação:", error); 
//             return "Erro inesperado ao executar a operação."; 
//         }
//     }

//     private async validate() {
//         if (!this.type) {
//             return 'Ops! Por favor informe o tipo de update.';
//         }

//         switch(this.type){
 
//             case "Ação Administrativa":
//                 const validate = this.validateAcionAdmin();
//                 if(validate !== null){

//                 }
//                 return 

//             case "Aula":
//                 return
            
//             case "Recursos Humanos":
//                 return   
                
//             case "Admin":
//                 return
                
//             default:
//                 return        

//         }


//     }

     
//     private validateAcionAdmin (){
//         if(this.data.patent || this.data.code || this.data.warnings) {
//             const error: IError = {
//                 error: 'Ops! Por favor informe todos os dados para atualização.',
//                 status: 400
//             }

//             return error;
//         }

//         return null

//     } 

//     private async update(): Promise<null | IError> {
//         try {
//             const dataToUpdate: Partial<IData> = {
//                 patent: this.data.patent ?? this.data.patent,
//                 code: this.data.code ?? this.data.code,
//                 classes: this.data.classes ?? this.data.classes ,
//                 teans: this.data.teans ?? this.data.teans,
//                 status: this.data.status ?? this.data.status,
//                 tag: this.data.tag ?? this.data.tag,
//                 warnings: this.data.warnings ?? this.data.warnings,
//                 password: this.data.password ?? this.data.password
//             };
    
//             const filteredDataToUpdate = Object.fromEntries(
//                 Object.entries(dataToUpdate).filter(([_, value]) => value !== undefined && value !== null)
//             );
    
//             const updated = await prismaCliente.user.update({
//                 where: { id: this.data.id },
//                 data: filteredDataToUpdate
//             });

//             if(!updated) {
//                 return { error: "Erro ao atualizar usuário", status: 500 };
//             }
    
//             return null;
    
//         } catch (error) {
//             console.error("Erro ao atualizar nickname:", error);
//             return { error: "Erro ao atualizar nickname", status: 500 };
//         }
//     }
    

//     private async userValidateOperation(): Promise<string | null> {
//         try {
//             const user = await prismaCliente.user.findUnique({
//                 where: {
//                     id: this.user.id,
//                 },
//             });
//             if(user?.status === "Ativo") {
//                 return null; 
//             }

//             return "Permissão insuficiênte"; 
//         } catch (error) {
//             console.error("Erro ao buscar usuário:", error);
//             return "Erro ao verificar a existência do usuário."; 
//         }
//     }

//     private async userThereIsDatabase(): Promise<string | null> {
//         try {
//             const user = await prismaCliente.user.findUnique({
//                 where: {
//                     nickname: this.nickname,
//                 },
//             });

//             if (user) {
//                 return "Usuário já existe"; 
//             }

//             return null; 
//         } catch (error) {
//             console.error("Erro ao buscar usuário:", error);
//             return "Erro ao verificar a existência do usuário."; 
//         }
//     }

//     private async create(): Promise<boolean> {
//         try {
//             const newUser = await prismaCliente.user.create({
//                 data: {
//                     nickname: this.nickname,
//                     password: "TESTE",
//                     patent: this.patent,
//                     classes: this.classes && this.classes.length > 0 ? [this.classes] : ["Curso Inicial [C.I]"],
//                     teans: ["System"], 
//                     status: "Pendente",
//                     tag: "Vazio",
//                     warnings: 0,
//                     medals: "0",
//                     userType: "User",
//                 },
//             });
//             return !!newUser;
//         } catch (error) {
//             console.error("Erro ao criar usuário:", error);
//             return false; 
//         }
//     }
// }
