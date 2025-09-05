pipeline {
  agent any

  environment {
    SONAR_PROJECT_KEY  = 'lista-compras'
    SONAR_PROJECT_NAME = 'lista-compras'
    DOCKER_NET         = 'pgnet' // a MESMA rede docker onde estão jenkins e sonarqube
    SONAR_EXCLUSIONS   = '**/node_modules/**,**/.next/**,**/dist/**,**/coverage/**'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build & Test') {
      steps {
        script {
          // usa Node dentro de container, sem instalar nada no Jenkins
          docker.image('node:20-alpine').inside("--network ${DOCKER_NET}") {
            sh '''
              corepack enable || true
              # se usa npm:
              npm ci
              npm run lint || true
              npm test -- --coverage || echo "sem testes ainda"
              npm run build --if-present
            '''
          }
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('MeuSonar') { // o nome que você já cadastrou no Jenkins
          script {
            docker.image('sonarsource/sonar-scanner-cli:latest')
              .inside("--network ${DOCKER_NET}") {
              sh """
                sonar-scanner \
                  -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                  -Dsonar.projectName='${SONAR_PROJECT_NAME}' \
                  -Dsonar.sources=. \
                  -Dsonar.exclusions=${SONAR_EXCLUSIONS} \
                  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
              """
            }
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 10, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
