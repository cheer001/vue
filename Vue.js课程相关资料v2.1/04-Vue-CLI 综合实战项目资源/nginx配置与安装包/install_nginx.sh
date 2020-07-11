#!/bin/bash
cd /opt/soft
tar -zxvf nginx-1.16.0.tar.gz
cd nginx-1.16.0/
./configure \
--prefix=/usr/local/nginx \
--with-http_stub_status_module \
--with-http_ssl_module
make && make install