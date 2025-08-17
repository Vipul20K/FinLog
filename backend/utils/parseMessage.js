const nlp = require("compromise");

function parseMessage(body) {
  const text = body.toLowerCase();
  const doc = nlp(text);

  // Extract amount
  const numbers = doc.numbers().toNumber().out("array");
  const amount = numbers.length > 0 ? parseFloat(numbers[0]) : null;

  // Detect type
  let type = null;
  if (/income|earned|salary|got|received/.test(text)) {
    type = "income";
  } else if (/expense|spent|paid|bought|used/.test(text)) {
    type = "expense";
  }

  // Extract possible category keyword
  let category = null;
  const match = text.match(/(?:on|for)\s+([a-z]+)/);
  if (match && match[1]) {
   
      const nouns = nlp(match[1]).nouns().out("array");
      category = nouns.length > 0 ? nouns[0] : match[1];
    
  }

  if (!type || !amount) {
    return null;
  }

  return { type, amount, category: category || "Other" };
}

module.exports = parseMessage;
