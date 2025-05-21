pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-registry-url'
        IMAGE_NAME = 'zkp-kyc'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your/repo.git'
                cleanWs()
            }
        }

        stage('Code Quality') {
            steps {
                sh 'npm install'
                sh 'npm run lint'
                sh 'npm run test'
            }
        }

        stage('Security Scan') {
            steps {
                sh 'npm audit'
                sh 'snyk test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("${DOCKER_REGISTRY}", 'registry-credentials') {
                        docker.image("${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            emailext subject: 'Pipeline Success',
                     body: 'The pipeline has completed successfully.',
                     to: 'team@example.com'
        }
        failure {
            echo 'Pipeline failed!'
            emailext subject: 'Pipeline Failure',
                     body: 'The pipeline has failed. Please check the logs.',
                     to: 'team@example.com'
        }
        always {
            cleanWs()
        }
    }
}
