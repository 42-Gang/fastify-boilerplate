/**
 * 이 파일은 애플리케이션을 독립 실행형으로 실행하려는 경우에만 사용됩니다.
 *
 * `npm run standalone` 명령어로 실행할 수 있습니다.
 */

import Fastify from 'fastify' // Fastify 프레임워크를 가져옵니다.
import fp from 'fastify-plugin' // Fastify 플러그인 유틸리티를 가져옵니다.
import closeWithGrace from 'close-with-grace' // Fastify 프로세스를 가능한 한 우아하게 종료하기 위한 라이브러리를 가져옵니다.
import app from './app.js' // 애플리케이션을 일반 플러그인으로 가져옵니다.

/**
 * NODE_ENV를 사용하여 로거(또는 환경 관련 기능)를 결정하지 마십시오.
 * @see {@link https://www.youtube.com/watch?v=HMM7GJC5E2o}
 */
function getLoggerOptions() {
  if (process.stdout.isTTY) {
    return {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
    }
  }
  return { level: process.env.LOG_LEVEL ?? 'silent' }
}

function createServer() {
  return Fastify({
    logger: getLoggerOptions(),
    ajv: {
      customOptions: {
        coerceTypes: 'array',
        removeAdditional: 'all'
      }
    }
  })
}

async function startServer(server: Fastify.FastifyInstance) {
  try {
    await server.listen({ port: process.env.PORT ?? 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

async function init() {
  const server = createServer()
  server.register(fp(app))

  closeWithGrace(
    { delay: process.env.FASTIFY_CLOSE_GRACE_DELAY ?? 500 },
    async ({ err }) => {
      if (err != null) {
        server.log.error(err)
      }
      await server.close()
    }
  )

  await server.ready()
  await startServer(server)
}

init()
