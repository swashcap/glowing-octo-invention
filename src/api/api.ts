import 'hard-rejection/register'
import 'reflect-metadata'

import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { FeatureConfigurationResolver } from './featureConfigurationResolver'
import { ProductResolver } from './productResolver'
import { UserResolver } from './userResolver'

const port = process.env.PORT || 3000

export const getApp = async () => {
  const app = express()
  const schema = await buildSchema({
    resolvers: [FeatureConfigurationResolver, ProductResolver, UserResolver]
  })
  const server = new ApolloServer({
    schema,
    uploads: false,
    subscriptions: false
  })

  server.applyMiddleware({ app })

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
  }

  app.use(cors())

  return app
}

if (require.main === module) {
  ;(async () => {
    const app = await getApp()
    app.listen(port, () => {
      console.log(`Listening on ${port}`)
    })
  })()
}
