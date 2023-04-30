#!/bin/bash

cd /var/www/vue/test/assessmentdev
npm run build
rm -r build && mv /var/www/vue/test/assessmentdev/dist /var/www/vue/test/assessmentdev/build
