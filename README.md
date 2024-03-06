재배포,Package.json 배포및빌드 명령어, git 명령어

재변경 , 배포시
npm run deploy
===========
다음 할 일

1. 
2. 
===========

npm create vite@latest
npm i react-router-dom@6.14.2
npm i styled-reset
npm i styled-components@6.0.7
npm i @types/styled-components -D

Package.json 명령어
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "firebase deploy"

Git init
보통 프로젝트를 처음 시작할 때 git 저장소를 만들기 위해 사용한다. '초기화'한다는 뜻이지만 내용이 존재하지 않아도 상관없다. git이라는 디렉터리를 빈 저장소로 만들어 준다는 의미로 입력해보자!

	$ git init
여기서 중요!! init을 하기 전에 먼저 git 저장소를 만들 디렉터리로 이동해야 한다. 그리고 나서 status로 현재 git 저장소가 없다는 상태를 확인하자. 그 상태에서 init을 실행한다.

        $ cd <이동할 디렉터리명>
        $ git status (fatal: not a git repository)
        $ git init 

Git clone
local에 github의 저장소를 복제해와 작업하는 것을 clone이라고 한다.
주로 오픈 소스를 개발하거나 이미 진행중인 프로젝트에 참여할 때 사용한다.

	$ git clone <복제해올 url>
저장소를 clone하면 origin remote에 가져온 url이 저장된다. 이후에는 주소지정 없이 origin 명령어로 저장소의 내용을 fetch 또는 push할 수 있다.

마찬가지로 다른 개발자의 오픈소스 프로젝트들을 clone해서 가져올 수 있다..!
(private 저장소는 접근 권한이 없기 때문에 username과 password 필요)

shallow clone
clone시 너무 무거운 프로젝트의 저장소는 여러가지 편집과정이 다 섞여있기 때문에, 최신 수정이 반영된 코드만 복제해 올 경우 shallow clone을 사용한다.
	$ git clone --depth=1 <복제해올 url>
트러블 슈팅
클론에 실패하는 경우 이런 오류 메세지를 볼 수 있다.
fatal: destination path '저장소명' already exists and is not an empty directory.
이미 해당 저장소 안에 내용이 존재한다는 것! git이 자동으로 레파지토리 이름과 같은 이름에 복제를 시도하기 때문에 이미 클론 이력이 있는 경우 오류가 난다. 이를 해결하기 위해서는 아래와 같이 다른 디렉터리를 지정해 클론을 시도하자.

	$ git clone <복제할 url> <다른 디렉터리명>

Github에 잘못 올린 파일 지우기
레파지토리 및 로컬저장소 파일 삭제
	$ git rm -r <파일/폴더명> 
레파지토리 파일만 삭제
	$ git rm --cached -r <파일/폴더명>
    	(cached는 원격저장소의 폴더/파일을 삭제한다는 명령어)
위의 옵션 중 하나를 선택하여 작성 후 다음 명령어를 추가로 입력해주면 삭제 완료!

        $ git commit -m "commit message"
        $ git push origin master

Repository 초기화 ⭐️
실제로 git이 엉망이되어 repository를 초기화하고 현재 폴더를 재정비한 후 다시 동기화시킬 때 유용하게 사용하였다!!

.git 디렉터리 삭제 / 상태확인
	$ rm -rf .git
        $ git status (fatal: not a git repository)
git 초기화 후 새로운 git 설정
        $ cd <생성할 디렉터리>
        $ git init
        $ git add .
        $ git commit -m "commit message"
github 저장소 연결후 강제 push
        $ git remote add origin <연결할 url>
        $ git push --force --set-upstream origin master 

작업 도중 Github 레파지토리 이름 변경 시 url(경로) 변경해주기
현재 레파지토리 확인
	$ git remote -v
push, fetch url변경
        $ git remote set-url--push origin <변경할 저장소 주소>
        $ git remote set-url origin <변경할 저장소 주소>
결과 확인
	$ git remote -v 

이미 push한 마지막 커밋 메시지 변경하기
원하는 변경 내용을 입력한다.
	$ git commit --amend -m "변경 내용 입력"
강제 push 하기
	$ git push origin main -f 

이미 push한 폴더명 로컬에서 변경하기
이미 push한 폴더명을 바꾸고 싶다면, 로컬에서 먼저 폴더명을 변경해준 뒤

git mv '이전폴더명' '바꿀폴더명'
라고 작성해주면 간단하게 변경완료!

# Lwitter
