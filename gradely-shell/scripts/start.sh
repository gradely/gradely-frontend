#!/bin/bash
cd /var/www/vue/test/gradely-base
npm run build
if [ -d "/var/www/vue/test/gradely-base/build" ]; then rm -Rf /var/www/vue/test/gradely-base/build; fi 
mv /var/www/vue/test/gradely-base/dist /var/www/vue/test/gradely-base/build
