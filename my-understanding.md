# My Understanding

## Submission Links

**Loom Video (must be set to public - anyone with the link):**
[paste your Loom video URL here]

---

## Questions

**1. What does each HTTP method in your API mean - GET, POST, PUT or PATCH, and DELETE? Why do we use different methods instead of just using POST for everything?**

`คำตอบ`
APIของผม
`GET`ใช้สำหรับขอดูข้อมูลสิ้นค้า
`POST` ใช้สำหรับสร้างสินค้าใหม่
`PATCH` ใช้สำหรับแก้ไขสินค้าที่มีอยู่แล้ว
`DELETE` ใช้สำหรับลบสินค้า

เหตุผลที่ไม่ใช้ `POST` อย่างเดียว เพราะแต่ละ method บอกความหมายของ request ชัดเจนกว่า เวลา test API จะเข้าใจง่ายว่า request นี้ต้องการจะทำอะไร

**2. What is `express.json()` and what would happen if you left it out?**

`คำตอบ`
`express.json()` เป็น middleware ที่ทำให้ Express อ่าน JSON ที่ส่งมากับ request body ได้

**3. What is the difference between `req.body`, `req.params`, and `req.query`? Give a real example from your API for each one.**

`คำตอบ`
`req.body` คือข้อมูลที่ส่งมากับ body ของ request
ในAPIผมคือ `POST /api/products` แล้วส่ง `name`, `price`, `quantity` มาใน JSON body

`req.params` คือค่าที่อยู่ใน path ของURLเช่น `:id`
ตัวอย่างคือ `GET /api/products/123` ค่า `123` จะอยู่ใน `req.params.id` แล้วผมเอา id นี้ไปหา product

`req.query` คือค่าที่อยู่หลังเครื่องหมาย `?` ใน URL
ตัวอย่างคือ `GET /api/products?name=katom` ค่า `katom` จะอยู่ใน `req.query.name` แล้วผมใช้ filter product ตามชื่อ
อีกตัวอย่างคือ `GET /api/products?sort=price` ผมใช้ `req.query.sort` เพื่อเรียงสินค้าจากน้อยไปมาก(ราคา)

**4. What are HTTP status codes? List every status code you used in your API and explain why you chose it for that situation.**

`คำตอบ`
HTTP status code คือเลขที่ server ส่งกลับไปบอก client ว่า request สำเร็จหรือมีปัญหาอะไร

ใน API ของผมใช้:

`200` ใช้ตอน request สำเร็จทั่วไป เช่น GET products, GET product by id, PATCH product, DELETE product

`201` ใช้ตอนสร้าง product ใหม่สำเร็จ เพราะ 201 หมายถึง created

`400` ใช้ตอน client ส่งข้อมูลไม่ถูกต้อง เช่นสร้าง product แต่ไม่ส่ง name หรือ price หรือส่ง price ที่ไม่ใช่ number

`404` ใช้ตอนหา product ไม่เจอ เช่นเรียก id ที่ไม่มีอยู่ใน array

`500` อยู่ใน error handling middleware สำหรับ error ที่ server ไม่ได้คาดไว้

**5. What is middleware? Describe what it does in your own words and give one example from your code.**

`คำตอบ`
Middleware คือ function ที่ request ต้องวิ่งผ่านก่อนจะไปถึง route หรือก่อนส่ง response กลับ

**6. Why does the order of middleware matter in Express? What could go wrong if it were in the wrong order?**

`คำตอบ`
ลำดับ middleware สำคัญ เพราะ Express จะทำงานจากบนลงล่าง

ตัวอย่างเช่น `express.json()` ต้องอยู่ก่อน routes ที่ใช้ `req.body` ถ้าวางไว้หลัง routes ตอน `POST` หรือ `PATCH` route จะอ่าน body ไม่ได้

**7. Walk through what happens on the server, step by step, when a POST request is sent to `/products`.**

`คำตอบ`
ในงานผม route จริงคือ `POST /api/products`

ขั้นตอนคือ:

1. Client ส่ง POST request มาที่ `/api/products` พร้อม JSON body เช่น name, price, quantity
2. Request ผ่าน `cors()` และ `express.json()`
3. `express.json()` แปลง JSON body ให้ผมอ่านได้จาก `req.body`
4. Request ผ่าน logger middleware แล้วแสดง method กับ URL ใน console
5. Express ส่ง request ไปที่ products route
6. Route เรียก function `createProduct`
7. ใน `createProduct` ผมดึง `name`, `price`, `quantity` จาก `req.body`
8. ถ้า name หรือ price ไม่มี จะตอบ `400`
9. ถ้าข้อมูลถูกต้อง จะสร้าง product ใหม่ มี id จาก `String(Date.now())`
10. เอา product ใหม่ push เข้า array `products`
11. ส่ง response กลับด้วย status `201` พร้อมข้อมูล product ที่สร้างใหม่

**8. What is CRUD? Map each operation to the HTTP method and route you used in your API.**

`คำตอบ`
CRUD คือการทำงานพื้นฐานกับข้อมูล มี 4 อย่างคือ Create, Read, Update, Delete

ใน API ของผม map แบบนี้:

Create = `POST /api/products` ใช้สร้าง product ใหม่

Read = `GET /api/products` ใช้ดู products ทั้งหมด

Read one = `GET /api/products/:id` ใช้ดู product หนึ่งชิ้นตาม id

Update = `PATCH /api/products/:id` ใช้แก้ไข product ตาม id

Delete = `DELETE /api/products/:id` ใช้ลบ product ตาม id

**9. How does your API respond when something goes wrong - for example, when a product with a given ID does not exist?**

`คำตอบ`
ถ้ามีอะไรผิดพลาด API จะส่ง status code และ message กลับไปให้ client

ตัวอย่างถ้าหา product ตาม id ไม่เจอ เช่น `GET /api/products/wrong-id` API จะตอบ `404` พร้อม message:

```json
{
  "message": "Product not found"
}
```

ถ้าสร้าง product แต่ส่งข้อมูลไม่ครบ เช่นไม่มี price API จะตอบ `400` พร้อม message:

```json
{
  "message": "Name and price are required"
}
```

แบบนี้ทำให้ client หรือคนที่ test API เข้าใจง่ายว่าผิดตรงไหน

**10. What was the hardest part of building this API and what did you do to get past it?**

`คำตอบ`
ส่วนที่ยากคือการเข้าใจว่า request แต่ละแบบเอาข้อมูลมาจากที่ไหนและจะเริ่มทำอะไรก่อนหรือหลังดี เช่นบางอันใช้ `req.body`, บางอันใช้ `req.params`, บางอันใช้ `req.query`
ยังต้องใช้AIในการช่วยพาเริ่มทำ ยังไม่สามารถเริ่มเองได้เลย เพราะยังไม่ค่อยเข้าใจ
แต่พอได้ลองยิง request จริง ๆ แล้วดู response กลับมา ทำให้ผมเข้าใจมากขึ้นว่าแต่ละ route ทำงานยังไง แล้วจะใช้งานมันยังไง
