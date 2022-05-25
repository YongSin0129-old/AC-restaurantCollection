![image](./picture/restaurants%20homepage.png)

# 餐廳收集網

一個使用 Node.js + Express + MongoDB + Mongoose 打造的餐廳美食收集網站

## Features - 產品功能

1. 使用者可以在首頁看到所有餐廳與它們的簡單資料
2. 使用者可以再點進去看餐廳的詳細資訊
3. 使用者可以透過搜尋餐廳名稱來找到特定的餐廳
4. 使用者可以透過搜尋餐廳類別來找到特定的餐廳
5. 使用者可以新增一家餐廳
6. 使用者可以瀏覽一家餐廳的詳細資訊
7. 使用者可以瀏覽全部所有餐廳
8. 使用者可以修改一家餐廳的資訊
9. 使用者可以刪除一家餐廳


### Environment  - 開發環境

- Nodejs v16.14.2
- nodemon @2.0.16

### package  - 使用套件

By NPM
- express 4.18.1
- express-handlebars 6.0.5
- dotenv 16.0.1
- mongoose 5.9.7

By CDN
- jquery 3.3.1
- popper 1.14.7
- bootstrap 4.3.1
- font-awesome 5.8.1

### Installing - 專案安裝流程

1. 打開 terminal, Clone 此專案至本機電腦

```
git clone https://github.com/yongsin0129/restaurantCollection.git -b A7-add-CRUD
```

2. 使用終端機 Terminal, 進入存放此專案的資料夾

```
cd restaurantCollection
```

3. 使用終端機 Terminal, 安裝 npm 套件

```
npm install
```


4. 在此專案的資料夾新增一個.env，放入 DOT_MONGODB_URI，連結你的 mongoBD

```
DOT_MONGODB_URI='mongodb+srv://你的帳號:你的密碼@cluster0.ac5wn.mongodb.net/資料庫名稱?retryWrites=true&w=majority'
```

5. 使用終端機 Terminal, 建立種子資料，執行 addDummyData 檔案

```
npm run seed
```

6. 使用終端機 Terminal, 開啟 server，執行 app.js 檔案

```
npm run dev
```
看到訊息以下訊息表示成功執行此專案
```
this server is listening on http://localhost:3000
mongoose ok !
```


## Acknowledgments

* alpha camp
