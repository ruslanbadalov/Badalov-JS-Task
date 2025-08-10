const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(q) {
  return new Promise((res) => rl.question(q, (ans) => res(ans)));
}


function greetIfGreaterThan7(n) {
  if (Number.isFinite(n) && n > 7) return "Hello";
  return "(no output)";
}

function greetIfJohn(name) {
  if (typeof name === "string" && name.trim().toLowerCase() === "john") {
    return "Hello, John";
  }
  return "There is no such name";
}

function multiplesOf3(arr) {
  return arr.filter((x) => Number.isFinite(x) && x % 3 === 0);
}


function normalizeParens(s) {
  return [...s]
    .map((ch) => (ch === "[" ? "(" : ch === "]" ? ")" : ch))
    .filter((ch) => ch === "(" || ch === ")");
}

function isCorrectParenSequence(seq) {
  let bal = 0;
  for (const ch of seq) {
    if (ch === "(") bal++;
    else if (ch === ")") {
      bal--;
      if (bal < 0) return false;
    }
  }
  return bal === 0;
}


function fixParenSequence(s) {
  const seq = normalizeParens(s);
  const out = [];
  let bal = 0;

  for (const ch of seq) {
    if (ch === "(") {
      out.push("(");
      bal++;
    } else {
      if (bal === 0) {
        out.push("(");
        bal++;
      }
      out.push(")");
      bal--;
    }
  }
  while (bal-- > 0) out.push(")");
  return out.join("");
}


async function main() {
  console.log("=== Badalov JS Task ===\n");
  const numRaw = await ask("1) Enter a number: ");
  const num = Number(numRaw);
  if (!Number.isFinite(num)) {
    console.log("   Not a valid number.");
  } else {
    const r1 = greetIfGreaterThan7(num);
    if (r1 !== "(no output)") console.log("   →", r1);
    else console.log("   → no output (number ≤ 7)");
  }

  const name = await ask('2) Enter a name (expecting "John"): ');
  console.log("   →", greetIfJohn(name));


  const arrRaw = await ask(
    "3) Enter a numeric array (comma/space separated, e.g. 1, 3, 4, 9, 12): "
  );
  const arr = arrRaw
    .split(/[\s,]+/)
    .map((t) => Number(t))
    .filter((x) => Number.isFinite(x));
  const r3 = multiplesOf3(arr);
  console.log("   → multiples of 3:", r3.length ? r3.join(", ") : "(none)");


  const seq = await ask(
    "4) Enter a bracket sequence using () or [] (e.g. ((())()())): "
  );
  const normalized = normalizeParens(seq);
  const ok = isCorrectParenSequence(normalized);
  console.log("   → normalized:", normalized.join("") || "(empty)");
  console.log("   → is correct?", ok ? "YES" : "NO");

  if (!ok) {
    const fixed = fixParenSequence(seq);
    console.log("   → to make it correct, change it to:", fixed);
  }

  rl.close();
}

if (require.main === module) {
  main().catch((e) => {
    console.error("Unexpected error:", e);
    rl.close();
    process.exit(1);
  });
}

module.exports = {
  greetIfGreaterThan7,
  greetIfJohn,
  multiplesOf3,
  isCorrectParenSequence,
  fixParenSequence,
  normalizeParens,
};
