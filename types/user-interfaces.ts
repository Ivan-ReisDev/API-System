enum Status {
    Pendente = 'Pendente',
    Ativo = "Ativo",
    Desativado = "Desativado",
    Exonerado = "Exonerado",
    Banido = "Banido",
    Reformado = "Reformado",
    CFO = "CFO"
  }
  
  enum UserType {
    Admin = 'Admin',
    User = 'User',
    Diretor = "Diretor",
    RecursosHumanos = "Recursos Humanos"
  }
  type JsonValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JsonValue[] 
  | { [key: string]: JsonValue };

export interface IUser {
  id: string;                  
  nickname: string;           
  password?: string;           
  patent: string;             
  classes: JsonValue;  // Definido como JsonValue para aceitar qualquer estrutura JSON
  teans: JsonValue;    // Definido como JsonValue
  status: Status;             
  tag: string;                
  warnings?: number;           
  medals?: number;             
  userType: UserType;         
  code?: string;              
  tokenActive?: string;       
  tokenIsNotValide?: JsonValue; // Permite null ou JsonValue
}

export interface IRequestUser {
    id: string;
    nickname: string;
    patent: string;
    userType: string;
  };


