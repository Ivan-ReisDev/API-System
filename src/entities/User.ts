
export class User {
    public readonly id?: string;

   public nickname: string;
   public password: string;
   public patent: string;
   public classes: string[];
   public teans: string[];
   public status: string;
   public userType: string;
   public tag:string;
   public token?: string | null;
   public warnings: number;
   public medals: string;
   public code?: string | null;
   public tokenActive?: string | null;
   public tokenIsNotValide?: string[];


   constructor(props: Omit<User, "id">, id?: string){
    Object.assign(this, props)
   }
}
