use studentDB
db.createCollection("students")
// Insert Sample Data
db.students.insertMany([
{ _id: 1, name: "Alice", age: 20,
marks: 85, city: "New York" },
{ _id: 2, name: "Bob", age: 19,
marks: 78, city: "Chicago" },
{ _id: 3, name: "Charlie", age: 21,
marks: 92, city: "Los Angeles" },
{ _id: 4, name: "David", age: 18,
marks: 67, city: "Chicago" },
{ _id: 5, name: "Eva", age: 20,
marks: 88, city: "Houston" },
{ _id: 6, name: "Ava", age: 22,
marks: 75, city: null }
])
1 db.students.find()
2 db.students.find({ marks: { $gt:
80 } })
3 db.students.findOne({ name:
"Alice" })
4 db.students.find({ city: "Chicago"
})
5 db.students.find({ age: { $gte: 19,
$lte: 21 } })
6 db.students.find({ marks: { $gte:
70, $lte: 90 } })
7 db.students.find().sort({ marks:
-1 })
8 db.students.find().sort({ marks:
-1 }).limit(3)
9 db.students.find({ name: /^A/ })
10 db.students.countDocuments({
marks: { $gt: 80 } })
11 db.students.deleteOne({ name:
"David" })
12 db.students.find({ marks: { $in:
[85, 92] } })
13 db.students.find({ city: { $ne:
"Chicago" } })
14 db.students.updateOne(
{ name: "Alice" },
{ $set: { grade: "A" } }
)
15 db.students.find({}, { name: 1,
marks: 1, _id: 0 })
16 db.students.updateMany(
{ city: null },
{ $set: { city: "DefaultCity" } }
)
17 db.students.updateMany(
{},
{ $rename: { "marks": "score" } }
)
18 db.students.find({}, { city: 0 })
2)
use employeeDB
db.createCollection("employees")
db.employees.insertMany([
{ _id: 1, name: "John", age: 30,
salary: 50000, department: "HR",
city: "New York" },
{ _id: 2, name: "Emma", age: 25,
salary: 60000, department: "IT",
city: "Chicago" },
{ _id: 3, name: "Liam", age: 35,
salary: 75000, department:
"Finance", city: "Los Angeles" },
{ _id: 4, name: "Olivia", age: 28,
salary: 55000, department: "IT",
city: "Houston" },
{ _id: 5, name: "Noah", age: 40,
salary: 80000, department:
"Management", city: "Chicago" },
{ _id: 6, name: "Sophia", age: 32,
salary: 45000, department: "HR",
city: null }
])
1 db.employees.find()
2 db.employees.find({ salary: { $gt:
60000 } })
3 db.employees.findOne({ name:
"John" })
4 db.employees.find({ department:
"IT" })
5 db.employees.find({ age: { $gte:
28, $lte: 35 } })
6 db.employees.find({ salary: {
$gte: 50000, $lte: 75000 } })
7 db.employees.find().sort({ salary:
1 })
8 db.employees.find().sort({ salary:
-1 }).limit(2)
9 db.employees.find({ name: /^S/ })
10 db.employees.
countDocuments({ department:
"HR" })
11 db.employees.deleteOne({
name: "Olivia" })
12 db.employees.find({ salary: {
$in: [50000, 80000] } })
13 db.employees.find({ city: { $ne:
"Chicago" } })
14 db.employees.updateOne({
name: "John" }, { $set: { experience:
5 } })
15 db.employees.find({}, { name: 1,
salary: 1, _id: 0 })
16 db.employees.updateMany({
city: null }, { $set: { city:
"DefaultCity" } })
17 db.employees.updateMany({}, {
$rename: { "salary": "income" } })
18 db.employees.find({}, {
department: 0 })
3)
use collegeDB
db.createCollection("college")
db.college.insertMany([
{ _id: 1, name: "Green Valley
College", location: "New York",
ranking: 5, studentsCount: 2000,
type: "Private" },
{ _id: 2, name: "Sunrise Institute",
location: "Chicago", ranking: 8,
studentsCount: 1500, type:
"Government" },
{ _id: 3, name: "Techno State
University", location: "Los
Angeles", ranking: 2,
studentsCount: 3000, type:
"Government" },
{ _id: 4, name: "Riverdale College",
location: "Houston", ranking: 10,
studentsCount: 1200, type:
"Private" },
{ _id: 5, name: "National Arts
College", location: "Chicago",
ranking: 6, studentsCount: 1800,
type: "Private" },
{ _id: 6, name: "Future Vision
College", location: null, ranking: 12,
studentsCount: 900, type:
"Private" }
])
1. db.college.find()
2. db.college.find({ ranking: { $lt: 6
} })
3. db.college.findOne({ name:
"Green Valley College" })
4. db.college.find({ location:
"Chicago" })
5. db.college.find({ studentsCount:
{ $gte: 1000, $lte: 2500 } })
6. db.college.find({ type:
"Government" })
7. db.college.find().sort({ ranking: 1
})
8. db.college.find().sort({ ranking: 1
}).limit(3)
9. db.college.find({ name: /^N/ })
10. db.college.countDocuments({
studentsCount: { $gt: 1500 } })
11. db.college.deleteOne({ name:
"Riverdale College" })
12. db.college.find({ ranking: { $in:
[2, 5] } })
13. db.college.find({ location: { $ne:
"Chicago" } })
14. db.college.updateOne({ name:
"Green Valley College" }, { $set: {
accredited: true } })
15. db.college.find({}, { name: 1,
ranking: 1, _id: 0 })
16. db.college.updateMany({
location: null }, { $set: { location:
"DefaultLocation" } })
17. db.college.updateMany({}, {
$rename: { "studentsCount":
"totalStudents" } })
18. db.college.find({}, { type: 0 })
4)
use orderDB
db.createCollection("orders")
db.orders.insertMany([
{ _id: 1, customerName: "Alice",
product: "Laptop", quantity: 1, price:
80000, status: "Delivered", city:
"New York" },
{ _id: 2, customerName: "Bob",
product: "Mobile", quantity: 2, price:
20000, status: "Shipped", city:
"Chicago" },
{ _id: 3, customerName: "Charlie",
product: "Headphones", quantity: 3,
price: 3000, status: "Delivered", city:
"Los Angeles" },
{ _id: 4, customerName: "David",
product: "Tablet", quantity: 1, price:
25000, status: "Pending", city:
"Houston" },
{ _id: 5, customerName: "Eva",
product: "Laptop", quantity: 2, price:
75000, status: "Shipped", city:
"Chicago" },
{ _id: 6, customerName: "Sophia",
product: "Camera", quantity: 1, price:
50000, status: "Delivered", city: null }
])
1. db.orders.find()
2. db.orders.find({ price: { $gt: 30000
} })
3. db.orders.findOne({
customerName: "Alice" })
4. db.orders.find({ product: "Laptop"
})
5. db.orders.find({ quantity: { $gte: 1,
$lte: 3 } })
6. db.orders.find({ price: { $gte:
20000, $lte: 80000 } })
7. db.orders.find().sort({ price: 1 })
8. db.orders.find().sort({ price: -1
}).limit(2)
9. db.orders.find({ customerName:
/^S/ })
10. db.orders.countDocuments({
status: "Delivered" })
11. db.orders.deleteOne({
customerName: "David" })
12. db.orders.find({ price: { $in:
[20000, 50000] } })
13. db.orders.find({ city: { $ne:
"Chicago" } })
14. db.orders.updateOne({
customerName: "Alice" }, { $set: {
orderDate: "2024-01-01" } })
15. db.orders.find({}, {
customerName: 1, product: 1, _id: 0 })
16. db.orders.updateMany({ city: null
}, { $set: { city: "DefaultCity" } })
17. db.orders.updateMany({}, {
$rename: { "price": "cost" } })
18. db.orders.find({}, { status: 0 })
5)
use movieDB
db.createCollection("movies")
db.movies.insertMany([
{ MovieID: 1, title: "Inception",
DirectorName: "Christopher Nolan",
rating: 8.8, lang: "English", duration:
148, Releasedyear: 2010 },
{ MovieID: 6, title: "3 Idiots",
DirectorName: "Rajkumar Hirani",
rating: 8.4, lang: "Hindi", duration: 170,
Releasedyear: 2009 }
])
1. db.movies.find()
2. db.movies.find({ rating: { $gt: 8 } })
3. db.movies.find({ title: "Inception" })
4. db.movies.find({ DirectorName:
"Christopher Nolan" })
5. db.movies.find({ Releasedyear: {
$gt: 2000, $lt: 2010 } })
6. db.movies.find({ duration: { $gt: 90,
$lt: 150 } })
7. db.movies.find({}, { lang: 0 })
8. db.movies.find().sort({ rating: -1
}).limit(3)
9. db.movies.countDocuments({
rating: { $gt: 8 } })
10. db.movies.deleteOne({ title:
"Transformers" })
11. db.movies.find({ rating: { $in: [7.5,
9.0] } })
12. db.movies.find({ DirectorName: {
$ne: "Michael Bay" } })
13. db.movies.updateOne({ title:
"Inception" }, { $set: { genre: "Sci-Fi" }
})
14. db.movies.find({}, { title: 1, rating:
1, _id: 0 })
15. db.movies.updateMany({}, {
$rename: { "duration": "runtime" } })
16. db.movies.find({}, { lang: 0 })
17. db.movies.createIndex({ title: 1 })
18. db.movies.createIndex({
DirectorName: 1, rating: -1 })
19. db.movies.createIndex({ title: 1 }, {
unique: true })
20. db.movies.createIndex({ rating: -1
})
21. db.movies.getIndexes()
22.
db.movies.getIndexes().filter(index =>
index.key.hasOwnProperty("Director
Name"))
23. db.movies.dropIndex("title_1")
24. db.movies.dropIndexes()
