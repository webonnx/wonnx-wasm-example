import init, { main, Session, Input } from "@webonnx/wonnx-wasm";
import modelURL from "./single_relu.onnx";

async function fetchBytes(url) {
  const reply = await fetch(url);
  const blob = await reply.arrayBuffer();
  return new Uint8Array(blob);
}

async function run() {
  try {
    // Check for WebGPU support
    const resultElement = document.getElementById("result");
    if (!navigator.gpu) {
      resultElement.innerText = "Your browser does not support WebGPU";
      return;
    }

    // Initialize the WebAssembly side and fetch the model in the meantime
    const [modelBytes] = await Promise.all([fetchBytes(modelURL), init()]);

    // Construct inference session
    const session = await Session.fromBytes(modelBytes);
    const input = new Input();
    input.insert("x", [13.0, -37.0]);
    const result = await session.run(input); // Return value will be an object where the keys are the names of the model outputs and the values are arrays of numbers.
    resultElement.innerText = JSON.stringify(result);
    session.free();
    input.free();
  } catch (e) {
    console.error(e.toString()); // The error will be of type SessionError
  }
}

run();
