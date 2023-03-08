const crypto = require("crypto");

function deterministicPartitionKey(event) {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = event?.partitionKey;

  if (!candidate && event) {
    candidate = crypto.createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
  }

  if (candidate && typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate && candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512")
      .update(candidate)
      .digest("hex");
  }

  return candidate || TRIVIAL_PARTITION_KEY;
}

module.exports = {
  deterministicPartitionKey,
};



