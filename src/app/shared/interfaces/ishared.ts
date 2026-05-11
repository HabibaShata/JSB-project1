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
