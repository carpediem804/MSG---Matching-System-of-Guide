# MSG---Matching-System-of-Guide

## 프로젝트 개요 
 여행자들은 패키지 여행보다 자유여행을 선호한다. 패키지 여행은 시간이 촉박하여 여유를 즐기지 못하거나, 자신과 맞지 않는 음식, 장소도 어쩔  수 없이 따라야한다는 단점을 가지고 있어 자유여행을 선호하지만, 자유여행 역시 상황에 따라 가이드의 필요성이 느껴지는 단점을 가지고 있다. 또한, 가이드 주로 여행사에게 많은 수수료를 내기 때문에 역시 노력에 비례한 보상을 받지 못하고 있다는 문제점이 있다. 

 이러한 여행자와 가이드의 문제점과 요구사항을 맞춰주는 가이드 매칭 시스템인 ‘MSG’ 플랫폼은 다른 플랫폼들과는 다르게 **여행자**는 자신의 자유일정에 맞게 **가이드의 단기간 투어**, 또는 가이드 모집글을 작성하여 필**요한 순간에 가이드를 동행**할 수 있으며, **가이드** 역시 자신의 시간에 맞게 가이드 일을 하며, **노력에 비례한 보상**을 받을 수 있게 한다.
 
 ## 전체 시스템 구조도 
 ![msg 전체 시스템 구조도](https://user-images.githubusercontent.com/33194900/61107164-2ef21480-a4ba-11e9-9f2c-eb971a76b3a0.png)

## 각 구성 요소별 소프트웨어 구조
![각구성 요소별](https://user-images.githubusercontent.com/33194900/61107227-5e088600-a4ba-11e9-934a-7e2d3a4458f4.png)

# 기능 별 실행화면
### 회원가입과 로그인 기능
![image](https://user-images.githubusercontent.com/33194900/61107276-855f5300-a4ba-11e9-870c-9e03a2f02bf4.png)

### 마이페이지의 프로필 수정 기능
![image](https://user-images.githubusercontent.com/33194900/61107309-98722300-a4ba-11e9-9bf1-4dc0be811bb3.png)
### 여행객 마이페이지의 등록상품 확인
![image](https://user-images.githubusercontent.com/33194900/61107358-b2ac0100-a4ba-11e9-911d-671612f2aea1.png)
### 가이드 마이페이지의 등록상품 확인
![image](https://user-images.githubusercontent.com/33194900/61107399-c3f50d80-a4ba-11e9-8aa3-5f44a7869655.png)
### 여행객 및 가이드 마이페이지의 신청상품 확인
![image](https://user-images.githubusercontent.com/33194900/61107419-d2432980-a4ba-11e9-933b-63002719b901.png)
**여행객**
![image](https://user-images.githubusercontent.com/33194900/61107473-f4d54280-a4ba-11e9-821f-b8ba5973c4e5.png)
**가이드**
### 등록기능 
![image](https://user-images.githubusercontent.com/33194900/61107506-0880a900-a4bb-11e9-8b5e-f271baab0edd.png)
![image](https://user-images.githubusercontent.com/33194900/61107517-0c143000-a4bb-11e9-901d-b0a670ea81c4.png)
### 검색기능
 #### 날짜및 키워드 검색 
 ![image](https://user-images.githubusercontent.com/33194900/61107541-2221f080-a4bb-11e9-8046-cc5c267c7e52.png)
 #### 이미지 검색 
![image](https://user-images.githubusercontent.com/33194900/61107557-2817d180-a4bb-11e9-9802-91139e506ba7.png)
#### 가이드 모집 글 검색 
![image](https://user-images.githubusercontent.com/33194900/61107561-2b12c200-a4bb-11e9-944a-de1e5ccce455.png)

### 신청기능 
![image](https://user-images.githubusercontent.com/33194900/61107615-509fcb80-a4bb-11e9-8c4f-c1f7404144b0.png)
![image](https://user-images.githubusercontent.com/33194900/61107621-539abc00-a4bb-11e9-81a4-4abd89e1a3ef.png)
![image](https://user-images.githubusercontent.com/33194900/61107624-55fd1600-a4bb-11e9-91fe-6fa21e1da7fe.png)
### 결제기능 
![image](https://user-images.githubusercontent.com/33194900/61107635-5e555100-a4bb-11e9-8349-7cb5ed137b94.png)
### 리뷰기능 
![image](https://user-images.githubusercontent.com/33194900/61107650-68774f80-a4bb-11e9-972f-d3cae39273bc.png)


## Setup
## install dependencies
* yarn install
## build for production with minification
* yarn run build 
## serve with hot reload at localhost:8080
* yarn run dev
## for Add-ons
* npm install firebase
* npm i --save-dev expose-loader
* npm i --save jquery
* npm install vue-iamport
* yarn install
* npm install --save @google-cloud/vision
* npm install moment --save
* yarn add moment
* npm install --save vue-momentjs
* yarn run build
