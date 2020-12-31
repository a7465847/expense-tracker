# 餐廳清單
採用 Node.js 和 Express 打造的記帳筆記本並佈署在Heroku雲端上，這是一個可以快速追蹤花費的好工具

## 專案畫面
![](https://i.imgur.com/I0m9MNp.png)
![](https://i.imgur.com/XxEOc8x.png)
![](https://i.imgur.com/zLNSncp.png)

## 環境建置(prerequisites)
- Node.js v10.15.0
- Express v4.17.1
- Express-handlebars v5.2.0
- mongodb with mongoose as ODM

## 安裝與執行步驟 (installation and execution)

- 使用 Git Bash

1. 將專案clone到本地環境
   ```
   git clone https://github.com/a7465847/expense-tracker.git
   ```

2. 進入專案資料夾
   ```
   cd expense-tracker
   ```

3. 查看專案內 package.json 檔案需安裝的npm套件
   ```
   npm install 
   ```

4. 安裝 nodemon 套件 (本地未安裝  請執行此步驟)
   ```
   npm install -g nodemon    
   ```

5. 新增種子資料
   ```
   npm run seed
   ```

6. 啟動伺服器，執行 app.js 檔案
   ```
   npm run dev or npm run start
   ```

7. 終端機回應以下內容 代表代表可執行
   ```
   Express is running on http://localhost:3000
   ```

8. 在瀏覽器輸入 http://localhost:3000 開始使用


## 功能描述 (features)
- 迅速建立消費明細
- 依照消費類別分類
- 依需求篩選出各分類花費總金額
- 紀錄消費同時能在每個消費上記載著日記
- 新增記帳資訊
- 修改記帳內容
- 刪除記帳內容

