![image](./picture/restaurants%20homepage.png)

# 餐廳收集網

一個使用 Node.js 打造的餐廳美食收集網站

## Features - 產品功能

- 使用者可以在首頁看到所有餐廳與它們的簡單資料
- 使用者可以再點進去看餐廳的詳細資訊
- 使用者可以新增一家餐廳
- 使用者可以修改一家餐廳的資訊
- 使用者可以刪除一家餐廳
- 使用者可以透過搜尋餐廳 [名稱] or [類別] 來找到特定的餐廳
- 使用者可以將餐廳排序
- 使用者可以註冊自已的帳號做管理
- 使用者可以使用自已的FB做帳號註冊


### Environment  - 開發環境

- Nodejs v16.14.2
- nodemon @2.0.16

### package  - 使用套件

By NPM
- "bcryptjs": "^2.4.3",
- "connect-flash": "^0.1.1",
- "dotenv": "^16.0.1",
- "express": "^4.18.1",
- "express-handlebars": "^6.0.5",
- "express-session": "^1.17.1",
- "method-override": "^3.0.0",
- "mongoose": "^5.9.7",
- "passport": "^0.4.1",
- "passport-facebook": "^3.0.0",
- "passport-local": "^1.0.0"

By CDN
- jquery 3.3.1
- popper 1.14.7
- bootstrap 4.3.1
- font-awesome 5.8.1

### Installing - 專案安裝流程

1. 打開 terminal, Clone 此專案至本機電腦

```
git clone https://github.com/yongsin0129/restaurantCollection.git -b 2-3-A2-passport
```

2. 使用終端機 Terminal, 進入存放此專案的資料夾

```
cd restaurantCollection
```

3. 使用終端機 Terminal, 安裝 npm 套件

```
npm install
```

4. 在此專案的資料夾新增一個.env，env需放入的變數請參考 .env.example

5. 使用終端機 Terminal, 建立種子資料

```
npm run seed
```

6. 使用終端機 Terminal, 開啟 server

```
npm run dev
```
看到訊息以下訊息表示成功執行此專案
```
this server is listening on http://localhost:3000
mongoose ok !
```
7. 測試用帳號

```
{ name: 'user1', email: 'user1@example.com', password: '12345678' }
{ name: 'user2', email: 'user2@example.com', password: '12345678' }
```
## Acknowledgments

* alpha camp
