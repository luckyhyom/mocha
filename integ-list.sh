#!/bin/bash

list=""list=""
for i in `cat ./integ-list.txt`
 do list="${list} ${i}"
done

mocha $list --reporter mochawesome --exit

open ./mochawesome-report/mochawesome.html