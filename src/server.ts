import * as express from 'express'
import * as helmet from 'helmet'
import apis from './apis'
import * as httpProxy from 'express-http-proxy'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

apis.forEach(({ url, route }) => {
  app.use(`/${route}`, httpProxy(url, { timeout: 3000 }))
})

app.get('/', (req, res) => {
  return res.json('Application is runnig')
})

app.listen(3000, () => console.log('Application is running'))
