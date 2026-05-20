export interface IRecipes {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  tag: {
    id: number;
    name: string;
  };
  category: [
    {
      id: number;
      name: string;
    },
  ];
}

export interface IUser {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  group:{
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
  },
  creationDate: string;
  modificationDate:string;

}
export interface IUserResponse {
  data: IUser[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
  pageNumber: number;
  pageSize: number;

}

export interface IRecipesResponse {
  data: IRecipes[];
  pageNumber: number;
  pageSize: number;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}
export interface ITag {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}
export interface ICategory {
 data:ITag[];
  pageNumber: number;
  pageSize: number;
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}



export interface IDeletedItemInfo {
  id: number;
  name: string;
  endPoint: string;

}

export interface IFavorite {
  id: number;
  creationDate: string;
  modificationDate: string;
  recipe:IRecipes
}
export interface IFavoriteResponse {
  data: IFavorite[];
  pageNumber: number;
  pageSize: number;
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}
