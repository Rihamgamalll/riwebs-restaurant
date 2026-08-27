export type MenuCategory = 'Burgers'|'Sandwiches'|'Meals'|'Sides'|'Drinks'|'Sauces';
export type Choice={label:string; price:number};
export type MenuItem = {
  id:string; name:string; description:string; price:number; category:MenuCategory; image:string; spice?:number;
  sizes?:Choice[]; types?:Choice[]; extras?:Choice[];
};

const burgerSizes=[{label:'Single',price:0},{label:'Double',price:55},{label:'Triple',price:95}];
const mealSizes=[{label:'Regular',price:0},{label:'Large',price:45}];
const drinkSizes=[{label:'330 ml',price:0},{label:'500 ml',price:20}];
const burgerExtras=[{label:'Extra cheese',price:25},{label:'Extra patty',price:55},{label:'Jalapeño',price:15},{label:'House sauce',price:20}];
const sandwichExtras=[{label:'Extra cheese',price:25},{label:'Extra chicken/beef',price:50},{label:'House sauce',price:20}];
const redBullFlavours=[
  {label:'Original',price:0},{label:'Sugarfree',price:0},{label:'Zero',price:0},{label:'White Peach',price:10},
  {label:'Cherry & Wild Berries',price:10},{label:'Coconut & Berry',price:10},{label:'Açaí Berry',price:10},
  {label:'Watermelon',price:10},{label:'Tropical',price:10},{label:'Blueberry',price:10},
];
const v7Flavours=[
  {label:'Pink Lemonade',price:0},{label:'Pomegranate',price:0},{label:'Blueberry',price:0},{label:'Lemon Mint',price:0},{label:'Piña Colada',price:0},
];

