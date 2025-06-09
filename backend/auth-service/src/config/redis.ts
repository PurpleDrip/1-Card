import { Redis } from '@upstash/redis'
const UPSTASH_REDIS_REST_URL="https://useful-camel-15797.upstash.io"
const UPSTASH_REDIS_REST_TOKEN="AT21AAIjcDFhNzNkM2Y2NjMwMjE0YzAzYjBjNDRlNjc5MjU2ZjBmNnAxMA"

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
})

export default redis;