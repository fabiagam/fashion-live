# fashion-live
We are  building a premier platform for finding out about and buying the latest fashion &amp; beauty items. The core of will be the live selling shows hosted by content creators. During these shows, consumers will be able to buy the products shown in real-time. In turn, the content creators want to be able to talk live about how well the product is selling and how much is left in inventory. You can imagine them encouraging people to buy before the last few are sold.

## Steps and Instructions

**Note**  
Kindly ensure the machine to be used in launching this project  has NodeJS >= v14.6 and npm 8.1.0 already installed.

**Stack Requirements**  
```
1. NodeJs 14.6 or >= and npm 8.1.0
2. Sqlite
```

# PART I: Download & Build on local

## Step 1: From github
### 1) Clone the repository and run only one npm command

``` 
//on local
git clone https://github.com/fabiagam/fashion-live
cd fashion-live
npm run build
```

## Step 2: Install REST client extension  to vscode or installand launch Postman
### 1) Launch and test API endpoints on postman or Thunder Client (https://www.thunderclient.io/)

``` 
Ensure you launch postman on your machine and enter the required endpoints for manual testing

`/POST  http://127.0.0.1:6000/inventory/`   
`/POST http://127.0.0.1:6000/show/:show_id/buy_item/:item_id`   
`/GET  http://127.0.0.1:6000/show/:show_id/sold_items/:item_id` 
```
Kindly refer to  **/data/seed_run.js** for sample data to use.



# PART II: Process Flow Diagram and Screenshoots
Here are test screenshotsand results obtained after Test-DrineApproach was put to use:

![inventory_post](https://user-images.githubusercontent.com/1788922/143665537-dcfefb52-ad77-48db-9ea3-9630967668e8.png)


![unit_tes_part2](https://user-images.githubusercontent.com/1788922/143665547-d511bace-7c5d-417a-8067-2265c583fd17.png)


![unit_test_part1](https://user-images.githubusercontent.com/1788922/143665551-b79b9cc6-ca68-4440-b826-48487b3cf0bf.png)


![process-flow-1](https://user-images.githubusercontent.com/1788922/143665774-132be378-c44d-47e1-9c89-a25a2ac6a62f.png)