export const menuItems:MenuItem[] = [
  {id:'classic-burger',name:'Classic Burger',description:'Juicy burger, lettuce, tomato, cheddar and RiWebs house sauce.',price:185,category:'Burgers',image:'/assets/Menu/Classic Burger.png',spice:1,sizes:burgerSizes,types:[{label:'Beef',price:0},{label:'Crispy chicken',price:10}],extras:burgerExtras},
  {id:'double-burger',name:'Double Burger',description:'Two generous layers with double melt and signature sauce.',price:245,category:'Burgers',image:'/assets/Menu/Double Burger.png',spice:1,sizes:burgerSizes,types:[{label:'Beef',price:0},{label:'Crispy chicken',price:10}],extras:burgerExtras},
  {id:'crispy-burger',name:'Crispy Burger',description:'Golden crispy chicken, creamy melt, fresh crunch and bold sauce.',price:210,category:'Burgers',image:'/assets/Menu/Crispy Burger.png',spice:2,sizes:burgerSizes,types:[{label:'Original',price:0},{label:'Spicy',price:10}],extras:burgerExtras},
  {id:'beef-burger',name:'Beef Burger',description:'Grilled beef, cheddar and fresh vegetables in a toasted bun.',price:225,category:'Burgers',image:'/assets/Menu/Beef burger.png',spice:1,sizes:burgerSizes,types:[{label:'Classic',price:0},{label:'Smoky BBQ',price:15}],extras:burgerExtras},
  {id:'double-beef',name:'Double Beef Burger',description:'A heavy double-beef stack made for serious hunger.',price:285,category:'Burgers',image:'/assets/Menu/Double Burger beef.png',spice:1,sizes:burgerSizes,types:[{label:'Classic',price:0},{label:'Smoky BBQ',price:15}],extras:burgerExtras},

  {id:'chicken-roll',name:'Chicken Roll',description:'Crispy chicken roll with lettuce and creamy house sauce.',price:165,category:'Sandwiches',image:'/assets/Menu/Sandwich Rool.png',spice:1,sizes:[{label:'Regular',price:0},{label:'Large',price:35}],types:[{label:'Original',price:0},{label:'Spicy',price:10}],extras:sandwichExtras},
  {id:'beef-roll',name:'Beef Roll',description:'Savory beef roll with cheese, vegetables and signature sauce.',price:195,category:'Sandwiches',image:'/assets/Menu/Sandwich Rool Beef.png',spice:1,sizes:[{label:'Regular',price:0},{label:'Large',price:40}],types:[{label:'Classic',price:0},{label:'BBQ',price:15}],extras:sandwichExtras},
  {id:'classic-sandwich',name:'Classic Sandwich',description:'The easy favorite — balanced, saucy and built to grab.',price:155,category:'Sandwiches',image:'/assets/Menu/burger-classic.png',spice:1,sizes:[{label:'Regular',price:0},{label:'Large',price:35}],types:[{label:'Chicken',price:0},{label:'Beef',price:25}],extras:sandwichExtras},

  {id:'complete-meal',name:'Complete Meal',description:'Burger, fries, coleslaw and a cold drink in one complete box.',price:320,category:'Meals',image:'/assets/Menu/complete meal.png',sizes:mealSizes,types:[{label:'Classic burger',price:0},{label:'Crispy burger',price:20},{label:'Beef burger',price:35}],extras:[{label:'Extra fries',price:45},{label:'Extra coleslaw',price:35},{label:'Extra sauce',price:20}]},

  {id:'golden-fries',name:'Golden Fries',description:'Crisp, hot and lightly seasoned.',price:70,category:'Sides',image:'/assets/fries.png',sizes:[{label:'Regular',price:0},{label:'Large',price:30}],types:[{label:'Classic',price:0},{label:'Spicy',price:10}],extras:[{label:'Cheese sauce',price:30},{label:'House sauce',price:20}]},
  {id:'coleslaw',name:'Coleslaw',description:'Cool creamy slaw with a bright crunch.',price:55,category:'Sides',image:'/assets/coleslaw.png',sizes:[{label:'Regular',price:0},{label:'Large',price:25}]},

  {id:'pepsi',name:'Pepsi',description:'Ice-cold Pepsi.',price:55,category:'Drinks',image:'/assets/Pepsi.png',sizes:drinkSizes},
  {id:'mirinda',name:'Mirinda',description:'Cold orange Mirinda.',price:55,category:'Drinks',image:'/assets/Pepsi mirinda.png',sizes:drinkSizes},
  {id:'sprite',name:'Sprite',description:'Cold, crisp lemon-lime Sprite.',price:55,category:'Drinks',image:'/assets/Pepsi sprite.png',sizes:drinkSizes},
  {id:'7up',name:'7UP',description:'Fresh lemon-lime 7UP.',price:55,category:'Drinks',image:'/assets/Pepsi green.png',sizes:drinkSizes},
  {id:'redbull',name:'Red Bull',description:'Choose your Red Bull edition or flavour.',price:90,category:'Drinks',image:'/assets/RedBull.png',types:redBullFlavours},
  {id:'vseven',name:'V7',description:'Pick one of five refreshing V7 flavours.',price:75,category:'Drinks',image:'/assets/V seven.png',types:v7Flavours},

  {id:'ketchup',name:'Ketchup',description:'Classic tomato ketchup.',price:20,category:'Sauces',image:'/assets/Sauce Ketchup.png'},
  {id:'ranch',name:'Ranch Sauce',description:'Cool creamy ranch.',price:25,category:'Sauces',image:'/assets/Sauce Ranch.png'},
  {id:'mayonnaise',name:'Mayonnaise',description:'Creamy mayonnaise.',price:20,category:'Sauces',image:'/assets/Sauce mayonnaise.png'},
  {id:'mustard',name:'Mustard',description:'Bright tangy mustard.',price:20,category:'Sauces',image:'/assets/Sauce mustarda.png'},
  {id:'bbq',name:'BBQ Sauce',description:'Smoky sweet barbecue dip.',price:25,category:'Sauces',image:'/assets/Sauce parpique.png'},
];

export const categories=['All','Burgers','Sandwiches','Meals','Sides','Drinks','Sauces'] as const;
