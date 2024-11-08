interface IPatents{
    id: string;
    military: string;
    executive: string;
}

interface IMidia {
    name: string;
    link: string;
}



export class System {
   public readonly id?: string;
   public nameOrganization: string
   public name: string;
   public patents: IPatents[];
   public teams: string[];
   public highlights: string[];
   public midia: IMidia[]

   constructor(props: Omit<System, "id">, id?: string){
    Object.assign(this, props)
   }
}
