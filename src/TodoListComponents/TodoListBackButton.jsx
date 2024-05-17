import { useRef } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import { clamp } from "lodash";
import { getAuth } from "firebase/auth";

import styles from "../TodoListComponents/styles.module.css";
import { Link } from "react-router-dom";

const fn =
  (order, active = false, originalIndex = 0, curIndex = 0, y = 0) =>
  (index) =>
    active && index === originalIndex
      ? {
          y: curIndex * 50 + y,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key) => key === "y" || key === "zIndex",
        }
      : {
          y: order.indexOf(index) * 50,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };

function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index)); // Store indices as a local ref, this represents the item order
  const [springs, api] = useSprings(items.length, fn(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 100 + y) / 100),
      0,
      items.length - 1
    );
    const newOrder = move(order.current, curIndex, curRow);
    api.start(fn(newOrder, active, originalIndex, curIndex, y)); // Feed springs new style data, they'll animate the view without causing a single render
    if (!active) order.current = newOrder;
  });
  return (
    <div className={styles.content} style={{ height: items.length * 50 }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            textAlign: "center",
            margin: "-10px 0 0 0",
            zIndex,
            boxShadow: shadow.to(
              (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            y,
            scale,
          }}
          children={items[i]}
        />
      ))}
    </div>
  );
}

export default function App() {
  const auth = getAuth(); // Firebase Auth 객체 초기화
  const isLoggedIn = auth.currentUser; // 현재 로그인 상태 확인
  return (
    <Link to={isLoggedIn ? "/" : "/login"}>
      <div className={styles.container}>
        <DraggableList items={"홈으로돌아가기".split(" ")} />
      </div>
    </Link>
  );
}
//   <Link to="/todolist">
//     {/* <Logo src="/wordpress.svg"/> */}
//     TodoList 바로가기
//   </Link>
