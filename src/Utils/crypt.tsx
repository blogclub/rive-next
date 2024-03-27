// JavaScript implementation for Custom
// Encryption and Decryption of let

// Function to encrypt the let
export function encryption(s: any) {
  let l = s?.length;
  let b = Math.ceil(Math.sqrt(l));
  let a = Math.floor(Math.sqrt(l));
  let encrypted = "";
  if (b * a < l) {
    if (Math.min(b, a) == b) {
      b = b + 1;
    } else {
      a = a + 1;
    }
  }

  // Matrix to generate the
  // Encrypted let
  let arr = new Array();

  for (let i = 0; i < a; i++) {
    let temp = [];
    for (let j = 0; j < b; j++) {
      temp.push([]);
    }
    arr.push(temp);
  }

  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i][j] = " ";
    }
  }

  let k = 0;

  // Fill the matrix row-wise
  for (let j = 0; j < a; j++) {
    for (let i = 0; i < b; i++) {
      if (k < l) {
        arr[j][i] = s[k];
      }
      k++;
    }
  }

  // Loop to generate
  // encrypted let
  for (let j = 0; j < b; j++) {
    for (let i = 0; i < a; i++) {
      encrypted = encrypted + arr[i][j];
    }
  }
  console.log({ encrypted });

  return encrypted;
}

// Function to decrypt the let
export function decryption(s: any) {
  let l = s?.length;
  let b = Math.ceil(Math.sqrt(l));
  let a = Math.floor(Math.sqrt(l));
  let decrypted = "";

  // Matrix to generate the
  // Encrypted let
  let arr = new Array();
  for (let i = 0; i < a; i++) {
    let temp = [];
    for (let j = 0; j < b; j++) {
      temp.push([]);
    }
    arr.push(temp);
  }
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i][j] = " ";
    }
  }
  let k = 0;

  // Fill the matrix column-wise
  for (let j = 0; j < b; j++) {
    for (let i = 0; i < a; i++) {
      if (k < l) {
        arr[j][i] = s[k];
      }
      k++;
    }
  }

  // Loop to generate
  // decrypted let
  for (let j = 0; j < a; j++) {
    for (let i = 0; i < b; i++) {
      decrypted = decrypted + arr[i][j];
    }
  }
  return decrypted;
}
