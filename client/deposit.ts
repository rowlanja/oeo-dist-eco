// 👇️ only necessary if running in Node.js version < 17.5
// (Remove this line if running in the browser)
import fetch from 'node-fetch';
import assert from 'assert'
import { isValidChecksumAddress, unpadBuffer, BN } from 'ethereumjs-util'
import { pk, sk } from './data/phraseFreqs.json'
import { writeToFile } from "./utils/writer";

type CreateUserResponse = {
  name: string;
  job: string;
  id: string;
  createdAt: string;
};

async function createUser() {
  try {
    // read address from local
    // parse ethereum address
    console.log(isValidChecksumAddress(pk), isValidChecksumAddress(sk))
    // 👇️ const response: Response
    console.log(pk, sk)
    const response = await fetch('http://localhost:8080/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        pk: pk,
        sk: sk,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    // 👇️ const result: CreateUserResponse
    const result = (await response.json()) as CreateUserResponse;

    console.log('result is: ', JSON.stringify(result, null, 4));

    writeToFile('data/vc.json', JSON.stringify({
      "vc":JSON.stringify(result['vc'])
    }));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

createUser();
