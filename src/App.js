import { useRef } from "react";

import { useInfiniteComments } from "./useInfiniteComments";
import useIntersectionObserver from "./useIntersectionObserver";
import "./style.css";

export default function App() {
  const { comments, error, end, setSize, isValidating } = useInfiniteComments();

  const observerRootRef = useRef();
  const observerTargetRef = useRef();

  useIntersectionObserver({
    root: observerRootRef,
    target: observerTargetRef,
    onIntersect: () => setSize((size) => ++size),
    enabled: Boolean(!end && !isValidating && !error && comments),
  });

  return (
    <div className="App">
      <h1>Hello Infinite SWR</h1>
      {error ? (
        <div>failed to load</div>
      ) : comments ? (
        <ul className="items" ref={observerRootRef}>
          {comments.map((c) => {
            return c.map((l) => (
              <li key={l.id} className="item">
                <p>{l.id}</p>
                <p>{l.body}</p>
              </li>
            ));
          })}
          <div
            ref={observerTargetRef}
            style={{ minHeight: 10, margin: "6px 0" }}
          >
            {end ? "no more to load" : "loading more..."}
          </div>
        </ul>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
