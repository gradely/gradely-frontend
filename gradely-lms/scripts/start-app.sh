#!/bin/bash

cd /var/www/vue/test/lms
npm run build #To build the app
mv /var/www/vue/test/lms/dist /var/www/vue/test/lms/build
