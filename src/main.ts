/**
 * 이 파일은 애플리케이션을 독립 실행형으로 실행하려는 경우에만 사용됩니다.
 *
 * `npm run standalone` 명령어로 실행할 수 있습니다.
 */

import Fastify from 'fastify' // Fastify 프레임워크를 가져옵니다.
import fp from 'fastify-plugin' // Fastify 플러그인 유틸리티를 가져옵니다.

// Fastify 프로세스를 가능한 한 우아하게 종료하기 위한 라이브러리를 가져옵니다.
import closeWithGrace from 'close-with-grace'

// 애플리케이션을 일반 플러그인으로 가져옵니다.
import app from './app.js'

/**
 * NODE_ENV를 사용하여 로거(또는 환경 관련 기능)를 결정하지 마십시오.
 * @see {@link https://www.youtube.com/watch?v=HMM7GJC5E2o}
 */
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

// 로거 및 AJV 옵션으로 Fastify 인스턴스를 생성합니다.
const server = Fastify({
  logger: getLoggerOptions(),
  ajv: {
    customOptions: {
      coerceTypes: 'array', // 데이터 유형을 키워드 유형에 맞게 변경
      removeAdditional: 'all' // 추가 본문 속성 제거
    }
  }
})

async function init () {
  // 애플리케이션을 일반 플러그인으로 등록합니다.
  // 기본 오류 처리기를 재정의하려면 fp를 사용해야 합니다.
  server.register(fp(app))

  // 우아한 종료를 완료하는 데 걸리는 시간(밀리초)
  closeWithGrace(
    { delay: process.env.FASTIFY_CLOSE_GRACE_DELAY ?? 500 },
    async ({ err }) => {
      if (err != null) {
        server.log.error(err) // 오류가 있는 경우 로그 기록
      }

      await server.close() // Fastify 인스턴스 종료
    }
  )

  await server.ready() // Fastify 인스턴스가 준비되었는지 확인

  try {
    // 지정된 포트에서 수신 시작
    await server.listen({ port: process.env.PORT ?? 3000 })
  } catch (err) {
    server.log.error(err) // 시작할 수 없는 경우 오류 로그 기록
    process.exit(1) // 실패로 프로세스 종료
  }
}

init() // 애플리케이션 초기화
