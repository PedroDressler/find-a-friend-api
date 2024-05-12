import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'

export const app = fastify()

app.register(fastifyJwt)
