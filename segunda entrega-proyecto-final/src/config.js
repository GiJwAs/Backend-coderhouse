const options = {
    mongodb: {
        host: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    firestore: {
        "type": "service_account",
        "project_id": "proyecto-coder-backend",
        "private_key_id": "54ae3cf187218c2519498fcf4cc2a8d08a7fd504",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsAQ41I2Jmg0eJ\nmNjfOu8LHuYwamOhu7l9Wtq+h43qPjJkOvgCoKJo7D9/uosr6hu2D+aDK6enybM9\nfWFmUymou9EHbgBZbTtZ/VuunRJH9bNLKLsOjRxB8M62VbAPSmXFUA9kD85VJzzx\nxIFXM5qT9XiHM8HKQt/LiM9kvF3xCT8qqyuAAJJDOLXLRn/62IdzFoQdll/4kme6\nypAlCqC65W2WgPWpbJeQWHI2eiZKE2i/FWkRYrOoS8YYPgdIRBdTf6VFoPfDJSzw\n/hyhdyhZZVCW0WrR/37V7th+5pzOpWBei1arBNIT5Nu/fn+CBOw4mMma+hcR9Tr3\nk67piDhPAgMBAAECggEABnhXYu+1gC0QBQ95mPXpoxtMma96g6YF8vnPUeLTyLXG\n2VSA/VNjtOTVg5JVuxdPok++MPhXHE2T4HiQw9YkY6R7w4C0tlmuJY5IY14HqWXp\nkn8eWPja0RtBg/Vo49uWHV6VmBaYvFjP+DlvxozhxOepZLGALZVnogGYX0GxwgV3\nHRNonbNBPVK9brf65+kpBhVlTXZHfqZrgdbAFvE8LBFjPBJg4mnqM1d19HBlvx42\nMzm2p9A/j8BNcUU2K8bw/433yDE8dHO5wSP/wOUfBSj+rhA2T+wmFxnJ8CRuTa0D\np8+rO6jq4vDA+DNBVo8TN6OflGCuCIO+tGlw2YFjAQKBgQDtqmDVxVPh4i/5lf/C\nGuuAo93dcxgp0pSPbqKj7tYYXZ+EseZaKko24dSUA9t1Le2jCxdpR6tLjHYsl925\n3u2pXp4d1Xy9YSf0WNI/rcZItr22f3GUZ5vblnpuuKb5ZneXJjc7X2XQsUXHwGLK\nJgekZF2KBQv6e4prtfsxRHsR+QKBgQC5RfCInAvCuTEn7UT5s0gvRoCz6rpn3Xw3\nClsZ83rCaeyEMDHddZPW7wN6S0QrFuE53AFRjfO7sgXya6a4B1pXz2mmXfNvFpBC\nUFIc2+xw6IAYBDC7sI5XHr+VmpRopuhgK/gm5llv27mjvuSnr+qgubQsGESD7KGH\nWQiLJF8uhwKBgDBKIgrNYVHQJ3dK5wCFf7xPj1DjhdFZnB3YmOs+J/oja7oGe4tu\ndE3abNr2Paz9e/9YzZTynvdmvswov0B470kulGnzarj/+KJJOc7+e/9iQgHGu0kw\nFBb16EJ++k5KZ5oqhaZmp8VTf54qlOgF+h+I1QiqJdjrKSDhhPxpsafhAoGAQcmC\n4o8+YdNuj/XhYyT1AcxwEPLNY+oynDyyIqHhOj1wfXO7kR6Z810FiBxHxWEncmsb\nkMDuBfztvanaFkiOHNYKdsevlAeYC+QHdDXnXCRCr8R1JYBI2siRUOcFwa9aniOe\nxvlOUrjbzzgOazi9AHtQbcPkOFAC/1NvBDFTFusCgYEAlWuo03rlK1yepr4fr4B7\nA/yWjW/JzL8q7kNek6ZWibWkqolZ6/7OHZbEyGrCwdZxVFdnQt0/6NJ8vMW5w8Mj\nUYgjAg/xnYGp5Ngupzw3mABCihrmx8iyWrtQnvC2ktbKHR90TPSSr/UczFxdeEn7\nQSPmaeQzuelrWfDhTxFchM8=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-w3d77@proyecto-coder-backend.iam.gserviceaccount.com",
        "client_id": "107429172044744924614",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-w3d77%40proyecto-coder-backend.iam.gserviceaccount.com"
    }
}

module.exports = options;