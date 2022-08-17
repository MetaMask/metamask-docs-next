const base = {
  default: true,
};

module.exports = {
  extends: base,
  files: ["content/**/*.mdx"],
  MD033: { allowed_elements: ["Tip", "Warning", "button"] },
  MD013: false
};
