import React from "react";

export default function Math() {
  const add = (a: number, b: number) => a + b;
  const subtract = (a: number, b: number) => a - b;
  const multiply = (a: number, b: number) => a * b;
  const divide = (a: number, b: number) => a / b;

  return (
    <div>
      <h4>Math Functions</h4>
      <p>Add 2 + 3 = {add(2, 3)}</p>
      <p>Subtract 2 - 3 = {subtract(2, 3)}</p>
      <p>Multiply 2 * 3 = {multiply(2, 3)}</p>
      <p>Divide 2 / 3 = {divide(2, 3)}</p>
    </div>
  );
} 