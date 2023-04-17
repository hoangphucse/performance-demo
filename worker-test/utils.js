export function Test_SumSquares(vals) {
  let sum = 0.0;

  for (let i = 0; i < vals.length; i++) {
    sum += vals[i] * vals[i];
  }

  return sum;
}

export function generateValue(val) {
  const vals = [];
  for (let i = 0; i < val; i++) {
    if (i % 2) {
      vals.push(i);
    }
  }
  return vals;
}

export function convertArrayNumberToBuffer(array) {
  const byteInFloat = 4;
  const data = new Float32Array(new ArrayBuffer(array.length * byteInFloat));
  data.set(array);
  return data;
}

// https://www.youtube.com/watch?v=pQPqhZRUz3U&t=302s

//
