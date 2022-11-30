# 跨域操作
## 通过后端

### 简单请求
> 简单的 form-data, plain, urlencode 等操作
- 直接通过 header 进行设置就完事了

### 复杂请求
> 里面添加了一些 X-token ,其它的请求方式 put delete 等
- 需要进行一些额外的操作,进行后端的, 跨域控制