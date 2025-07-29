pipeline {
  agent any

  tools {
    nodejs 'NodeJS 18'
  }

  environment {
    HOME = "${env.WORKSPACE}"
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/ninjahrm/Group4.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
        sh 'npm run install:browsers'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Publish Report') {
      steps {
        publishHTML(target: [
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Test Report'
        ])
      }
    }
  }
}
