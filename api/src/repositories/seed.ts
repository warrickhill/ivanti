import { db } from "./db";
import * as schema from "./schema";

// Admin staff
const adminStaff = [];
for (let i = 1; i <= 6; i++) {
  adminStaff.push({
    username: `admin${i}`,
    email: `admin-${i}@dancingpony.pub`,
    password: Bun.password.hashSync("password"),
    contactNumber: `07${`${i}`.padStart(9, "0")}`,
    type: "Admin",
    isBlocked: false,
  });
}
await db.insert(schema.users).values(adminStaff);

// Customers
let customers = [];
for (let i = 1; i <= 2000; i++) {
  customers.push({
    username: `customer${i}`,
    email: `customer-${i}@test.com`,
    password: Bun.password.hashSync("password"),
    contactNumber: `01280${`${i}`.padStart(6, "0")}`,
    type: "Customer",
    isBlocked: i % 100 === 0 ? true : false,
  });
  if (i % 100 === 0) {
    await db.insert(schema.users).values(customers);
    customers = [];
  }
}

// Dishes
const dishes = [];
for (const main of [
  "Chicken",
  "Beef",
  "Lamb",
  "Pork",
  "Fish",
  "Sessional Veg",
]) {
  for (const sauce of [
    "and Barbecue sauce",
    "and Mushroom",
    "Curry",
    "and Pesto",
  ]) {
    for (const side of ["Rice", "Chips", "Chunky Bread", "Pasta"]) {
      const name = `${main} ${sauce} with ${side}`;
      dishes.push({
        name,
        description: `The name ${name} says it all`,
        image: "https://fakeimg.pl/600x400",
        price: 10.99,
      });
    }
  }
}
await db.insert(schema.dishes).values(dishes);

// Reviews
const maxDishId = 6 * 4 * 4;
let ratings = [];
for (let i = 1; i <= 8000; i++) {
  const userId = 7 + (i % 2000);
  const dishId = 1 + (i % maxDishId);
  const rating = 1 + (i % 5);
  ratings.push({ userId, dishId, rating });
  if (i % 100) {
    await db.insert(schema.ratings).values(ratings);
    ratings = [];
  }
}
