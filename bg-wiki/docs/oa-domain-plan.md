#### OA后端域名规划

##### 1. 域名规划
- 一个部门的项目只用一个域名
- 域名命名规划：api+部门代号.banggood.cn
- 新服务按此规划配置，已上线服务保持不变

部门 | 域名 | 
---|---|
财务|apifit.banggood.cn  |
供应链 |apiscm.banggood.cn  |
销售系统|apisp.banggood.cn  |
公共平台|apipps.banggood.cn  |
仓储|apiewms.banggood.cn  |
广告|apiad.banggood.cn  |
架构|apiarch.banggood.cn  |
物流|apitms.banggood.cn  |
客服|apicrm.banggood.cn  |
- 所属部门的后端服务统一以域名+目录访问的形式调用（可一级或多级目录）
- 如:销售平台的infringement后端调用地址为：apisp.banggood.cn/business/infringement/


##### 2. nginx配置
- 配置文件路径为/root/release/nginx/conf.d
- 参考apisp.conf配置

```
server {
     listen 80;
     listen 443 ssl;
     server_name   apisp.banggood.cn;
     charset utf-8;
     ssl_certificate     /etc/nginx/conf.d/certs/2018banggood.cn.pem;
     ssl_certificate_key /etc/nginx/conf.d/certs/2018banggood.cn.key;
     include             /etc/nginx/conf.d/certs/ssl.conf;

  location /business/infringement/  {
   proxy_set_header Host $host;
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header X-Forwarded-Proto $scheme;
   proxy_pass http://sp-infringement-svc.prod-sp:8080/;
   proxy_redirect          off;
   proxy_next_upstream     error timeout invalid_header http_500;
   proxy_connect_timeout   300;
   proxy_send_timeout      300;
   proxy_read_timeout      300;


  }
}
```