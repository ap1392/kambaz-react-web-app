import PassingFunctions from "./PassingFunctions";
import ReduxExamples from "./ReduxExamples";
export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
    <div id="wd-passing-functions">
      <h2>Lab 4</h2>
      <PassingFunctions theFunction={sayHello} />
      <ReduxExamples />
    </div>
);}
