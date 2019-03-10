/* eslint-disable no-template-curly-in-string */

import test from 'ava'
import convertFile from 'convert/file'

test('minimal', t => {
  const result = convertFile('test/material/2/minimal.json')
  t.is(result, `// No HTTP/HTTPS transactions have been recorded`)
})

test('request', t => {
  const result = convertFile('test/material/2/request.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import http from "k6/http";

export let options = { maxRedirects: 4 };

const Scope = Symbol.for("scope");
const Var = Symbol.for("variable");
postman[Scope]();

export default function() {
  let res;

  res = http.get("http://example.com");
}
`)
})

test('raw body', t => {
  const result = convertFile('test/material/2/body-raw.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import http from "k6/http";

export let options = { maxRedirects: 4 };

const Scope = Symbol.for("scope");
const Var = Symbol.for("variable");
postman[Scope]();

export default function() {
  let res;

  res = http.post("http://example.com", "line1\\nline2\\nline3\\n");
}
`)
})

test('form body', t => {
  const result = convertFile('test/material/2/body-form.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import http from "k6/http";

export let options = { maxRedirects: 4 };

const Scope = Symbol.for("scope");
const Var = Symbol.for("variable");
postman[Scope]();

export default function() {
  let res;

  res = http.post("http://example.com", {
    first: "one",
    second: "two",
    third: "three"
  });
}
`)
})

test('url body', t => {
  const result = convertFile('test/material/2/body-url.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import http from "k6/http";

export let options = { maxRedirects: 4 };

const Scope = Symbol.for("scope");
const Var = Symbol.for("variable");
postman[Scope]();

export default function() {
  let res;

  res = http.post(
    "http://example.com",
    { first: "one", second: "two", third: "three" },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
}
`)
})

test('var global', t => {
  const result = convertFile('test/material/2/var-global.json', {
    globals: 'test/material/2/globals.json'
  })
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import http from "k6/http";

export let options = { maxRedirects: 4 };

const Scope = Symbol.for("scope");
const Var = Symbol.for("variable");
postman[Scope]({
  global: {
    first: "one",
    second: "two",
    third: "three"
  }
});

export default function() {
  let res;

  res = http.get(${'`http://${pm[Var]("first")}.${pm[Var]("third")}`'});
}
`)
})

test('var collection', t => {
  const result = convertFile('test/material/2/var-collection.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import http from "k6/http";

export let options = { maxRedirects: 4 };

const Scope = Symbol.for("scope");
const Var = Symbol.for("variable");
postman[Scope]({
  collection: {
    domain: "example.com",
    machine: 573
  }
});

export default function() {
  let res;

  res = http.get(${'`http://${pm[Var]("machine")}.${pm[Var]("domain")}`'});
}
`)
})

test('var environment', t => {
  const result = convertFile('test/material/2/var-environment.json', {
    environment: 'test/material/2/environment.json'
  })
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import http from "k6/http";

export let options = { maxRedirects: 4 };

const Scope = Symbol.for("scope");
const Var = Symbol.for("variable");
postman[Scope]({
  environment: {
    first: "one",
    second: "two",
    third: "three"
  }
});

export default function() {
  let res;

  res = http.get(${'`http://${pm[Var]("first")}.${pm[Var]("third")}`'});
}
`)
})

test('var data json', t => {
  const result = convertFile('test/material/2/var-data-json.json', {
    json: 'test/material/2/data-json.json'
  })
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import http from "k6/http";

export let options = { maxRedirects: 4 };

const file = (() => {
  // Load data file
  const text = open("test/material/2/data-json.json");
  const rows = JSON.parse(text);
  return rows;
})();

const Scope = Symbol.for("scope");
const Var = Symbol.for("variable");
const Iteration = Symbol.for("iteration");
postman[Scope]({
  data: file
});

export default function() {
  let res;

  postman[Iteration](); // Advance data variables

  res = http.get(${'`http://${pm[Var]("first")}.${pm[Var]("third")}`'});
}
`)
})

test('var data csv', t => {
  const result = convertFile('test/material/2/var-data-csv.json', {
    csv: 'test/material/2/data-csv.csv'
  })
  t.is(result, `// Auto-generated by the Load Impact converter

import "./postman-shim.js";
import papaparse from "./papaparse.js";
import http from "k6/http";

export let options = { maxRedirects: 4 };

const file = (() => {
  // Load data file
  const text = open("test/material/2/data-csv.csv");
  const rows = papaparse.parse(text, { header: true }).data;
  return rows;
})();

const Scope = Symbol.for("scope");
const Var = Symbol.for("variable");
const Iteration = Symbol.for("iteration");
postman[Scope]({
  data: file
});

export default function() {
  let res;

  postman[Iteration](); // Advance data variables

  res = http.get(${'`http://${pm[Var]("first")}.${pm[Var]("third")}`'});
}
`)
})
