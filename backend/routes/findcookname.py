import pandas as pd
import numpy as np
from sklearn import neighbors
import sys
import json
from importlib import reload
from sklearn.neighbors import NearestNeighbors

data = pd.read_csv('.\\routes\\recipe_data_3_1.csv', engine='python')

b = data['recipeId'] #label
a = data.loc[:,'ham'::] #data
#total_data = pd.concat([b,a],axis=1)
column = a.columns

check_item = sys.argv
item = [0]*73;
#print(check_item)
for i in range(len(column)):
    #print(i);
    if column[i] in check_item:
        #print("iii로들어옴")
        item[i] = 1;
#받은 데이터로 배열 만들기
#print(item);
knn=neighbors.KNeighborsClassifier(n_neighbors=1)
knn.fit(a, b)
neigh = NearestNeighbors(n_neighbors=3)
neigh.fit(a,b)
#print("item :", item);
answer2 = neigh.kneighbors([item])

print(answer2[1]);
answer = knn.predict([item]);
print("answer : ",answer);
#print("------")
print(item[0]);
print(item[1]);
print(item[2]);
#if 1 in item:
    #print("111111111")
    #check_item.find()
    #print(column[i].encode().decode())