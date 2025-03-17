// ESM
import Fastify from 'fastify'


function getLoggerOptions () {
  // 프로그램이 대화형 터미널에서 실행 중인 경우에만
  if (process.stdout.isTTY) {
    return {
      level: 'info', // 로그 레벨을 'info'로 설정
      transport: {
        target: 'pino-pretty', // 로그 형식을 위해 'pino-pretty' 사용
        options: {
          translateTime: 'HH:MM:ss Z', // 로그 타임스탬프 형식 지정
          ignore: 'pid,hostname' // 로그에서 프로세스 ID와 호스트 이름 무시
        }
      }
    }
  }

  // 대화형 터미널이 아닌 경우 기본 로그 레벨을 'silent'로 설정
  return { level: process.env.LOG_LEVEL ?? 'silent' }
}

const fastify = Fastify({
  logger: getLoggerOptions(),
  ajv: {
    customOptions: {
      coerceTypes: 'array', // 데이터 유형을 키워드 유형에 맞게 변경
      removeAdditional: 'all' // 추가 본문 속성 제거
    }
  }
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ 
		port: process.env.PORT|| 3000 
	})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()