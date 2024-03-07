import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
// ReactDOM.createRoot()를 사용하여 루트 요소를 선택하고, 그 것을 
// render() 함수를 호출하여 React.StrictMode로 감싼 <App /> 컴포넌트를 렌더링합니다. 
// React.StrictMode는 애플리케이션 안에서 잠재적인 문제를 감지하기 위한 도구로 사용됩니다.