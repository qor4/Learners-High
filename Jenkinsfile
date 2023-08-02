pipeline {
    agent any


    stages {
        stage('Prepare') {
            steps {
                sh 'echo "Clonning Repository"'
                git branch: 'master',
                    url: 'https://lab.ssafy.com/s09-webmobile1-sub2/S09P12B105.git',
                    credentialsId: '10191'
            }
            post {
                success {
                     sh 'echo "Successfully Cloned Repository"'
                 }
                 failure {
                     sh 'echo "Fail Cloned Repository"'
                 }
            }
        }

        stage('Docker stop'){
            steps {
                dir('BackEnd'){
                    sh 'echo "Docker Container Stop"'
    //              도커 컴포즈 다운
                    // sh 'curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose'
    //              해당 도커 컴포즈 다운한 경로로 권한 설정
                    // sh 'chmod -R 777 /usr/local/bin'
                    // sh 'chmod +x /usr/local/bin/docker-compose'
    //              기존 백그라운드에 돌아가던 컨테이너 중지
                    sh 'docker-compose -f /var/lib/jenkins/workspace/LearnersHigh/docker-compose-prod.yml down'
                    //sh 'docker-compose -f docker-compose-prod.yml down'

                }


            }
            post {
                 failure {
                     sh 'echo "Docker Fail"'
                }
            }
        }

        stage('RM Docker'){
            steps {

                sh 'echo "Remove Docker"'

                //정지된 도커 컨테이너 찾아서 컨테이너 ID로 삭제함
                sh '''
                    result=$( docker container ls -a --filter "name=learnershigh*" -q )
                    if [ -n "$result" ]
                    then
                        docker stop $(docker container ls -a --filter "name=learnershigh*" -q)
                        docker rm $(docker container ls -a --filter "name=learnershigh*" -q)
                    else
                        echo "No such containers"
                    fi
                '''

                // homesketcher로 시작하는 이미지 찾아서 삭제함
                sh '''
                    result=$( docker images -f "reference=learnershigh*" -q )
                    if [ -n "$result" ]
                    then
                        docker rmi -f $(docker images -f "reference=learnershigh*" -q)
                    else
                        echo "No such container images"
                    fi
                '''

                // 안쓰는이미지 -> <none> 태그 이미지 찾아서 삭제함
                sh '''
                    result=$(docker images -f "dangling=true" -q)
                    if [ -n "$result" ]
                    then
                        docker rmi -f $(docker images -f "dangling=true" -q)
                    else
                        echo "No such container images"
                    fi
                '''

            }
            post {
                 failure {
                     sh 'echo "Remove Fail"'
                }
            }
        }
        stage('Set Permissions') {
                    steps {
                        // 스크립트 파일에 실행 권한 추가
                        sh 'chmod +x /var/lib/jenkins/workspace/LearnersHigh/start-prod.sh'
                    }
                }
        stage('Execute start-prod.sh Script') {
            steps {
                // start-prod.sh 스크립트 실행
                sh '/var/lib/jenkins/workspace/LearnersHigh/start-prod.sh'
            }
        }
    }
}
