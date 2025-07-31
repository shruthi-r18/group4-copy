pipeline {
  agent any

  tools {
    nodejs 'NodeJS 18'
    allure 'Allure'
  }

  environment {
    HOME = "${env.WORKSPACE}"
  }
parameters {
  choice(name: 'TEST_SUITE', choices: ['campaigntest', 'usertest','logintest','oppurtunitytest','contacttest','leadtest','producttest','salesordertest','quotetest', 'alltests'], description: 'Select test suite to run')
}

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/ninjahrm/Group4.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm ci'
        bat 'npm run install:browsers'
      }
    }

    stage('Run Tests') {
      steps {
       // Use the parameter here to run the tests dynamically
       bat "npm run ${params.TEST_SUITE}"
      }
    }

    stage('Generate Allure Report') {
      steps {
        bat 'allure generate ./allure-results --clean -o ./allure-report'
      }
    }
  }
  post {
    always {
      allure([
        reportBuildPolicy: 'ALWAYS',
        includeProperties: false,
        jdk: '',
        results: [[path: 'allure-results']]
      ])
    }
  }
}